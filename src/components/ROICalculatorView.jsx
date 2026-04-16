import React, { useState } from "react";

function Slider({ label, value, min, max, step, onChange, unit = "" }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={{ fontSize: 13, color: "var(--text-secondary)", fontWeight: 600 }}>{label}</span>
        <span style={{ fontSize: 13, color: "#00D2FF", fontWeight: 700 }}>
          {unit}
          {value.toLocaleString()}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        style={{ width: "100%", accentColor: "#00D2FF", cursor: "pointer" }}
      />
    </div>
  );
}

/**
 * ROICalculatorView component for financial modeling of AI features.
 */
export function ROICalculatorView({ onBack }) {
  const [volume, setVolume] = useState(5000);
  const [timeSaved, setTimeSaved] = useState(15);
  const [rate, setRate] = useState(80);
  const [accuracy, setAccuracy] = useState(85);
  const [devCost, setDevCost] = useState(25000);
  const [tokenCost, setTokenCost] = useState(0.05);

  // Math
  const monthlyLaborHours = (volume * timeSaved) / 60;
  const monthlyLaborCost = monthlyLaborHours * rate;
  const effectiveGain = (accuracy / 100);
  const monthlySavings = monthlyLaborCost * effectiveGain;
  const monthlyOpsCost = volume * tokenCost;
  const netMonthlyGain = monthlySavings - monthlyOpsCost;
  const annualSavings = netMonthlyGain * 12;
  const paybackPeriod = netMonthlyGain > 0 ? (devCost / netMonthlyGain).toFixed(1) : "∞";
  const year1ROI = devCost > 0 ? (((annualSavings - devCost) / devCost) * 100).toFixed(0) : "0";

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-brand">
          <span className="brand-badge" style={{ background: "#00D2FF", color: "#00161D" }}>CALC</span>
          <span className="brand-title">AI PM ROI Estimator</span>
        </div>
        <button className="btn-outline" onClick={onBack}>← BACK</button>
      </header>

      <div className="content-area">
        <div className="content-wrapper" style={{ maxWidth: 1000, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 30 }}>
          
          {/* Inputs */}
          <div className="exercise-box" style={{ padding: 30 }}>
            <div style={{ fontSize: 11, color: "var(--text-muted)", letterSpacing: 2, marginBottom: 25, fontWeight: 700 }}>VARIABLES</div>
            
            <Slider label="Monthly Volume (Tasks/Inferences)" value={volume} min={100} max={50000} step={100} onChange={setVolume} />
            <Slider label="Time Saved per Task (Minutes)" value={timeSaved} min={1} max={120} step={1} onChange={setTimeSaved} />
            <Slider label="Labor Rate ($/Hour)" value={rate} min={10} max={300} step={5} onChange={setRate} unit="$" />
            <Slider label="AI Accuracy / Success Rate (%)" value={accuracy} min={50} max={100} step={1} onChange={setAccuracy} unit="%" />
            <Slider label="Token/Inference Cost ($)" value={tokenCost} min={0.001} max={1.0} step={0.005} onChange={setTokenCost} unit="$" />
            <Slider label="Development & Setup Cost ($)" value={devCost} min={0} max={250000} step={5000} onChange={setDevCost} unit="$" />
          </div>

          {/* Results */}
          <div style={{ display: 'grid', gap: 20 }}>
            <div className="exercise-box" style={{ background: 'linear-gradient(135deg, #0a1015 0%, #00161d 100%)', borderLeftColor: '#00D2FF', padding: 30 }}>
              <div style={{ fontSize: 11, color: "#00D2FF", letterSpacing: 2, marginBottom: 30, fontWeight: 700 }}>THE BUSINESS CASE</div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                <div>
                  <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 4 }}>ANNUAL NET SAVINGS</div>
                  <div style={{ fontSize: 24, fontWeight: 700, color: annualSavings > 0 ? '#00E676' : '#FF4D4D' }}>
                    ${Math.round(annualSavings).toLocaleString()}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 4 }}>PAYBACK PERIOD</div>
                  <div style={{ fontSize: 24, fontWeight: 700 }}>{paybackPeriod} <span style={{ fontSize: 12 }}>months</span></div>
                </div>
                <div style={{ gridColumn: 'span 2', marginTop: 10, padding: 20, background: 'rgba(255,255,255,0.03)', borderRadius: 8 }}>
                    <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 4 }}>ESTIMATED YEAR 1 ROI</div>
                    <div style={{ fontSize: 40, fontWeight: 800, color: '#00D2FF' }}>{year1ROI}%</div>
                </div>
              </div>
            </div>

            <div className="exercise-box" style={{ borderLeftColor: '#8FB9FF' }}>
               <div style={{ fontSize: 11, color: "#8FB9FF", letterSpacing: 2, marginBottom: 15, fontWeight: 700 }}>PM INSIGHT</div>
               <div style={{ fontSize: 13, lineHeight: 1.6, color: "var(--text-secondary)" }}>
                  {year1ROI > 100 ? (
                    "🚀 This is a high-conviction AI bet. The labor savings alone cover the development cost in less than a year."
                  ) : annualSavings > 0 ? (
                    "⚖️ Moderate ROI. Consider if the Accuracy/Trust factors outweigh the financial gains."
                  ) : (
                    "⚠️ Warning: The current token/infrastructure cost exceeds the labor savings. Consider using a smaller model tier (e.g., GPT-4o-mini or Haiku) to optimize margin."
                  )}
               </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
