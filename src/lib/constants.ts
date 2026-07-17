export const STORAGE_KEYS = {
  USERS: 'tm_users',
  TASKS: 'tm_tasks',
  PROJECTS: 'tm_projects',
  CURRENT_USER: 'tm_current_user',
  THEME: 'tm_theme',
} as const;

export const STATUS_LABELS: Record<string, string> = {
  'todo': '待办',
  'in-progress': '进行中',
  'done': '已完成',
};

export const PRIORITY_LABELS: Record<string, string> = {
  'low': '低',
  'medium': '中',
  'high': '高',
};

export const PRIORITY_COLORS: Record<string, string> = {
  low: 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200',
  medium: 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-200',
  high: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200',
};

export const STATUS_COLORS: Record<string, string> = {
  'todo': 'border-l-slate-400',
  'in-progress': 'border-l-blue-500',
  'done': 'border-l-emerald-500',
};

export const TAG_LABELS: Record<string, string> = {
  nextjs: 'Next.js',
  react: 'React',
  typescript: 'TypeScript',
  tailwind: 'Tailwind',
  fullstack: '全栈',
  api: 'API',
  tool: '工具',
  game: '游戏',
  mobile: '移动端',
  other: '其他',
};
