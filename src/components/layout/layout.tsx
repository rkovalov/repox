import { Folders, UserRound } from 'lucide-react';
import { Link } from '@tanstack/react-router';

import { css } from '@/../styled-system/css';
import { flex } from '@/../styled-system/patterns';

import { AsideBar } from '../aside-bar';

export interface LayoutProps {
  children: React.ReactNode;
}

const navItem = css({
  _hover: {
    backgroundColor: 'slate.700',
  },
  '&:a': {},
  alignItems: 'center',
  borderRadius: 'md',
  display: 'flex',
  gap: '2',
  padding: '2',
  transition: 'all 0.2s',
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
