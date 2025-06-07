import { ChangeEvent, useState, useEffect } from "react";

interface InputFieldProps {
  label?: string;
  placeholder?: string;
  value?: string | number;
  type?: "text" | "number" | "email" | "password";
  large?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function InputField({
  label,
  placeholder,
  value,
  type = "text",
  large = false,
  onChange,
}: InputFieldProps) {
  const [id, setId] = useState("");

  useEffect(() => {
    setId(Math.random().toString(36).substring(2, 11));
  }, []);

  if (!id) return null;

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium mb-1">
          {label}
        </label>
      )}
      {large ? (
        <textarea
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
          rows={4}
        />
      ) : (
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
        />
      )}
    </div>
  );
}
