export interface User {
  id: string;
  username: string;
  password: string;
  avatar: string;
  createdAt: string;
}

export type TaskStatus = 'todo' | 'in-progress' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  userId: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export type ProjectTag = 'nextjs' | 'react' | 'typescript' | 'tailwind' | 'fullstack' | 'api' | 'tool' | 'game' | 'mobile' | 'other';

export interface Project {
  id: string;
  userId: string;
  title: string;
  description: string;
  tags: ProjectTag[];
  url: string;
  image: string;
  createdAt: string;
}

export interface TaskFilter {
  status: TaskStatus | 'all';
  priority: TaskPriority | 'all';
}

export type TaskSortField = 'createdAt' | 'dueDate' | 'priority' | 'title';
export type SortDirection = 'asc' | 'desc';

export interface TaskSort {
  field: TaskSortField;
  direction: SortDirection;
}
