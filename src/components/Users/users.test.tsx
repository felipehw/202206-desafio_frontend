import React from 'react';
import { Router } from 'react-router-dom';
import {createMemoryHistory} from 'history';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Users from './users';
import { fetchUsers } from "../../api";

jest.mock("../../api");

beforeEach(() => {
    (fetchUsers as any).__setUsers();
});

test('renders Users', async () => {
    const history = createMemoryHistory();
    render(
        <Router location={history.location} navigator={history}>
            <Users />
        </Router>
    );
    const UsersEl = await screen.findByTestId('Users');
    expect(UsersEl).toBeInTheDocument();
});

test('renders the correct number of lines for the mocked Users', async () => {
    const history = createMemoryHistory();
    render(
        <Router location={history.location} navigator={history}>
            <Users />
        </Router>
    );
    const UserEl = await screen.findAllByTestId('User');
    expect(UserEl).toHaveLength((await fetchUsers()).length);
});

test('navigate to /failed-request when server returns other value than users.', async () => {
    const history = createMemoryHistory();
    history.push('/users');
    (fetchUsers as any).__set404();
    render(
        <Router location={history.location} navigator={history}>
            <Users />
        </Router>
    );
    await waitFor(() => expect(history.location.pathname).toBe('/failed-request'));
});

test('navigate to /offline when fetch fails due "NetworkError".', async () => {
    const history = createMemoryHistory();
    history.push('/users');
    (fetchUsers as any).__setNetworkError();
    render(
        <Router location={history.location} navigator={history}>
            <Users />
        </Router>
    );
    await waitFor(() => expect(history.location.pathname).toBe('/offline'));
});

test.each([
    {colName: 'Usuário', colTestId: 'UserCol', dropDownTestId: 'Dropdown.Item.UserCol'},
    {colName: 'Email', colTestId: 'EmailCol', dropDownTestId: 'Dropdown.Item.EmailCol'},
    {colName: 'Cliente', colTestId: 'ClientCol', dropDownTestId: 'Dropdown.Item.ClientCol'},
    {colName: 'Perfil de acesso', colTestId: 'ProfileCol', dropDownTestId: 'Dropdown.Item.ProfileCol'},
])('hides/show "$colName" column', async ({colName, colTestId, dropDownTestId}) => {
    const history = createMemoryHistory();
    render(
        <Router location={history.location} navigator={history}>
            <Users />
        </Router>
    );
    const dropdownToggle = await screen.findByTestId('Dropdown.Toggle');
    await userEvent.click(dropdownToggle);
    const dropdownItem = await screen.findByTestId(dropDownTestId);
    expect(await screen.findByTestId(colTestId)).toBeInTheDocument();
    await userEvent.click(dropdownItem);
    //await expect(screen.findAllByTestId(colTestId)).rejects.toThrow();
    expect(screen.queryByTestId(colTestId)).not.toBeInTheDocument();
    await userEvent.click(dropdownItem);
    expect(await screen.findByTestId(colTestId)).toBeInTheDocument();
});