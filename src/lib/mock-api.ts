import { v4 as uuid } from 'uuid';
import type { User, Task, Project } from './types';
import { STORAGE_KEYS } from './constants';

// Simulated network delay (200-600ms)
function delay(ms?: number): Promise<void> {
  const d = ms ?? Math.random() * 400 + 200;
  return new Promise((r) => setTimeout(r, d));
}

function getStore<T>(key: string): T[] {
  if (typeof window === 'undefined') return [];
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : [];
}

function setStore<T>(key: string, data: T[]): void {
  localStorage.setItem(key, JSON.stringify(data));
}

// ---- Users ----

const defaultUsers: User[] = [
  { id: 'u1', username: 'alice', password: '123456', avatar: '👩‍💻', createdAt: '2026-01-01' },
  { id: 'u2', username: 'bob', password: '123456', avatar: '👨‍💻', createdAt: '2026-01-02' },
  { id: 'u3', username: 'carol', password: '123456', avatar: '👩‍🔬', createdAt: '2026-01-03' },
  { id: 'u4', username: 'dave', password: '123456', avatar: '🧑‍🎨', createdAt: '2026-01-04' },
];

export async function getUsers(): Promise<User[]> {
  await delay();
  const stored = getStore<User>(STORAGE_KEYS.USERS);
  if (stored.length === 0) {
    setStore(STORAGE_KEYS.USERS, defaultUsers);
    return defaultUsers;
  }
  return stored;
}

export async function loginUser(username: string, password: string): Promise<User> {
  await delay();
  const users = await getUsers();
  const user = users.find((u) => u.username === username && u.password === password);
  if (!user) throw new Error('用户名或密码错误');
  return user;
}

export async function registerUser(username: string, password: string): Promise<User> {
  await delay();
  const users = await getUsers();
  if (users.find((u) => u.username === username)) throw new Error('用户名已存在');
  const newUser: User = {
    id: uuid(),
    username,
    password,
    avatar: '👤',
    createdAt: new Date().toISOString().split('T')[0],
  };
  setStore(STORAGE_KEYS.USERS, [...users, newUser]);
  return newUser;
}

// ---- Tasks ----

function taskStoreKey(userId: string): string {
  return `${STORAGE_KEYS.TASKS}_${userId}`;
}

const defaultTasks: Task[] = [
  { id: 't1', userId: 'u1', title: '学习 Next.js App Router', description: '阅读官方文档，理解服务端组件和客户端组件的区别', status: 'done', priority: 'high', dueDate: '2026-07-20', order: 0, createdAt: '2026-07-10', updatedAt: '2026-07-15' },
  { id: 't2', userId: 'u1', title: '实现拖拽排序功能', description: '使用 @dnd-kit 实现任务的拖拽排序', status: 'in-progress', priority: 'high', dueDate: '2026-07-22', order: 1, createdAt: '2026-07-11', updatedAt: '2026-07-16' },
  { id: 't3', userId: 'u1', title: '添加深色模式支持', description: '使用 Tailwind dark 类实现主题切换', status: 'todo', priority: 'medium', dueDate: '2026-07-25', order: 2, createdAt: '2026-07-12', updatedAt: '2026-07-12' },
  { id: 't4', userId: 'u1', title: '编写单元测试', description: '为核心组件和 hooks 添加测试', status: 'todo', priority: 'low', dueDate: '2026-08-01', order: 3, createdAt: '2026-07-13', updatedAt: '2026-07-13' },
  { id: 't5', userId: 'u1', title: '优化 SEO', description: '添加元数据和 Open Graph 标签', status: 'todo', priority: 'low', dueDate: '2026-08-05', order: 4, createdAt: '2026-07-14', updatedAt: '2026-07-14' },
];

export async function getTasks(userId: string): Promise<Task[]> {
  await delay();
  const stored = getStore<Task>(taskStoreKey(userId));
  if (stored.length === 0 && userId === 'u1') {
    setStore(taskStoreKey(userId), defaultTasks);
    return defaultTasks;
  }
  return stored;
}

export async function createTask(userId: string, data: Omit<Task, 'id' | 'userId' | 'order' | 'createdAt' | 'updatedAt'>): Promise<Task> {
  await delay();
  const tasks = await getTasks(userId);
  const newTask: Task = {
    ...data,
    id: uuid(),
    userId,
    order: tasks.length,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  setStore(taskStoreKey(userId), [...tasks, newTask]);
  return newTask;
}

export async function updateTask(userId: string, taskId: string, data: Partial<Task>): Promise<Task> {
  await delay();
  const tasks = await getTasks(userId);
  const idx = tasks.findIndex((t) => t.id === taskId);
  if (idx === -1) throw new Error('任务不存在');
  tasks[idx] = { ...tasks[idx], ...data, updatedAt: new Date().toISOString() };
  setStore(taskStoreKey(userId), tasks);
  return tasks[idx];
}

export async function deleteTask(userId: string, taskId: string): Promise<void> {
  await delay();
  const tasks = await getTasks(userId);
  setStore(taskStoreKey(userId), tasks.filter((t) => t.id !== taskId));
}

export async function reorderTasks(userId: string, orderedIds: string[]): Promise<Task[]> {
  await delay();
  const tasks = await getTasks(userId);
  const reordered = orderedIds.map((id, idx) => {
    const t = tasks.find((t) => t.id === id);
    if (!t) throw new Error(`任务 ${id} 不存在`);
    return { ...t, order: idx, updatedAt: new Date().toISOString() };
  });
  setStore(taskStoreKey(userId), reordered);
  return reordered;
}

// ---- Projects ----

function projectStoreKey(userId: string): string {
  return `${STORAGE_KEYS.PROJECTS}_${userId}`;
}

const defaultProjects: Project[] = [
  { id: 'p1', userId: 'u1', title: '任务管理大师', description: '一个全栈任务管理应用，支持拖拽排序、深色模式、多用户登录', tags: ['nextjs', 'react', 'typescript', 'tailwind'], url: 'https://example.com/taskmaster', image: '', createdAt: '2026-07-15' },
];

export async function getProjects(userId: string): Promise<Project[]> {
  await delay();
  const stored = getStore<Project>(projectStoreKey(userId));
  if (stored.length === 0 && userId === 'u1') {
    setStore(projectStoreKey(userId), defaultProjects);
    return defaultProjects;
  }
  return stored;
}

export async function createProject(userId: string, data: Omit<Project, 'id' | 'userId' | 'createdAt'>): Promise<Project> {
  await delay();
  const projects = await getProjects(userId);
  const newProject: Project = {
    ...data,
    id: uuid(),
    userId,
    createdAt: new Date().toISOString(),
  };
  setStore(projectStoreKey(userId), [...projects, newProject]);
  return newProject;
}

export async function updateProject(userId: string, projectId: string, data: Partial<Project>): Promise<Project> {
  await delay();
  const projects = await getProjects(userId);
  const idx = projects.findIndex((p) => p.id === projectId);
  if (idx === -1) throw new Error('项目不存在');
  projects[idx] = { ...projects[idx], ...data };
  setStore(projectStoreKey(userId), projects);
  return projects[idx];
}

export async function deleteProject(userId: string, projectId: string): Promise<void> {
  await delay();
  const projects = await getProjects(userId);
  setStore(projectStoreKey(userId), projects.filter((p) => p.id !== projectId));
}
