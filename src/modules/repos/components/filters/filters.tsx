import { useEffect, useRef, useState } from 'react';

import { css } from '@/../styled-system/css';
import { Input } from '@/components';

import { useFilters } from '../../hooks';

export const Filters: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...otherProps
}) => {
  const { filters, onFilterChange } = useFilters();
  const [localFilters, setLocalFilters] = useState(filters);
  const lastSubmittedFilters = useRef(filters);

  const handleLocalFiltersChange = (newFilters: Partial<typeof filters>) => {
    setLocalFilters((prev) => {
      onFilterChange(newFilters);
      const updatedFilters = { ...prev, ...newFilters };
      lastSubmittedFilters.current = updatedFilters;
      return updatedFilters;
    });
  };

  useEffect(() => {
    if (
      JSON.stringify(filters) !== JSON.stringify(lastSubmittedFilters.current)
    ) {
      setLocalFilters(filters);
      lastSubmittedFilters.current = filters;
    }
  }, [filters]);

  return (
    <div className={css({ width: '30%' })} {...otherProps}>
      <Input
        placeholder="Search..."
        value={localFilters.search ?? ''}
        onChange={(event) =>
          handleLocalFiltersChange({ search: event.target.value })
        }
      />
    </div>
  );
};
