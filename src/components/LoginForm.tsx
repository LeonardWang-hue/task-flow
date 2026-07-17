'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginForm() {
  const { login, register } = useAuth();
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const demoUsers = [
    { username: 'alice', label: 'Alice (默认数据)' },
    { username: 'bob', label: 'Bob (空数据)' },
    { username: 'carol', label: 'Carol (空数据)' },
    { username: 'dave', label: 'Dave (空数据)' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('请填写用户名和密码');
      return;
    }
    setLoading(true);
    setError('');
    try {
      if (isRegister) {
        await register(username.trim(), password);
      } else {
        await login(username.trim(), password);
      }
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : '操作失败');
    } finally {
      setLoading(false);
    }
  };

  const quickLogin = async (uname: string) => {
    setLoading(true);
    setError('');
    try {
      await login(uname, '123456');
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : '登录失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold">
            <span className="text-[var(--primary)]">Task</span>Flow
          </h1>
          <p className="mt-2 text-sm text-[var(--muted-foreground)]">
            {isRegister ? '创建账号开始管理任务' : '登录你的账号'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
          <div>
            <label className="block text-xs font-medium text-[var(--muted-foreground)] mb-1.5">用户名</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]/30 transition-all"
              placeholder="输入用户名"
              autoFocus
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[var(--muted-foreground)] mb-1.5">密码</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]/30 transition-all"
              placeholder="输入密码 (默认: 123456)"
            />
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 px-3 py-2 text-xs text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[var(--primary)] py-2.5 text-sm font-medium text-[var(--primary-foreground)] hover:bg-[var(--primary-hover)] disabled:opacity-50 transition-all"
          >
            {loading ? '处理中...' : isRegister ? '注册' : '登录'}
          </button>

          <button
            type="button"
            onClick={() => { setIsRegister(!isRegister); setError(''); }}
            className="w-full text-xs text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
          >
            {isRegister ? '已有账号？去登录' : '没有账号？去注册'}
          </button>
        </form>

        <div className="mt-6">
          <p className="text-xs text-[var(--muted-foreground)] text-center mb-3">演示账号 (密码均为 123456)</p>
          <div className="grid grid-cols-2 gap-2">
            {demoUsers.map((u) => (
              <button
                key={u.username}
                onClick={() => quickLogin(u.username)}
                disabled={loading}
                className="rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-xs hover:bg-[var(--muted)] disabled:opacity-50 transition-all text-left"
              >
                <span className="font-medium">{u.username}</span>
                <span className="block text-[var(--muted-foreground)]">{u.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
