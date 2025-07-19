import { screen } from '@testing-library/react';

import * as testsUtils from '@/utils/tests';

import { fetchRepositories, mock } from '../../data-provider';
import { Repos } from './repos';

describe('Repos', () => {
  beforeAll(() => {
    // Mock the hooks
    vi.mock('../../hooks/use-filters', () => ({
      useFilters: vi.fn().mockReturnValue({
        filters: { search: '' },
        onFilterChange: vi.fn(),
      }),
    }));
  });

  it('should render the Filters component', () => {
    fetchRepositories.useMock(mock.mockEmptyRepositories);
    testsUtils.renderWithQueryClient(<Repos />);
    // Check for the search filter
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
  });

  it('should render the table with correct headers', () => {
    fetchRepositories.useMock(mock.mockEmptyRepositories);
    testsUtils.renderWithQueryClient(<Repos />);

    expect(screen.getByText('Repository')).toBeInTheDocument();
    expect(screen.getByText('Stars')).toBeInTheDocument();
    expect(screen.getByText('Forks')).toBeInTheDocument();
  });

  it('should render loading state', () => {
    fetchRepositories.useMock(() => {
      // Simulate loading state by never resolving the promise
      return new Promise(() => {});
    });
    testsUtils.renderWithQueryClient(<Repos />);
    const loadingElement = screen.getByTestId('loader-icon');
    expect(loadingElement).toBeInTheDocument();
  });

  it('should render error state', async () => {
    fetchRepositories.useMock(() => Promise.reject('Error loading repositories'));
    testsUtils.renderWithQueryClient(<Repos />);
    const errorText = await screen.findByText(/Sorry, we couldn't load the repositories/i);
    expect(errorText).toBeInTheDocument();
  });

  it('should render empty state when no repositories found', async () => {
    fetchRepositories.useMock(mock.mockEmptyRepositories);

    testsUtils.renderWithQueryClient(<Repos />);
    const notFoundText = await screen.findByText(/No repositories/i);
    expect(notFoundText).toBeInTheDocument();
  });

  it('should render repositories list when data is available', async () => {
    fetchRepositories.useMock(mock.mockRepositories);
    testsUtils.renderWithQueryClient(<Repos />);

    expect(await screen.findByText('repo1')).toBeInTheDocument();
    expect(await screen.findByText('repo2')).toBeInTheDocument();
  });
});
