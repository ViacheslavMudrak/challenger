import React from 'react';

interface ValueDisplayProps {
  value: string | number;
  label: string;
}

export const ValueDisplay: React.FC<ValueDisplayProps> = ({ value, label }) => {
  return (
    <div className="flex items-center justify-between rounded-sm bg-grey-light px-4 py-3">
      <span className="font-roboto-700 text-2xl text-deep-green">{value}</span>
      <span className="font-roboto-400 text-xs text-black">{label}</span>
    </div>
  );
};

export default ValueDisplay;
