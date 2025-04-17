import React from 'react';
import { render, screen, fireEvent,waitFor } from '@testing-library/react';
import App from '../App';
import { AuthProvider } from '../context/AuthContext';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

beforeAll(() => {
  const mockSessionStorage = (() => {
    let store: Record<string, string> = {};
    return {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => {
        store[key] = value;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      },
    };
  })();

  Object.defineProperty(window, 'sessionStorage', {
    value: mockSessionStorage,
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

test('redirects to login when user is not authenticated', async () => {
  vi.spyOn(window.sessionStorage, 'getItem').mockReturnValue(null); // Simular usuario no autenticado

  render(
    <AuthProvider>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </AuthProvider>
  );

  await waitFor(() => {
    expect(screen.getByText(/Inicio de Sesión/i)).toBeInTheDocument();
  });
});


test('shows IonToast for invalid credentials', async () => {
  vi.spyOn(window.sessionStorage, 'getItem').mockReturnValue(null);
  render(
    <AuthProvider>
      <MemoryRouter initialEntries={['/login']}>
        <App />
      </MemoryRouter>
    </AuthProvider>
  );

  // Busca los elementos del formulario
  const emailInput = screen.getByPlaceholderText(/example@domain.com/i); // Ajusta el placeholder si es diferente
  const passwordInput = screen.getByPlaceholderText("********"); // Ajusta el placeholder si es diferente
  const loginButton = screen.getByRole('button', { name: /Iniciar Sesión/i }); // Ajusta el texto si es diferente

  // Simula credenciales incorrectas
  fireEvent.change(emailInput, { target: { value: 'usuario@incorrecto.com' } });
  fireEvent.change(passwordInput, { target: { value: 'contraseñaIncorrecta' } });
  fireEvent.click(loginButton);

const toast = document.querySelector('ion-toast[message="Datos incorrectos"]');
expect(toast).toBeInTheDocument();

});
