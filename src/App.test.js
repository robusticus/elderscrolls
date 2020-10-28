import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders elder scrolls legends', () => {
  const { getByText } = render(<App />);
  const headerElement = getByText("Elder Scrolls Legends");
  expect(headerElement).toBeInTheDocument();
});
