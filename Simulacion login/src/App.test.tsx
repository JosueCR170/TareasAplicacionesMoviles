import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { AuthProvider} from './context/AuthContext';
import { vi } from "vitest";

beforeAll(() => {
  Object.defineProperty(window, "sessionStorage", {
    value: {
      getItem: vi.fn(() => null), // Simula que no hay usuario guardado
      setItem: vi.fn(),
      removeItem: vi.fn(),
    },
    writable: true,
  });
});

test('renders without crashing', () => {
  const { baseElement } = render(
<AuthProvider>
  <App />
</AuthProvider>
);
  expect(baseElement).toBeDefined();
});
