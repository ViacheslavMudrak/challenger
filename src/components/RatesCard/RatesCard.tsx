'use client';

import { useFixedTermRates } from 'lib/challenger/useFixedTermRates';
import { useState } from 'react';

const TERMS = [2, 3, 4, 5];

export default function RatesCard() {
  const [selectedTerm, setSelectedTerm] = useState(3);

  const RATES: Record<number, string | undefined> = {
    2: useFixedTermRates(['2']).twoYearFixedTermRate,
    3: useFixedTermRates(['3']).threeYearFixedTermRate,
    4: useFixedTermRates(['4']).fourYearFixedTermRate,
    5: useFixedTermRates(['5']).fiveYearFixedTermRate,
  };

  const rate = RATES[selectedTerm];

  const sliderIndex = TERMS.indexOf(selectedTerm);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTerm(TERMS[parseInt(e.target.value)]);
  };

  return (
    <div className="flex min-h-full items-center justify-center">
      <div className="flex w-[400px] flex-col items-center gap-3 bg-white px-11 py-2">
        {/* Rate Display */}
        <div className="flex items-start leading-none">
          <span className="text-7xl font-black text-deep-blue">
            <FlipNumber value={rate} />
          </span>
          <div className="ml-1.5 mt-0 flex flex-col">
            <span className="text-[42px] font-bold text-deep-blue">%*</span>
            <span className="text-[24px] font-semibold text-deep-blue">p.a.</span>
          </div>
        </div>

        {/* Label */}
        <p className="text-lg font-medium text-deep-blue">{selectedTerm} year fixed term</p>

        {/* Slider */}
        <div className="w-full px-1">
          <div className="relative flex w-full items-center justify-between">
            {/* Grey base line */}
            <div className="absolute left-0 right-0 top-1/2 z-0 h-[2px] -translate-y-1/2 text-deep-blue" />

            {/* Blue filled line */}
            <div
              className="absolute left-0 top-1/2 z-0 h-[2px] -translate-y-1/2"
              style={{ width: '100%', backgroundColor: '#003b5c' }}
            />

            {/* Invisible range input for drag functionality */}
            <input
              type="range"
              min={0}
              max={TERMS.length - 1}
              step={1}
              value={sliderIndex}
              onChange={handleSliderChange}
              className="absolute inset-0 z-20 w-full cursor-pointer opacity-0"
              aria-label="Select fixed term in years"
              aria-valuemin={TERMS[0]}
              aria-valuemax={TERMS[TERMS.length - 1]}
              aria-valuenow={selectedTerm}
              aria-valuetext={`${selectedTerm} years`}
            />

            {TERMS.map((term) => {
              const isSelected = term === selectedTerm;
              return (
                <button
                  key={term}
                  onClick={() => setSelectedTerm(term)}
                  className="relative z-10 h-4 w-4 cursor-pointer border-2 text-bright-teal focus:outline-none"
                  style={{
                    backgroundColor: isSelected ? '#2adb9b' : 'white',
                    borderColor: isSelected ? '#2adb9b' : '#003b5c',
                  }}
                  aria-label={`${term} year term`}
                />
              );
            })}
          </div>

          {/* Labels */}
          <div className="mt-2 flex justify-between">
            <span className="text-md text-deep-blue">2 years</span>
            <span className="text-md text-deep-blue">5 years</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function FlipDigit({ digit }: { digit: string }) {
  const rotateX = -(parseInt(digit) * 36);

  return (
    <span
      aria-hidden="true"
      style={{
        width: 46,
        height: 74,
        perspective: 1400,
        overflow: 'hidden',
        display: 'inline-block',
        textAlign: 'left',
      }}
    >
      <span
        style={{
          position: 'absolute',
          height: '100%',
          transformStyle: 'preserve-3d',
          transform: `rotateX(${rotateX}deg)`,
          transition: '2.5s cubic-bezier(0.19, 1, 0.22, 1)',
        }}
      >
        {Array.from({ length: 10 }, (_, i) => (
          <span
            key={i}
            style={{
              width: 46,
              height: 74,
              lineHeight: '74px',
              fontSize: 72,
              position: 'absolute',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              WebkitFontSmoothing: 'antialiased',
              background: 'none',
              backfaceVisibility: 'hidden',
              transform: `rotateX(${i * 36}deg) translateZ(108px)`,
            }}
          >
            {i}
          </span>
        ))}
      </span>
    </span>
  );
}

function FlipNumber({ value }: { value: string | undefined }) {
  return (
    <section
      aria-label={value}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      {value?.split('').map((char, i) =>
        char === '.' ? (
          <span key={i} aria-hidden="true" style={{ fontSize: 72, lineHeight: '74px' }}>
            .
          </span>
        ) : (
          <FlipDigit key={i} digit={char} />
        )
      )}
    </section>
  );
}
