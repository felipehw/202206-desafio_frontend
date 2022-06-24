import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { fetchUsers } from "./api";

jest.mock("./api");

beforeEach(() => {
    (fetchUsers as any).__setUsers();
});

test('Renders', async () => {
    render(
        <MemoryRouter>
            <App />
        </MemoryRouter>
    );
    const UsersEl = await screen.findByTestId('App');
    expect(UsersEl).toBeInTheDocument();
});

test('Renders Users by default', async () => {;
    render(
        <MemoryRouter initialEntries={[
                '/',
                '/users',
                { pathname: '/offline', state: {prevPathname: 'users'}
                },
                '/',
            ]}>
            <App />
        </MemoryRouter>
    );
    const UsersEl = await screen.findByTestId('Users');
    expect(UsersEl).toBeInTheDocument();
    const UserEl = await screen.findAllByTestId('User');
    expect(UserEl).toHaveLength(10);
});

/*
test('Renders Users by default - old', async () => {;
    const history = createMemoryHistory();
    history.push('/'); // TODO não tá indo por padrão. É como se o router fosse bobão, não faz nada por si.
    render(
        <Router location={history.location} navigator={history}>
            <App />
        </Router>
    );
    await waitFor(() => expect(history.location.pathname).toBe('/'));
    const UsersEl = await screen.findByTestId('Users');
    expect(UsersEl).toBeInTheDocument();
    const UserEl = await screen.findAllByTestId('User');
    expect(UserEl).toHaveLength(10);
});
*/

test('Navigate to /failed-request when server returns invalid value, user try again, server returns valid value, load users.', async () => {
    (fetchUsers as any).__set404();
    render(<App />, { wrapper: MemoryRouter });
    expect(await screen.findByTestId('PageFailedRequest')).toBeInTheDocument();
    (fetchUsers as any).__setUsers();
    const link = screen.getByTestId('linkToReturn');
    await userEvent.click(link);
    expect(await screen.findByTestId('Users')).toBeInTheDocument();
});

test('Navigate to /offline when occurs NetworkError, user try again, server answer, load users.', async () => {
    (fetchUsers as any).__setNetworkError();
    render(<App />, { wrapper: MemoryRouter });
    expect(await screen.findByTestId('PageErrorOffline')).toBeInTheDocument();
    (fetchUsers as any).__setUsers();
    const link = screen.getByTestId('linkToReturn');
    await userEvent.click(link);
    expect(await screen.findByTestId('Users')).toBeInTheDocument();
});

test('Navigate to a non-existent route, click on link in Page404, return to index root route', async () => {;
    //render(<App />, { wrapper: MemoryRouter });
    render(
        <MemoryRouter initialEntries={[
                '/',
                '/users',
                { pathname: '/offline', state: {prevPathname: 'users'}
                },
                '/non_existent',
            ]}>
            <App />
        </MemoryRouter>
    );
    const Page404El = await screen.findByTestId('Page404');
    expect(Page404El).toBeInTheDocument();
    const link = screen.getByTestId('LinkToRoot');
    await userEvent.click(link);
    const UsersEl = await screen.findByTestId('Users');
    expect(UsersEl).toBeInTheDocument();
});