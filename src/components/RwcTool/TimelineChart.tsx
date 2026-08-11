import React from 'react';

interface BarData {
  endAge: number;
  label: string | React.ReactNode;
}

interface TimelineChartProps {
  bars: BarData[];
  startAge?: number;
  endAge?: number;
  yearIncrement?: number;
  className?: string;
}

const TimelineChart: React.FC<TimelineChartProps> = ({
  bars,
  startAge = 71,
  endAge = 111,
  yearIncrement = 5,
  className = '',
}) => {
  // Calculate width for each bar
  const calculateBarWidth = (barEndAge: number) =>
    `calc((${barEndAge} - ${startAge}) / (${endAge} - ${startAge}) * 100%)`;

  // Generate year labels dynamically with configurable increment
  const yearLabels: number[] = [];
  for (let year = startAge; year <= endAge; year += yearIncrement) {
    yearLabels.push(year);
  }

  return (
    <div className={`pr-12 pt-6 ${className}`} style={{ backgroundColor: '#f5f6f7' }}>
      <div
        className="relative mb-8 overflow-hidden rounded-sm py-6"
        style={{ backgroundColor: '#f5f6f7' }}
      >
        {/* Vertical grid lines */}
        <div
          className="absolute left-0 top-0 flex w-full justify-between"
          style={{ height: 'calc(100% - 1.5rem)' }}
        >
          {Array.from({ length: yearLabels.length }, (_, i) => (
            <div
              key={i}
              className={`h-full w-px ${
                i === yearLabels.length - 1 ? 'bg-transparent' : 'bg-grey opacity-50'
              }`}
            />
          ))}
        </div>

        <div className="relative z-10 mb-6 flex flex-col gap-2">
          {bars.map((bar, index) => {
            const labelString = typeof bar.label === 'string' ? bar.label : String(bar.label);
            const isSuperBar =
              typeof bar.label === 'string'
                ? labelString.toLowerCase().includes('super')
                : index === 0;
            const barColorClass = isSuperBar ? 'bg-bright-teal' : 'bg-grey';
            const textColor = isSuperBar ? 'text-bright-navy' : 'text-black';

            return (
              <div
                key={index}
                className={`${barColorClass} rounded-xs flex h-10 items-center justify-center px-4`}
                style={{ width: calculateBarWidth(bar.endAge) }}
              >
                <span className={`${textColor} font-roboto-700 text-sm`}>{bar.label}</span>
              </div>
            );
          })}
        </div>
        <div className="relative z-10">
          {/* Year labels */}
          <div className="flex justify-between font-roboto-500 text-xs text-bright-navy">
            {yearLabels.map((year) => (
              <span key={year}>{year} yrs</span>
            ))}
          </div>

          {/* Horizontal line under the year labels */}
          <div className="h-px w-full bg-grey opacity-50"></div>
        </div>
      </div>
    </div>
  );
};

export default TimelineChart;
