import { css } from '@/../styled-system/css';
import { flex } from '@/../styled-system/patterns';
import { Input } from '@/components';
import {
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  TableHeader,
} from 'react-aria-components';

interface Repository {
  name: string;
  stars: number;
  forks: number;
}

// Mock data - replace with actual API call
const repositories: Repository[] = [
  { name: 'react', stars: 200000, forks: 40000 },
  { name: 'vue', stars: 180000, forks: 28000 },
  { name: 'angular', stars: 90000, forks: 24000 },
];

export const Repos = () => {
  return (
    <div className={flex({ direction: 'column', gap: 4 })}>
      <div className={css({ width: '30%' })}>
        <Input placeholder="Search..." />
      </div>

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
          {repositories.map((repo) => (
            <Row
              key={repo.name}
              className={css({
                p: '3',
                borderBottom: '1px solid',
                borderColor: 'gray.200',
                '&:hover': {
                  bg: 'slate.700',
                },
              })}
            >
              <Cell>{repo.name}</Cell>
              <Cell>🌟 {repo.stars.toLocaleString()}</Cell>
              <Cell>🍴 {repo.forks.toLocaleString()}</Cell>
            </Row>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
