import { useCallback, useState } from "react";

/**
 * Lesson search hook. Owns the search-bar visibility, query, and matching
 * results. Pass the curriculum once; the hook does case-insensitive substring
 * matching across `title`, `content`, and `keys`.
 *
 * Returns:
 *   visible           — whether the search bar is open
 *   toggle()          — flip the search bar on/off (clears state when closing)
 *   close()           — explicitly close + clear (use after picking a result)
 *   query             — current input value
 *   setQuery(q)       — write the input and recompute results in one call
 *   results           — array of { mi, li, id, title, mod }
 */
export function useLessonSearch(curriculum) {
  const [visible, setVisible] = useState(false);
  const [query, setQueryInternal] = useState("");
  const [results, setResults] = useState([]);

  const recompute = useCallback(
    (q) => {
      const trimmed = q.trim().toLowerCase();
      if (!trimmed) {
        setResults([]);
        return;
      }
      const next = [];
      curriculum.forEach((m, mi) => {
        m.lessons.forEach((l, li) => {
          const inTitle = l.title.toLowerCase().includes(trimmed);
          const inContent = l.content.toLowerCase().includes(trimmed);
          const inKeys =
            Array.isArray(l.keys) &&
            l.keys.some((k) => k.toLowerCase().includes(trimmed));
          if (inTitle || inContent || inKeys) {
            next.push({ mi, li, id: l.id, title: l.title, mod: m.title });
          }
        });
      });
      setResults(next);
    },
    [curriculum]
  );

  const setQuery = useCallback(
    (q) => {
      setQueryInternal(q);
      recompute(q);
    },
    [recompute]
  );

  const close = useCallback(() => {
    setVisible(false);
    setQueryInternal("");
    setResults([]);
  }, []);

  const toggle = useCallback(() => {
    setVisible((prev) => {
      const nextVisible = !prev;
      if (!nextVisible) {
        setQueryInternal("");
        setResults([]);
      }
      return nextVisible;
    });
  }, []);

  return { visible, setVisible, toggle, close, query, setQuery, results };
}
