interface OptionSelectorProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  options: string[];
  className?: string;
  error?: string;
}

export const OptionSelector = ({
  value,
  onChange,
  label,
  options,
  className = '',
  error,
}: OptionSelectorProps) => {
  return (
    <div className={`mb-8 ${className}`}>
      <label className="mb-2 block font-roboto-700 text-base text-black">{label}</label>
      <div className="flex gap-4">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => {
              onChange(option);
            }}
            className={`rounded-xs cursor-pointer px-6 py-2 font-roboto-700 text-lg transition-colors ${
              value.trim().toLowerCase() === option.toLowerCase()
                ? 'bg-bright-navy text-white'
                : 'cursor-default bg-grey opacity-40'
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      {error && <p className="mt-2 font-roboto-400 text-xs text-error-red-light">{error}</p>}
    </div>
  );
};
