// src/components/input.js
import React from 'react';

export default function Input({ 
    type, 
    texto, 
    name, 
    id, 
    required, 
    options, 
    value, 
    onChange, 
    error,
    autoComplete = "off" // Valor padrão simplificado
}) {
    return (
        <div className="form-group">
            <label htmlFor={id}>
                {texto}
                {required && <span className="required">*</span>}
            </label>
            
            {(type === "combobox" || type === "select") ? (
                <select 
                    id={id} 
                    name={name} 
                    value={value}  
                    onChange={onChange} 
                    required={required} 
                    className={error ? "input-error" : ""}
                    autoComplete="off"
                >
                    <option value="">Selecione...</option>
                    {options?.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            ) : (
                <input 
                    type={type}
                    id={id}
                    name={name} 
                    value={value}
                    onChange={onChange}
                    required={required}
                    className={error ? "input-error" : ""}
                    autoComplete={autoComplete} // Usa o valor passado como prop
                />
            )}
            
            {error && <span className="error-message">{error}</span>}
        </div>
    );
};