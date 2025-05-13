import { css } from '@/../styled-system/css';
import { Input } from '@/components';
import { useFilters } from '../../hooks';

export const Filters: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...otherProps
}) => {
  const { filters, onFilterChange } = useFilters();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ search: event.target.value });
  };

  return (
    <div className={css({ width: '30%' })} {...otherProps}>
      <Input
        placeholder="Search..."
        defaultValue={filters.search}
        onChange={handleInputChange}
      />
    </div>
  );
};
