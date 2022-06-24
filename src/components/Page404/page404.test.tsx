import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Page404 from './page404';

test('Renders (with correct Link href)', async () => {
    render(<Page404 />, { wrapper: MemoryRouter});
    const link = screen.getByTestId('LinkToRoot');
    expect(link.getAttribute('href')).toBe('/');
});
