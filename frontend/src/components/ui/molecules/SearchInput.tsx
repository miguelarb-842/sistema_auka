"use client";

import { SearchField } from "@heroui/react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  label: string;
  className?: string;
}

export function SearchInput({
  value,
  onChange,
  placeholder,
  label,
  className,
}: SearchInputProps) {
  return (
    <SearchField
      fullWidth
      aria-label={label}
      className={className}
      value={value}
      onChange={onChange}
    >
      <SearchField.Group>
        <SearchField.SearchIcon />
        <SearchField.Input placeholder={placeholder} />
        <SearchField.ClearButton aria-label="Borrar búsqueda" />
      </SearchField.Group>
    </SearchField>
  );
}
