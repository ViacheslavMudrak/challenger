import { useEffect } from 'react';

export interface UseHeadScriptOptions {
  id: string;
  content: string;
  type?: string | 'application/ld+json';
}

export default function useHeadScript({
  id,
  content,
  type = 'application/ld+json',
}: UseHeadScriptOptions): void {
  useEffect(() => {
    let script = document.querySelector<HTMLScriptElement>(`script#${id}`);

    if (!script) {
      script = document.createElement('script');
      script.id = id;
      script.type = type;
      document.head.appendChild(script);
    }

    script.textContent = content;

    return () => {
      const el = document.querySelector<HTMLScriptElement>(`script#${id}`);
      if (el) document.head.removeChild(el);
    };
  }, [id, content, type]);
}
