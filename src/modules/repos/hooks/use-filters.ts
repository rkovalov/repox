import { useRef } from 'react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { debounce } from '@/utils';

interface Filters {
  search?: string;
}

export const useFilters = (): {
  filters: Filters;
  onFilterChange: (filters: Partial<Filters>) => void;
} => {
  const path = '/repos/' as const;
  const searchParams = useSearch({ from: path });
  const navigate = useNavigate({ from: path });

  const onFilterChange = useRef(
    debounce((newFilters: Partial<Filters>) => {
      navigate({ search: (prev) => ({ ...prev, ...newFilters }) });
    }, 300),
  );

  return { filters: searchParams, onFilterChange: onFilterChange.current };
};
