// src/components/ZonePage/DataGraph.js
import React from 'react';
import './DataGraph.css'; // Create this CSS file if specific styles are needed

const DataGraph = ({ title, data, variableName }) => {
  // In a real implementation, you would use a charting library here
  // e.g., Chart.js, Recharts, Nivo
  // For this prototype, we'll display a simple message or basic SVG

  if (!data || data.length === 0) {
    return (
      <div className="data-graph-container placeholder">
        <h4>{title} - {variableName}</h4>
        <p>No historical data available to display.</p>
      </div>
    );
  }

  // Simple visual representation (very basic)
  const maxValue = Math.max(...data.map(d => d.value), 0);

  return (
    <div className="data-graph-container">
      <h4>{title} - {variableName}</h4>
      <div className="graph-placeholder">
        {/* This is a very rudimentary representation. Replace with a proper chart. */}
        <svg width="100%" height="100" viewBox={`0 0 ${data.length * 50} 100`} preserveAspectRatio="none">
          <polyline
            fill="none"
            stroke={variableName === 'Temperature' ? 'var(--warning-color)' : 'var(--primary-green)'}
            strokeWidth="2"
            points={data.map((d, i) => `${i * 50 + 25},${100 - (d.value / (maxValue || 1)) * 80}`).join(' ')}
          />
          {data.map((d, i) => (
            <g key={i}>
              <circle cx={i * 50 + 25} cy={100 - (d.value / (maxValue || 1)) * 80} r="3" fill="var(--dark-green)" />
              <text x={i*50 + 25} y={98} fontSize="10" textAnchor="middle">{d.time}</text>
            </g>
          ))}
        </svg>
        <p className="graph-note">
          Interactive graph with zoom/scroll will be implemented here.
        </p>
      </div>
    </div>
  );
};

export default DataGraph;