import { css } from '@/../styled-system/css';
import { flex } from '@/../styled-system/patterns';
import {
  LoaderCircle,
  SquareArrowOutUpRight,
  Star,
  Utensils,
} from 'lucide-react';
import {
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  TableHeader,
} from 'react-aria-components';
import { useRepos } from '../../hooks';
import { Filters } from '../filters';

export const Repos = () => {
  const { data, isLoading, isError } = useRepos();
  return (
    <div className={flex({ direction: 'column', gap: 4 })}>
      <Filters />
      <Table
        aria-label="GitHub repositories"
        className={css({
          width: '100%',
          borderCollapse: 'collapse',
          '& th, & td': {
            p: '3',
            borderBottom: '1px solid',
            borderColor: 'gray.200',
          },
          '& th': {
            textAlign: 'left',
            fontWeight: 'semibold',
            // bg: 'gray.50',
          },
        })}
      >
        <TableHeader
          className={css({
            p: '3',
            borderBottom: '1px solid',
            borderColor: 'gray.200',
          })}
        >
          <Column>Repository</Column>
          <Column>Stars</Column>
          <Column>Forks</Column>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <Row>
              <Cell colSpan={3}>
                <LoaderCircle className={css({ animation: 'spin' })} />
              </Cell>
            </Row>
          ) : isError ? (
            <Row>
              <Cell colSpan={3}>
                Sorry, we couldn't load the repositories. Please try again
                later.
              </Cell>
            </Row>
          ) : !data?.search.nodes.length ? (
            <Row>
              <Cell colSpan={3}>
                No repositories found. Please adjust your filters and try again.
              </Cell>
            </Row>
          ) : (
            data?.search.nodes.map((repo) => (
              <Row
                key={repo.url}
                className={css({
                  p: '3',
                  borderBottom: '1px solid',
                  borderColor: 'gray.200',
                  '&:hover': {
                    bg: 'slate.700',
                  },
                })}
              >
                <Cell>
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noreferrer"
                    className={flex({ gap: 2, alignItems: 'center' })}
                  >
                    <SquareArrowOutUpRight size={12} /> {repo.name}
                  </a>
                </Cell>
                <Cell>
                  <div className={flex({ gap: 2, alignItems: 'center' })}>
                    <Star size={12} /> {repo.stargazerCount.toLocaleString()}
                  </div>
                </Cell>
                <Cell>
                  <div className={flex({ gap: 2, alignItems: 'center' })}>
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
