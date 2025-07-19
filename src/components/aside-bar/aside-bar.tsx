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
          borderColor: 'gray.200',
          borderRight: '1px solid',
          height: '100vh',
          padding: '4',
          width: '280px',
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
