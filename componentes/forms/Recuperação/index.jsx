import React from 'react';
import Input from "../../input";

export const ContactUs = ({ formData, onChange }) => {
  const inputs = [
   {
      texto: "Email",
      name: "user_email",
      type: "email",
      required: true
    }
 
  ];

  return (
    <div>
      {inputs.map((input) => (
        <div key={input.name}>
          <label>{input.texto}</label>
          {input.type === 'textarea' ? 
          (
            <textarea 
              name={input.name}
              value={formData[input.name] || ''}
              onChange={onChange}
              required={input.required} />
          ) : (
            <Input
              type={input.type}
              name={input.name}
              value={formData[input.name] || ''}
              onChange={onChange}
              required={input.required}
            />
          )}
        </div>
      ))}
    </div>
  );
};