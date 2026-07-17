'use client';

import { useState, useCallback, useEffect } from 'react';
import type { Project } from '@/lib/types';
import * as api from '@/lib/mock-api';
import { useAuth } from '@/contexts/AuthContext';

export function useProjects() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    if (!user) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await api.getProjects(user.id);
      setProjects(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : '加载项目失败');
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const addProject = useCallback(async (data: Omit<Project, 'id' | 'userId' | 'createdAt'>) => {
    if (!user) return;
    const created = await api.createProject(user.id, data);
    setProjects((prev) => [created, ...prev]);
    return created;
  }, [user]);

  const editProject = useCallback(async (projectId: string, data: Partial<Project>) => {
    if (!user) return;
    const updated = await api.updateProject(user.id, projectId, data);
    setProjects((prev) => prev.map((p) => (p.id === projectId ? updated : p)));
    return updated;
  }, [user]);

  const removeProject = useCallback(async (projectId: string) => {
    if (!user) return;
    await api.deleteProject(user.id, projectId);
    setProjects((prev) => prev.filter((p) => p.id !== projectId));
  }, [user]);

  return { projects, isLoading, error, fetchProjects, addProject, editProject, removeProject };
}
