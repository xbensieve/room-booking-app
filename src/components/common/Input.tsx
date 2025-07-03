import React from "react";

export interface InputProps {
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}
const Input: React.FC<InputProps> = ({
  type,
  name,
  value,
  onChange,
  placeholder,
}) => (
  <input
    type={type}
    name={name}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="..."
  />
);

export default Input;
