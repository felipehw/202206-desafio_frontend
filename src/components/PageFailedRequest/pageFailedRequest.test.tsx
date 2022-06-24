import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import PageFailedRequest from './pageFailedRequest';

test('Renders (with correct Link href to previous route)', async () => {
    const previousEntry = '/users';
    const actualEntry = {
        pathname: '/failed-request',
        state: {
            status: 404,
            statusText: 'Not Found',
            prevPathname: previousEntry
        }
    };
    const entries = [previousEntry, actualEntry];
    render(
        <MemoryRouter initialEntries={entries}>
            <PageFailedRequest />
        </MemoryRouter>
    );
    const renderedStatus = screen.getByTestId('status');
    expect(renderedStatus).toHaveTextContent(String(actualEntry.state.status));
    const renderedStatusText = screen.getByTestId('statusText');
    expect(renderedStatusText).toHaveTextContent(actualEntry.state.statusText);
    const link = screen.getByTestId('linkToReturn');
    expect(link.getAttribute('href')).toBe(previousEntry);
});
