import React, { useState, useRef, useEffect } from 'react';

interface DropdownProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  options: string[];
  className?: string;
  error?: string;
  description?: string;
}

export const Dropdown = ({
  value,
  onChange,
  label,
  options,
  className = '',
  error,
  description,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  const baseButtonClasses =
    'w-full px-4 py-3 text-base border rounded-xs font-roboto focus:outline-none focus:ring-2 bg-white cursor-pointer text-left flex items-center justify-between transition-colors duration-200';

  const buttonStateClasses = error
    ? 'border-error-red-light bg-error-red-light/10 text-error-red-light focus:ring-error-red-light focus:border-red-error-red-light hover:border-error-red-light'
    : 'border-grey text-black focus:ring-bright-navy focus:border-transparent hover:border-bright-navy/50';

  const divClass = error ? 'mb-2' : 'mb-8';

  return (
    <div className={`${divClass} ${className}`} ref={dropdownRef}>
      {label && <label className="mb-2 block font-roboto-700 text-base text-black">{label}</label>}
      {description && (
        <p className="mb-3 whitespace-pre-line text-xs text-black/60">{description}</p>
      )}
      <div className="relative">
        {/* Custom dropdown button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`${baseButtonClasses} ${buttonStateClasses}`}
          aria-invalid={Boolean(error)}
        >
          <span>{value}</span>
          <svg
            className={`h-6 w-6 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : 'rotate-0'
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Custom dropdown panel */}
        {isOpen && (
          <div className="rounded-xs absolute left-0 right-0 top-full z-50 mt-1 max-h-60 overflow-y-auto border border-grey bg-white shadow-lg">
            {options.map((option, index) => (
              <button
                key={option}
                type="button"
                onClick={() => handleOptionClick(option)}
                className={`w-full cursor-pointer px-4 py-3 text-left font-roboto-400 text-base transition-colors duration-150 hover:bg-bright-navy/10 hover:text-bright-navy ${
                  option === value ? 'bg-bright-navy text-white' : 'text-black'
                } ${index === 0 ? 'rounded-t-xs' : ''} ${
                  index === options.length - 1 ? 'rounded-b-xs' : ''
                } ${index !== options.length - 1 ? 'border-b border-grey/30' : ''}`}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
