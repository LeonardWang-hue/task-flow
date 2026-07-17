'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useProjects } from '@/hooks/useProjects';
import type { Project, ProjectTag } from '@/lib/types';
import Header from '@/components/Header';
import ProjectCard from '@/components/ProjectCard';
import ProjectEditor from '@/components/ProjectEditor';

const TAG_LABELS: Record<string, string> = {
  nextjs: 'Next.js', react: 'React', typescript: 'TypeScript', tailwind: 'Tailwind',
  fullstack: '全栈', api: 'API', tool: '工具', game: '游戏', mobile: '移动端', other: '其他',
};

export default function ProjectsPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const { projects, isLoading, error, addProject, editProject, removeProject } = useProjects();
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  useEffect(() => {
    if (!authLoading && !user) router.replace('/login');
  }, [user, authLoading, router]);

  const handleOpenCreate = () => { setEditingProject(null); setEditorOpen(true); };
  const handleOpenEdit = (p: Project) => { setEditingProject(p); setEditorOpen(true); };

  const handleSave = useCallback(async (data: { title: string; description: string; tags: ProjectTag[]; url: string; image: string }) => {
    if (editingProject) await editProject(editingProject.id, data);
    else await addProject(data);
    setEditorOpen(false); setEditingProject(null);
  }, [editingProject, addProject, editProject]);

  if (authLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-[var(--border)] border-t-[var(--primary)]" />
    </div>
  );
  if (!user) return null;

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-4 py-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-[var(--muted-foreground)]">我的项目 ({projects.length})</h2>
            <button onClick={handleOpenCreate} className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--primary)] px-3 py-1.5 text-xs font-medium text-[var(--primary-foreground)] hover:bg-[var(--primary-hover)] transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
              添加项目
            </button>
          </div>
          {isLoading && (
            <div className="flex items-center justify-center py-20"><div className="h-5 w-5 animate-spin rounded-full border-2 border-[var(--border)] border-t-[var(--primary)]" /></div>
          )}
          {error && <div className="rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/30 px-4 py-3 text-sm text-red-600 dark:text-red-400">{error}</div>}
          {!isLoading && !error && projects.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="rounded-full bg-[var(--muted)] p-3 mb-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--muted-foreground)]"><rect x="3" y="2" width="18" height="20" rx="2"/><path d="M11 6h2"/></svg>
              </div>
              <p className="text-sm text-[var(--muted-foreground)]">还没有项目，点击上方按钮添加</p>
            </div>
          )}
          {!isLoading && !error && projects.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((p) => (
                <ProjectCard key={p.id} project={p} onEdit={handleOpenEdit} onDelete={removeProject} />
              ))}
            </div>
          )}
          <ProjectEditor project={editingProject} isOpen={editorOpen} onClose={() => { setEditorOpen(false); setEditingProject(null); }} onSave={handleSave} />
        </div>
      </main>
    </>
  );
}
