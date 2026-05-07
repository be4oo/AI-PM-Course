import { useCallback, useEffect, useRef, useState } from "react";

function isSpeechSynthesisSupported() {
  return (
    typeof window !== "undefined" &&
    "speechSynthesis" in window &&
    typeof window.SpeechSynthesisUtterance === "function"
  );
}

/**
 * Lesson audio playback hook (Web Speech API).
 *
 * Owns the chunk index + playback state and exposes a small player API. The
 * caller passes a precomputed `chunks` array (strings) — the hook does not
 * know how the lesson is decomposed.
 *
 * Cancels any in-flight speech on unmount or when chunks change so changing
 * lessons mid-playback does not leak utterances.
 */
export function useLessonAudio(chunks) {
  const [audioState, setAudioState] = useState("stopped");
  const [audioIndex, setAudioIndex] = useState(0);
  // Ref-indirection lets the utterance.onend callback recurse into the latest
  // play() without violating react-hooks/immutability (no forward reference).
  const playRef = useRef(() => {});

  const play = useCallback(
    (index) => {
      if (!isSpeechSynthesisSupported()) return;
      if (index >= chunks.length) {
        setAudioState("stopped");
        setAudioIndex(0);
        return;
      }
      window.speechSynthesis.cancel();
      setAudioIndex(index);
      setAudioState("playing");

      const utterance = new window.SpeechSynthesisUtterance(chunks[index]);
      utterance.onend = () => {
        // Browsers fire onend on cancel too; only advance on natural finish.
        if (window.speechSynthesis.pending || window.speechSynthesis.speaking) return;
        playRef.current(index + 1);
      };
      window.speechSynthesis.speak(utterance);
    },
    [chunks]
  );

  useEffect(() => {
    playRef.current = play;
  }, [play]);

  const pause = useCallback(() => {
    if (!isSpeechSynthesisSupported()) return;
    window.speechSynthesis.pause();
    setAudioState("paused");
  }, []);

  const resume = useCallback(() => {
    if (!isSpeechSynthesisSupported()) return;
    window.speechSynthesis.resume();
    setAudioState("playing");
  }, []);

  const stop = useCallback(() => {
    if (!isSpeechSynthesisSupported()) return;
    window.speechSynthesis.cancel();
    setAudioState("stopped");
    setAudioIndex(0);
  }, []);

  const next = useCallback(() => {
    if (audioIndex < chunks.length - 1) play(audioIndex + 1);
  }, [audioIndex, chunks.length, play]);

  const prev = useCallback(() => {
    if (audioIndex > 0) play(audioIndex - 1);
    else play(0);
  }, [audioIndex, play]);

  // Cancel speech and reset playback state if the chunk set changes (lesson
  // navigation) or on unmount, so a stale "playing" state never leaks across.
  useEffect(() => {
    return () => {
      if (isSpeechSynthesisSupported()) window.speechSynthesis.cancel();
      setAudioState("stopped");
      setAudioIndex(0);
    };
  }, [chunks]);

  return {
    supported: isSpeechSynthesisSupported(),
    audioState,
    audioIndex,
    totalChunks: chunks.length,
    play,
    pause,
    resume,
    stop,
    next,
    prev,
  };
}
