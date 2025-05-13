import { Link } from '@tanstack/react-router';
import { Folders, UserRound } from 'lucide-react';

import { css } from '@/../styled-system/css';
import { flex } from '@/../styled-system/patterns';

import { Link as LinkAria } from 'react-aria-components';

import { AsideBar } from '../aside-bar';

export interface LayoutProps {
  children: React.ReactNode;
}

const navItem = css({
  padding: '2',
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
          <LinkAria className={flex({ alignItems: 'center', gap: 2 })}>
            <Folders size={16} />
            Repositories
          </LinkAria>
        </Link>
        <Link
          //@ts-ignore
          to="/under-construction"
          className={navItem}
        >
          <LinkAria className={flex({ alignItems: 'center', gap: 2 })}>
            <UserRound size={16} />
            Profile
          </LinkAria>
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
