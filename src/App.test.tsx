import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders without error', () => {
  const app = render(<App />);
  expect(app).toBeTruthy();
});
