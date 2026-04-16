import React, { useState } from "react";

/**
 * ReviewView component for Spaced Repetition.
 * Renders cards for weak concepts with difficulty rating buttons.
 */
export function ReviewView({ items, onRate, onBack }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);

  // Filter items that are due for review
  const now = Date.now();
  const dueItems = items.filter((item) => !item.nextReview || item.nextReview <= now);

  const handleRate = (difficulty) => {
    const item = dueItems[currentIndex];
    onRate(item.lessonKey, difficulty);
    setRevealed(false);
    if (currentIndex >= dueItems.length - 1) {
      // Completed current session
    } else {
      setCurrentIndex((p) => p + 1);
    }
  };

  if (dueItems.length === 0) {
    return (
      <div className="app-container">
        <header className="app-header">
          <div className="header-brand">
            <span className="brand-badge" style={{ background: "#FF7C7C" }}>REVIEW</span>
            <span className="brand-title">Spaced Repetition</span>
          </div>
          <button className="btn-outline" onClick={onBack}>← BACK</button>
        </header>
        <div className="content-area" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="exercise-box" style={{ textAlign: 'center', maxWidth: 400 }}>
            <div style={{ fontSize: 40, marginBottom: 20 }}>🎉</div>
            <div style={{ fontWeight: 700, marginBottom: 10 }}>All caught up!</div>
            <div style={{ color: "var(--text-secondary)", fontSize: 13 }}>
                You've reviewed all your weak concepts for now. Check back later!
            </div>
            <button className="btn-primary" onClick={onBack} style={{ marginTop: 20 }}>Return to Lessons</button>
          </div>
        </div>
      </div>
    );
  }

  const currentItem = dueItems[currentIndex];
  const progress = Math.round(((currentIndex) / dueItems.length) * 100);

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-brand">
          <span className="brand-badge" style={{ background: "#FF7C7C" }}>REVIEW</span>
          <span className="brand-title">Card {currentIndex + 1} of {dueItems.length}</span>
        </div>
        <button className="btn-outline" onClick={onBack}>← BACK</button>
      </header>
      
      <div className="progress-bar" style={{ height: 2, background: 'rgba(255,124,124,0.1)' }}>
        <div style={{ height: '100%', width: `${progress}%`, background: '#FF7C7C', transition: 'width 0.3s ease' }} />
      </div>

      <div className="content-area">
        <div className="content-wrapper" style={{ maxWidth: 600, marginTop: 40 }}>
          <div className="exercise-box" style={{ 
            minHeight: 300, 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            textAlign: 'center',
            padding: 40,
            borderLeft: 'none',
            border: '1px solid var(--border-light)',
            background: 'var(--bg-secondary)',
            borderRadius: 12,
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
          }}>
            <div style={{ fontSize: 12, color: "#FF7C7C", letterSpacing: 2, marginBottom: 20, fontWeight: 700 }}>
                {currentItem.lessonId} CONCEPT
            </div>
            <div style={{ fontSize: 22, fontWeight: 600, lineHeight: 1.4, color: "var(--text-primary)" }}>
                {currentItem.prompt}
            </div>

            {revealed && (
              <div style={{ marginTop: 30, paddingTop: 30, borderTop: '1px solid var(--border-light)', color: "var(--text-secondary)", fontSize: 15 }}>
                Review this concept in the lesson directly to confirm your understanding.
              </div>
            )}
          </div>

          <div style={{ marginTop: 30, display: 'grid', gap: 12 }}>
            {!revealed ? (
              <button 
                className="btn-primary" 
                onClick={() => setRevealed(true)}
                style={{ height: 50, fontSize: 16 }}
              >
                Reveal Answer
              </button>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <button onClick={() => handleRate('forgot')} className="btn-outline" style={{ borderColor: '#FF4D4D', color: '#FF4D4D' }}>Forgot</button>
                <button onClick={() => handleRate('hard')} className="btn-outline" style={{ borderColor: '#FFA500', color: '#FFA500' }}>Hard</button>
                <button onClick={() => handleRate('good')} className="btn-outline" style={{ borderColor: '#00E676', color: '#00E676' }}>Good</button>
                <button onClick={() => handleRate('easy')} className="btn-outline" style={{ borderColor: '#00C8FF', color: '#00C8FF' }}>Easy</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
