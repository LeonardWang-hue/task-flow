'use client';

import type { Project } from '@/lib/types';
import { TAG_LABELS } from './TaskControls';

interface ProjectCardProps {
  project: Project;
  onEdit: (p: Project) => void;
  onDelete: (id: string) => void;
}

export default function ProjectCard({ project, onEdit, onDelete }: ProjectCardProps) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] overflow-hidden group transition-shadow hover:shadow-sm">
      <div className="aspect-video bg-gradient-to-br from-[var(--muted)] to-[var(--muted)]/50 flex items-center justify-center">
        {project.image ? (
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
        ) : (
          <div className="text-center p-6">
            <div className="text-4xl mb-2">
              {project.tags.includes('nextjs') ? '▲' :
               project.tags.includes('react') ? '⚛' :
               project.tags.includes('game') ? '🎮' :
               project.tags.includes('api') ? '🔌' : '📦'}
            </div>
            <p className="text-xs text-[var(--muted-foreground)]">{project.title}</p>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-medium text-sm mb-1">{project.title}</h3>
        {project.description && (
          <p className="text-xs text-[var(--muted-foreground)] line-clamp-2 mb-2">{project.description}</p>
        )}
        <div className="flex flex-wrap gap-1 mb-3">
          {project.tags.map((tag) => (
            <span key={tag} className="rounded bg-[var(--muted)] px-1.5 py-0.5 text-[10px] text-[var(--muted-foreground)]">
              {TAG_LABELS[tag]}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between">
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[var(--primary)] hover:underline inline-flex items-center gap-1"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
              访问
            </a>
          )}
          <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity ml-auto">
            <button
              onClick={() => onEdit(project)}
              className="h-7 w-7 flex items-center justify-center rounded hover:bg-[var(--muted)] transition-colors"
              title="编辑"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
              </svg>
            </button>
            <button
              onClick={() => onDelete(project.id)}
              className="h-7 w-7 flex items-center justify-center rounded hover:bg-red-50 dark:hover:bg-red-950/30 text-[var(--muted-foreground)] hover:text-[var(--destructive)] transition-colors"
              title="删除"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
