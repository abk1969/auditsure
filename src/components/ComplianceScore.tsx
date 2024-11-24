import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface ComplianceScoreProps {
  score: number;
  previousScore?: number;
}

export function ComplianceScore({ score, previousScore }: ComplianceScoreProps) {
  const scoreColor = score >= 80 ? '#22c55e' : score >= 60 ? '#eab308' : '#ef4444';
  const scoreDiff = previousScore ? score - previousScore : 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Score de conformité ISO 22342</h3>
      <div className="flex items-center justify-between">
        <div className="w-24 h-24">
          <CircularProgressbar
            value={score}
            text={`${score}%`}
            styles={buildStyles({
              pathColor: scoreColor,
              textColor: scoreColor,
              trailColor: '#e5e7eb',
            })}
          />
        </div>
        <div className="ml-6">
          <div className="flex items-center">
            {scoreDiff !== 0 && (
              <span className={`text-sm font-medium ${scoreDiff > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {scoreDiff > 0 ? '+' : ''}{scoreDiff}%
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            depuis le dernier audit
          </p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-4">
        {['Documentation', 'Processus', 'Formation'].map((category) => (
          <div key={category} className="text-center">
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              {category}
            </div>
            <div className="mt-1 text-2xl font-semibold text-gray-700 dark:text-gray-300">
              {Math.floor(Math.random() * 20 + 80)}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}