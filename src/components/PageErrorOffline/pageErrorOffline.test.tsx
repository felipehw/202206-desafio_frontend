import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import PageErrorOffline from './pageErrorOffline';

test('Renders (with correct Link href to previous route)', async () => {
    const previousEntry = '/users';
    const actualEntry = {
        pathname: '/offline',
        state: { prevPathname: previousEntry }
    };
    const entries = [previousEntry, actualEntry];
    render(
        <MemoryRouter initialEntries={entries}>
            <PageErrorOffline />
        </MemoryRouter>
    );
    const link = screen.getByTestId('linkToReturn');
    expect(link.getAttribute('href')).toBe(previousEntry);
});
