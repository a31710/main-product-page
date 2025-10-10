import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import JobList from './JobList';

jest.mock('@/hooks/useJobs', () => ({
  useJobs: () => ({
    data: {
      data: [
        {
          id: '1',
          title: 'Frontend Engineer',
          company: 'Acme',
          description: 'Build UIs',
          location: 'Hanoi',
          type: 'remote',
          created_at: new Date().toISOString(),
        },
      ],
      totalCount: 6,
    },
    isLoading: false,
    isFetching: false,
    isError: false,
    error: null,
  }),
}));

jest.mock('@/store/useFilterStore', () => ({
  useFilterStore: () => ({
    keyword: '',
    location: '',
    type: '',
    page: 1,
    pageSize: 5,
    setKeyword: jest.fn(),
    setLocation: jest.fn(),
    setType: jest.fn(),
    setPage: jest.fn(),
    setPageSize: jest.fn(),
    setDebouncedKeyword: jest.fn(),
    setDebouncedLocation: jest.fn(),
    reset: jest.fn(),
  }),
}));

jest.mock('../JobItem/JobItem', () => ({ __esModule: true, default: (props: any) => {
  const React = require('react');
  return React.createElement('div', { 'data-testid': 'job-item' }, props.job.title);
}}));

jest.mock('../Pagination/Pagination', () => ({ __esModule: true, default: () => {
  const React = require('react');
  return React.createElement('div', { 'data-testid': 'pagination' }, 'pagination');
}}));

jest.mock('@/components/ui/Input/Input', () => ({ __esModule: true, default: (props: any) => {
  const React = require('react');
  // Make input uncontrolled so userEvent can type and value changes
  const { value, ...rest } = props;
  return React.createElement('input', { 'data-testid': 'input', defaultValue: value, ...rest });
}}));

jest.mock('@/components/ui/Select/Select', () => ({ __esModule: true, default: (props: any) => {
  const React = require('react');
  const { value, ...rest } = props;
  return React.createElement('select', { 'data-testid': 'select', defaultValue: value, ...rest });
}}));

jest.mock('@/components/ui/Skeleton/Skeleton', () => ({ __esModule: true, default: () => {
  const React = require('react');
  return React.createElement('div', { 'data-testid': 'skeleton' });
}}));

describe('JobList', () => {
  it('renders job items and pagination', async () => {
    render(<JobList />);

    expect(await screen.findByTestId('job-item')).toBeInTheDocument();
    expect(screen.getByText('Showing 1 of 6 jobs')).toBeInTheDocument();
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });

  it('allows typing into inputs', async () => {
    render(<JobList />);
    const inputs = await screen.findAllByTestId('input');

    await userEvent.type(inputs[0], 'engineer');
    await userEvent.type(inputs[1], 'hanoi');

    await waitFor(() => {
      expect(inputs[0]).toHaveValue('engineer');
      expect(inputs[1]).toHaveValue('hanoi');
    });
  });
});
