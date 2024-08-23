import React from 'react';

const inputForm = ({htmlFor, label, type, id, value, disabled, placeholder, required, onChange, className }) => {
    return (
        <div>
            <label htmlFor={htmlFor} className="block mb-1">{label}</label>
            <input
                type={type}
                id={id}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                disabled={disabled}
                required={required}
                className={className}
            />
        </div>
    );
};
// className={`border rounded-md px-4 py-2 w-full ${disabled ? 'border-gray-600' : 'border-gray-300'}`}

export default inputForm;
