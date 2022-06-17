import React from "react";

import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";

import { IconContext } from "react-icons";
import { HiOutlinePencil } from 'react-icons/hi';
import { IoMdClose } from 'react-icons/io';

import './users.scss';

import { fetchUsers } from "../../api";
import User from "../../interfaces/user";
import Menu from "./Menu/menu";

type LinesPerPage = 'default'| '50';
type ActiveColumns = {
    name: boolean,
    email: boolean,
    companyName: boolean,
    profile: boolean,
};

const Users = () => {
    const [users, setUsers] = React.useState<User[]>([]);
    const [linesPerPage, setLinesPerPage] = React.useState<LinesPerPage>('default');
    const [activeColumns, setActiveColumns] = React.useState<ActiveColumns>({
        name: true,
        email: true,
        companyName: true,
        profile: true,
    });
    React.useEffect(() => {fetchUsers().then(users => setUsers(users))}, []);
    return (
        <div data-testid="Users" className="Users">
            <Table striped hover>
                <thead>
                    <tr>
                        {activeColumns.name ? <th data-testid="UserCol">Usuário</th> : null}
                        {activeColumns.email ? <th data-testid="EmailCol">Email</th> : null}
                        {activeColumns.companyName ? <th data-testid="ClientCol">Cliente</th> : null}
                        {activeColumns.profile ? <th data-testid="ProfileCol">Perfil de acesso</th> : null}
                        <th>
                            <Menu
                                linesPerPage={linesPerPage} setLinesPerPage={setLinesPerPage}
                                activeColumns={activeColumns} setActiveColumns={setActiveColumns}
                            />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr data-testid="User" key={user.id}>
                            {activeColumns.name ? <td>{user.name}</td> : null}
                            {activeColumns.email ? <td>{user.email}</td> : null}
                            {activeColumns.companyName ? <td>{user.company.name}</td> : null}
                            {activeColumns.profile ? <td><Badge pill bg='info' text='primary'>NOME DO PERFIL</Badge></td> : null}
                            <td>
                                <div className='UserEditControls'>
                                    <div className='FlatIconButton UserEditControls__Edit'>
                                        <IconContext.Provider value={{ className: "UserEditControls__EditIcon" }}>
                                            <HiOutlinePencil />
                                        </IconContext.Provider>
                                    </div>
                                    <div className='FlatIconButton UserEditControls__Delete'>
                                        <IconContext.Provider value={{ className: "UserEditControls__DeleteIcon" }}>
                                            <IoMdClose />
                                        </IconContext.Provider>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export { Users as default, type LinesPerPage, type ActiveColumns} ;