import { formatCurrency } from 'lib/challenger/rwc';

export const InputField = ({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  prefix,
  suffix,
  note,
  description,
  required = false,
  error,
  name,
  min,
  max,
  labelColor = 'text-black',
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
  prefix?: string;
  suffix?: string;
  note?: string;
  description?: string;
  required?: boolean;
  error?: string;
  name?: string;
  min?: number;
  max?: number;
  labelColor?: string;
}) => (
  <div className="mb-8">
    <label className={`mb-2 block text-base font-bold ${labelColor}`}>{label}</label>

    {description && (
      <p className="mb-3 whitespace-pre-line text-xs  text-black/60">{description}</p>
    )}

    <div className="relative">
      {prefix && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 transform font-bold text-secondary-grey">
          {prefix}
        </span>
      )}

      <input
        type={prefix === '$' ? 'text' : type}
        value={
          prefix === '$'
            ? (() => {
                const sanitized = value.replace(/,/g, '');
                if (sanitized === '') return '';
                const numericValue = Number(sanitized);
                if (Number.isNaN(numericValue)) return value;
                return formatCurrency(numericValue, 'en-AU', { maximumFractionDigits: 2 });
              })()
            : value
        }
        onChange={(e) => {
          const inputValue = e.target.value;
          if (prefix === '$') {
            const sanitized = inputValue.replace(/,/g, '').replace(/[^\d.]/g, '');
            onChange(sanitized);
          } else {
            onChange(inputValue);
          }
        }}
        placeholder={placeholder}
        required={required}
        name={name}
        min={min}
        max={max}
        className={`peer w-full ${prefix ? 'pl-8' : 'pl-4'} ${
          suffix ? 'pr-20' : 'pr-4'
        } border py-3 ${error ? 'border-error-red-light bg-error-red-light/10 focus:border-error-red-light focus:ring-error-red-light' : 'border-grey bg-white focus:border-grey focus:ring-grey'} rounded-sm  
    text-black 
    placeholder:text-black/50 
    placeholder-shown:text-black/50
    focus:outline-none focus:ring-1 focus:ring-opacity-50`}
      />

      {suffix && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 transform text-xs text-black ">
          {suffix}
        </span>
      )}
    </div>

    {error && <p className="mt-2 text-xs text-error-red-light ">{error}</p>}

    {note && <p className="mt-4 whitespace-pre-line text-xs  text-black/60">{note}</p>}
  </div>
);
