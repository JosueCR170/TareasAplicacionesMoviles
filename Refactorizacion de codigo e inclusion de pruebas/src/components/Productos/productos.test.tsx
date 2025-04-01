import { render, screen, waitFor } from '@testing-library/react';
import { Productos } from './productosComponent';
import '@testing-library/jest-dom/extend-expect';
import { vi } from 'vitest';

//SIMULACION DE LA PETICION A GET PRODUCTOS
vi.mock('../../services/productosService', () => ({
    getProductos: vi.fn().mockResolvedValue([
      { id: 1, title: 'Producto 1' },
      { id: 2, title: 'Producto 2' },
    ]),
  }));

describe('Productos Component', () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    test('Renderizado inicial con productos en el documento', async () => {
        render(<Productos/>);
        
        await waitFor(() => {
            expect(screen.getByText('Lista de Productos')).toBeInTheDocument();
            expect(screen.getByText('Producto 1')).toBeInTheDocument();
            expect(screen.getByText('Producto 2')).toBeInTheDocument();
        });
    });

    test('Cargar más elementos en el scroll infinito', async () => {
        const { container } = render(<Productos />);
        
        await waitFor(() => {
            expect(screen.getByText('Producto 1')).toBeInTheDocument();
            expect(screen.getByText('Producto 2')).toBeInTheDocument();
        });

        const infiniteScroll = container.querySelector('ion-infinite-scroll');
        if (infiniteScroll) {
            infiniteScroll.dispatchEvent(new Event('ionInfinite'));
        }

        await waitFor(() => {
            expect(screen.getAllByText('Producto 1').length).toBeGreaterThan(1);
            expect(screen.getAllByText('Producto 2').length).toBeGreaterThan(1);
        });
    });

    test('Aparece el texto del spinner de carga (cargando...)', async () => {
        const { container } = render(<Productos />);
        
        const infiniteScroll = container.querySelector('ion-infinite-scroll');
        if (infiniteScroll) {
            infiniteScroll.dispatchEvent(new Event('ionInfinite'));
        }

        await waitFor(() => {
            expect(screen.getByText('Cargando...')).toBeInTheDocument();
        });
    });

});