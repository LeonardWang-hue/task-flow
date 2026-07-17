'use client';

import { useState, useCallback, useRef } from 'react';

interface UndoEntry<T> {
  action: 'delete' | 'update';
  data: T;
  previous?: T;
}

export function useUndo<T>() {
  const [entry, setEntry] = useState<UndoEntry<T> | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const push = useCallback((e: UndoEntry<T>, timeoutMs: number = 5000) => {
    setEntry(e);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setEntry(null), timeoutMs);
  }, []);

  const clear = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setEntry(null);
  }, []);

  return { entry, push, clear };
}
