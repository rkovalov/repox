import { css, cx } from '@/../styled-system/css';
import { flex } from '@/../styled-system/patterns';

interface AsideBarProps {
  children: React.ReactNode;
  className?: string;
}

export function AsideBar({ children, className }: AsideBarProps) {
  return (
    <aside
      className={cx(
        css({
          width: '280px',
          height: '100vh',
          borderRight: '1px solid',
          borderColor: 'gray.200',
          padding: '4',
        }),
        className,
      )}
    >
      <div
        className={flex({
          direction: 'column',
          gap: '4',
        })}
      >
        {children}
      </div>
    </aside>
  );
}
