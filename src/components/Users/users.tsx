import React from "react";
import styled from '@emotion/styled';
import { useLocation, useNavigate } from "react-router-dom";

import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";

import { HiOutlinePencil } from 'react-icons/hi';
import { IoMdClose } from 'react-icons/io';

import { fetchUsers } from "../../api";
import User from "../../interfaces/user";
import Menu from "./Menu/menu";
import FlatIconButton from "../FlatIconButton/FlatIconButton";

const StyledDiv = styled.div`
    margin-top: 1rem;
`;
const StyledTable = styled(Table)`
    background-color: white;
    th:last-child, td:last-child {
        text-align: end;
    }
`;
const StyledDivUserEditControls = styled.div`
    display: inline-flex;
    justify-content: space-around;
    width: 74px;
`;
const StyledHiOutlinePencil = styled(HiOutlinePencil)`
    color: blue;
`;
const StyledIoMdClose = styled(IoMdClose)`
    color: red;
`;

type LinesPerPage = 'default'| '50';
type ActiveColumns = {
    name: boolean,
    email: boolean,
    companyName: boolean,
    profile: boolean,
};

const Users = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [users, setUsers] = React.useState<User[]>([]);
    const [linesPerPage, setLinesPerPage] = React.useState<LinesPerPage>('default');
    const [activeColumns, setActiveColumns] = React.useState<ActiveColumns>({
        name: true,
        email: true,
        companyName: true,
        profile: true,
    });
    React.useEffect(() => {
        const onRejected = (reason: any) => {
            if (reason instanceof Response) {
                navigate('/failed-request', {state: {prevPathname: location.pathname, status: reason.status, statusText: reason.statusText}});
            } else if (typeof reason.message === 'string' && (reason.message as string).includes('NetworkError')) {
                navigate('/offline', {state: {prevPathname: location.pathname}});
            } else {
                console.error(reason);
            }
        };
        fetchUsers().then(users => setUsers(users), onRejected);
    }, [location.pathname, navigate]);
    return (
        <StyledDiv data-testid="Users">
            <StyledTable striped hover>
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
                                <StyledDivUserEditControls>
                                    <FlatIconButton>
                                        <StyledHiOutlinePencil />
                                    </FlatIconButton>
                                    <FlatIconButton>
                                        <StyledIoMdClose />
                                    </FlatIconButton>
                                </StyledDivUserEditControls>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </StyledTable>
        </StyledDiv>
    );
};

export { Users as default, type LinesPerPage, type ActiveColumns} ;