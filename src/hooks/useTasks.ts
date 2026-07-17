'use client';

import { useState, useCallback, useEffect } from 'react';
import type { Task, TaskFilter, TaskSort } from '@/lib/types';
import * as api from '@/lib/mock-api';
import { useAuth } from '@/contexts/AuthContext';

export function useTasks() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    if (!user) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await api.getTasks(user.id);
      setTasks(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : '加载任务失败');
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = useCallback(async (data: Omit<Task, 'id' | 'userId' | 'order' | 'createdAt' | 'updatedAt'>) => {
    if (!user) return;
    const created = await api.createTask(user.id, data);
    setTasks((prev) => [...prev, created]);
    return created;
  }, [user]);

  const editTask = useCallback(async (taskId: string, data: Partial<Task>) => {
    if (!user) return;
    const updated = await api.updateTask(user.id, taskId, data);
    setTasks((prev) => prev.map((t) => (t.id === taskId ? updated : t)));
    return updated;
  }, [user]);

  const removeTask = useCallback(async (taskId: string) => {
    if (!user) return;
    const task = tasks.find((t) => t.id === taskId);
    await api.deleteTask(user.id, taskId);
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    return task;
  }, [user, tasks]);

  const restoreTask = useCallback(async (task: Task) => {
    if (!user) return;
    const created = await api.createTask(user.id, {
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate,
    });
    setTasks((prev) => {
      const next = [...prev];
      const insertIdx = task.order < next.length ? task.order : next.length;
      next.splice(insertIdx, 0, created);
      return next;
    });
    return created;
  }, [user]);

  const reorderTasks = useCallback(async (orderedIds: string[]) => {
    if (!user) return;
    const reordered = await api.reorderTasks(user.id, orderedIds);
    setTasks(reordered);
  }, [user]);

  const searchTasks = useCallback((query: string): Task[] => {
    const q = query.toLowerCase();
    return tasks.filter(
      (t) => t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)
    );
  }, [tasks]);

  const filterTasks = useCallback((f: TaskFilter): Task[] => {
    return tasks.filter((t) => {
      if (f.status !== 'all' && t.status !== f.status) return false;
      if (f.priority !== 'all' && t.priority !== f.priority) return false;
      return true;
    });
  }, [tasks]);

  const sortTasks = useCallback((list: Task[], s: TaskSort): Task[] => {
    return [...list].sort((a, b) => {
      let cmp = 0;
      if (s.field === 'priority') {
        const prio = { high: 3, medium: 2, low: 1 };
        cmp = (prio[a.priority] || 0) - (prio[b.priority] || 0);
      } else if (s.field === 'title') {
        cmp = a.title.localeCompare(b.title);
      } else {
        cmp = new Date(a[s.field]).getTime() - new Date(b[s.field]).getTime();
      }
      return s.direction === 'desc' ? -cmp : cmp;
    });
  }, []);

  return {
    tasks,
    isLoading,
    error,
    fetchTasks,
    addTask,
    editTask,
    removeTask,
    restoreTask,
    reorderTasks,
    searchTasks,
    filterTasks,
    sortTasks,
  };
}
