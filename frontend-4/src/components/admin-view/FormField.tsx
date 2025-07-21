import React from 'react';

interface FormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'tel' | 'number' | 'password' | 'textarea' | 'select' | 'date' | 'file';
  value: string | number | boolean;
  onChange: (name: string, value: string | number | File | null) => void;
  placeholder?: string;
  required?: boolean;
  options?: { value: string | boolean; label: string }[];
  rows?: number;
  min?: number;
  max?: number;
  step?: number;
  error?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  options = [],
  rows = 3,
  min,
  max,
  step,
  error
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const newValue = type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value;
    onChange(name, newValue);
  };

  const baseClasses = "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200";
  const errorClasses = error ? "border-red-300 bg-red-50" : "border-gray-300";

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      {type === 'textarea' ? (
        <textarea
          name={name}
          value={typeof value === 'boolean' ? String(value) : value}
          onChange={handleChange}
          placeholder={placeholder}
          required={required}
          rows={rows}
          className={`${baseClasses} ${errorClasses} resize-none`}
        />
      ) : type === 'select' ? (
        <select
          name={name}
          value={typeof value === 'boolean' ? String(value) : value}
          onChange={handleChange}
          required={required}
          className={`${baseClasses} ${errorClasses}`}
        >
          <option value="">Sélectionner...</option>
          {options.map((option) => (
            <option
              key={String(option.value)}
              value={typeof option.value === 'boolean' ? String(option.value) : option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={type === 'file' ? undefined : value || typeof value === 'boolean' ? String(value) : ''}
          onChange={(e) => {
                    if (type === 'file') {
                      const file = e.target.files?.[0] ?? null;
                      onChange(name, file); // ✅ fichier
                    } else if (type === 'number') {
                      onChange(name, parseFloat(e.target.value)); // ✅ number
                    } else {
                      onChange(name, e.target.value); // ✅ string
                    }
                  }}          
          placeholder={placeholder}
          required={required}
          min={min}
          max={max}
          step={step}
          className={`${baseClasses} ${errorClasses}`}
        />
      )}
      
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default FormField;