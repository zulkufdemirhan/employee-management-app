import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './Header';

test('renders a link to "/employee/form"', () => {
  render(
    <Router>
      <Header />
    </Router>
  );

  const link = screen.getByRole('link', { name: /add new employee/i });

  expect(link.getAttribute('href')).toBe('/employee/form');
});