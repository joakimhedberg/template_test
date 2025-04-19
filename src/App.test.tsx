import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('Renders uppdragsledare input box', () => {
  render(<App />);
  const element = screen.getByPlaceholderText('Uppdragsledare')
  expect(element).toBeInTheDocument();
});

test('Renders the copy button', () => {
  render(<App />)
  const element = screen.getByText('Kopiera')
  expect(element).toBeInTheDocument()
})
