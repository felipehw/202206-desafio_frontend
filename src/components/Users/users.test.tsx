import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Users from './users';
import User from "../../interfaces/user";
import usersData from '../../mock/data/users';
import { fetchUsers } from "../../api";

jest.mock("../../api");

test('renders Users', async () => {
    (fetchUsers as jest.MockedFunction<() => Promise<User[]>>).mockResolvedValue(usersData);
    render(<Users />);
    const UsersEl = await screen.findByTestId('Users');
    expect(UsersEl).toBeInTheDocument();
});

test('renders the correct number of lines for the mocked Users', async () => {
    (fetchUsers as jest.MockedFunction<() => Promise<User[]>>).mockResolvedValue(usersData);
    render(<Users />);
    const UserEl = await screen.findAllByTestId('User');
    expect(UserEl).toHaveLength(usersData.length);
});

test.each([
    {colName: 'Usuário', colTestId: 'UserCol', dropDownTestId: 'Dropdown.Item.UserCol'},
    {colName: 'Email', colTestId: 'EmailCol', dropDownTestId: 'Dropdown.Item.EmailCol'},
    {colName: 'Cliente', colTestId: 'ClientCol', dropDownTestId: 'Dropdown.Item.ClientCol'},
    {colName: 'Perfil de acesso', colTestId: 'ProfileCol', dropDownTestId: 'Dropdown.Item.ProfileCol'},
])('hides/show "$colName" column', async ({colName, colTestId, dropDownTestId}) => {
    (fetchUsers as jest.MockedFunction<() => Promise<User[]>>).mockResolvedValue(usersData);
    render(<Users />);
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