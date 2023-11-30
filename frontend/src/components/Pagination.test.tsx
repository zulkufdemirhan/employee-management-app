import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import Pagination from './Pagination';

const mockOnPageChange = jest.fn();

const defaultProps = {
  currentPage: 1,
  isLastPage: false,
  totalPageItem: 10,
  onPageChange: mockOnPageChange,
};

test('renders Pagination component', () => {
  const { getByText } = render(<Pagination {...defaultProps} />);

  expect(getByText('Total Employees 10')).toHaveTextContent('Total Employees 10');
  expect(getByText('Page 1')).toHaveTextContent('Page 1');
});

test('handles button clicks correctly', () => {
  const { getByText } = render(<Pagination {...defaultProps} />);

  userEvent.click(getByText('Next Page'));
  expect(mockOnPageChange).toHaveBeenCalledWith(2);

  userEvent.click(getByText('Previous Page'));
  expect(mockOnPageChange).toHaveBeenCalledWith(2);
});


test('disables buttons correctly', () => {
  const { getByText } = render(<Pagination {...defaultProps} currentPage={1} isLastPage={true} />);

  expect(getByText('Previous Page')).toBeDisabled();
  expect(getByText('Next Page')).toBeDisabled();
});
