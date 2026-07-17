'use client';

import { useState, useMemo, useCallback } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import type { Task, TaskFilter, TaskSort } from '@/lib/types';
import { useTasks } from '@/hooks/useTasks';
import { useUndo } from '@/hooks/useUndo';
import { useDebounce } from '@/hooks/useDebounce';
import TaskCard from './TaskCard';
import TaskEditor from './TaskEditor';
import UndoToast from './UndoToast';
import { SearchBar, FilterPanel, SortControls } from './TaskControls';

export default function TaskBoard() {
  const {
    tasks,
    isLoading,
    error,
    addTask,
    editTask,
    removeTask,
    restoreTask,
    reorderTasks,
  } = useTasks();

  const { entry: undoEntry, push: pushUndo, clear: clearUndo } = useUndo<Task>();

  const [searchQuery, setSearchQuery] = useState('');
  const debouncedQuery = useDebounce(searchQuery, 250);

  const [filter, setFilter] = useState<TaskFilter>({ status: 'all', priority: 'all' });
  const [sort, setSort] = useState<TaskSort>({ field: 'createdAt', direction: 'desc' });

  const [editorOpen, setEditorOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const filteredTasks = useMemo(() => {
    let result = tasks;
    if (debouncedQuery) {
      const q = debouncedQuery.toLowerCase();
      result = result.filter(
        (t) => t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)
      );
    }
    if (filter.status !== 'all') result = result.filter((t) => t.status === filter.status);
    if (filter.priority !== 'all') result = result.filter((t) => t.priority === filter.priority);

    return [...result].sort((a, b) => {
      let cmp = 0;
      if (sort.field === 'priority') {
        const prio = { high: 3, medium: 2, low: 1 };
        cmp = (prio[a.priority] || 0) - (prio[b.priority] || 0);
      } else if (sort.field === 'title') {
        cmp = a.title.localeCompare(b.title);
      } else {
        cmp = new Date(a[sort.field]).getTime() - new Date(b[sort.field]).getTime();
      }
      return sort.direction === 'desc' ? -cmp : cmp;
    });
  }, [tasks, debouncedQuery, filter, sort]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIdx = filteredTasks.findIndex((t) => t.id === active.id);
    const newIdx = filteredTasks.findIndex((t) => t.id === over.id);
    if (oldIdx === -1 || newIdx === -1) return;

    const reordered = arrayMove(filteredTasks, oldIdx, newIdx);
    reorderTasks(reordered.map((t) => t.id));
  };

  const handleDelete = useCallback(async (taskId: string) => {
    const deleted = await removeTask(taskId);
    if (deleted) {
      pushUndo({ action: 'delete', data: deleted });
    }
  }, [removeTask, pushUndo]);

  const handleUndo = useCallback(async () => {
    if (undoEntry?.action === 'delete' && undoEntry.data) {
      await restoreTask(undoEntry.data);
    }
    clearUndo();
  }, [undoEntry, restoreTask, clearUndo]);

  const handleOpenCreate = () => {
    setEditingTask(null);
    setEditorOpen(true);
  };

  const handleOpenEdit = (task: Task) => {
    setEditingTask(task);
    setEditorOpen(true);
  };

  const handleSave = async (data: { title: string; description: string; status: Task['status']; priority: Task['priority']; dueDate: string }) => {
    if (editingTask) {
      await editTask(editingTask.id, data);
    } else {
      await addTask(data);
    }
    setEditorOpen(false);
    setEditingTask(null);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-[var(--muted-foreground)]">
          任务列表 ({filteredTasks.length})
        </h2>
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--primary)] px-3 py-1.5 text-xs font-medium text-[var(--primary-foreground)] hover:bg-[var(--primary-hover)] transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          新建任务
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <SearchBar query={searchQuery} onQueryChange={setSearchQuery} />
        </div>
        <SortControls sort={sort} onSortChange={setSort} />
      </div>

      <FilterPanel filter={filter} onFilterChange={setFilter} />

      {isLoading && (
        <div className="flex items-center justify-center py-20">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-[var(--border)] border-t-[var(--primary)]" />
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/30 px-4 py-3 text-sm text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      {!isLoading && !error && filteredTasks.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="rounded-full bg-[var(--muted)] p-3 mb-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--muted-foreground)]">
              <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/>
            </svg>
          </div>
          <p className="text-sm text-[var(--muted-foreground)]">
            {debouncedQuery || filter.status !== 'all' || filter.priority !== 'all' ? '没有匹配的任务' : '还没有任务，点击上方按钮创建'}
          </p>
        </div>
      )}

      {!isLoading && !error && filteredTasks.length > 0 && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToVerticalAxis]}
        >
          <SortableContext items={filteredTasks} strategy={verticalListSortingStrategy}>
            <div className="space-y-2">
              {filteredTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={handleOpenEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      <TaskEditor
        task={editingTask}
        isOpen={editorOpen}
        onClose={() => { setEditorOpen(false); setEditingTask(null); }}
        onSave={handleSave}
      />

      {undoEntry && (
        <UndoToast
          message={`已删除: ${undoEntry.data.title}`}
          onUndo={handleUndo}
          onDismiss={clearUndo}
        />
      )}
    </div>
  );
}
