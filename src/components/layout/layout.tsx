import { Link } from '@tanstack/react-router';
import { Folders, UserRound } from 'lucide-react';

import { css } from '@/../styled-system/css';
import { flex } from '@/../styled-system/patterns';

import { AsideBar } from '../aside-bar';

export interface LayoutProps {
  children: React.ReactNode;
}

const navItem = css({
  padding: '2',
  display: 'flex',
  alignItems: 'center',
  gap: '2',
  _hover: {
    backgroundColor: 'slate.700',
  },
  borderRadius: 'md',
  transition: 'all 0.2s',
  '&:a': {},
});

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={flex({ direction: 'row', height: 'screen' })}>
      <AsideBar>
        <Link to="/repos" className={navItem}>
          <Folders size={16} />
          Repositories
        </Link>
        <Link
          //@ts-ignore
          to="/under-construction"
          className={navItem}
        >
          <UserRound size={16} />
          Profile
        </Link>
      </AsideBar>
      <main
        className={css({
          flex: '1',
          overflow: 'auto',
          padding: '4',
        })}
      >
        {children}
      </main>
    </div>
  );
};
