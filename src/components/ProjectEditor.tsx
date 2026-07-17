'use client';

import { useState, useEffect } from 'react';
import type { Project, ProjectTag } from '@/lib/types';
import { TAG_LABELS } from './TaskControls';

interface ProjectEditorProps {
  project?: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { title: string; description: string; tags: ProjectTag[]; url: string; image: string }) => void;
}

const ALL_TAGS: ProjectTag[] = ['nextjs', 'react', 'typescript', 'tailwind', 'fullstack', 'api', 'tool', 'game', 'mobile', 'other'];

export default function ProjectEditor({ project, isOpen, onClose, onSave }: ProjectEditorProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<ProjectTag[]>([]);
  const [url, setUrl] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    if (project) {
      setTitle(project.title);
      setDescription(project.description);
      setTags(project.tags);
      setUrl(project.url);
      setImage(project.image);
    } else {
      setTitle('');
      setDescription('');
      setTags([]);
      setUrl('');
      setImage('');
    }
  }, [project, isOpen]);

  const toggleTag = (tag: ProjectTag) => {
    setTags((prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave({ title: title.trim(), description: description.trim(), tags, url: url.trim(), image: image.trim() });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">{project ? '编辑项目' : '添加项目'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-[var(--muted-foreground)] mb-1">项目名称</label>
            <input
              type="text" value={title} onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]/30"
              placeholder="项目名称" autoFocus
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[var(--muted-foreground)] mb-1">描述</label>
            <textarea
              value={description} onChange={(e) => setDescription(e.target.value)} rows={2}
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]/30 resize-none"
              placeholder="简短描述项目"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[var(--muted-foreground)] mb-1">项目链接</label>
            <input
              type="url" value={url} onChange={(e) => setUrl(e.target.value)}
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]/30"
              placeholder="https://..."
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[var(--muted-foreground)] mb-1">技术标签</label>
            <div className="flex flex-wrap gap-1.5">
              {ALL_TAGS.map((tag) => (
                <button
                  key={tag} type="button"
                  onClick={() => toggleTag(tag)}
                  className={`rounded-lg px-2 py-1 text-[11px] font-medium transition-all ${
                    tags.includes(tag)
                      ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                      : 'border border-[var(--border)] text-[var(--muted-foreground)] hover:bg-[var(--muted)]'
                  }`}
                >
                  {TAG_LABELS[tag]}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 rounded-lg border border-[var(--border)] py-2 text-sm font-medium text-[var(--muted-foreground)] hover:bg-[var(--muted)] transition-colors">
              取消
            </button>
            <button type="submit"
              className="flex-1 rounded-lg bg-[var(--primary)] py-2 text-sm font-medium text-[var(--primary-foreground)] hover:bg-[var(--primary-hover)] transition-colors">
              保存
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
