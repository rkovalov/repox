import { Cell, Column, Row, Table, TableBody, TableHeader } from 'react-aria-components';
import { LoaderCircle, SquareArrowOutUpRight, Star, Utensils } from 'lucide-react';

import { css } from '@/../styled-system/css';
import { flex } from '@/../styled-system/patterns';

import { useRepos } from '../../hooks';
import { Filters } from '../filters';

export const Repos = () => {
  const { data, isLoading, isError } = useRepos();
  return (
    <div className={flex({ direction: 'column', gap: 4 })}>
      <Filters data-testid="filters" />
      <Table
        aria-label="GitHub repositories"
        className={css({
          '& th': {
            fontWeight: 'semibold',
            textAlign: 'left',
            // bg: 'gray.50',
          },
          '& th, & td': {
            borderBottom: '1px solid',
            borderColor: 'gray.200',
            p: '3',
          },
          borderCollapse: 'collapse',
          width: '100%',
        })}
      >
        <TableHeader
          className={css({
            borderBottom: '1px solid',
            borderColor: 'gray.200',
            p: '3',
          })}
        >
          <Column isRowHeader>Repository</Column>
          <Column isRowHeader>Stars</Column>
          <Column isRowHeader>Forks</Column>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <Row>
              <Cell colSpan={3}>
                <LoaderCircle data-testid="loader-icon" className={css({ animation: 'spin' })} />
              </Cell>
            </Row>
          ) : isError ? (
            <Row>
              <Cell colSpan={3}>Sorry, we couldn't load the repositories. Please try again later.</Cell>
            </Row>
          ) : !data?.search.nodes.length ? (
            <Row>
              <Cell colSpan={3}>No repositories found. Please adjust your filters and try again.</Cell>
            </Row>
          ) : (
            data?.search.nodes.map((repo) => (
              <Row
                key={repo.url}
                className={css({
                  '&:hover': {
                    bg: 'slate.700',
                  },
                  borderBottom: '1px solid',
                  borderColor: 'gray.200',
                  p: '3',
                })}
              >
                <Cell>
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noreferrer"
                    className={flex({ alignItems: 'center', gap: 2 })}
                  >
                    <SquareArrowOutUpRight size={12} /> {repo.name}
                  </a>
                </Cell>
                <Cell>
                  <div className={flex({ alignItems: 'center', gap: 2 })}>
                    <Star size={12} /> {repo.stargazerCount.toLocaleString()}
                  </div>
                </Cell>
                <Cell>
                  <div className={flex({ alignItems: 'center', gap: 2 })}>
                    <Utensils size={12} /> {repo.forkCount.toLocaleString()}
                  </div>
                </Cell>
              </Row>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
