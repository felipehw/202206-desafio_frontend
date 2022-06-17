import React from "react";

import Dropdown from "react-bootstrap/Dropdown";

import { BsThreeDotsVertical } from 'react-icons/bs';

import './menu.scss';

import { ActiveColumns, LinesPerPage } from '../users';

type MenuProps = {
  linesPerPage: LinesPerPage,
  setLinesPerPage: (linesPerPage: LinesPerPage) => void;
  activeColumns: ActiveColumns,
  setActiveColumns: (activeColumns: ActiveColumns) => void;
}
const Menu = ({ linesPerPage, setLinesPerPage, activeColumns, setActiveColumns }: MenuProps) => {
  const EventKey = {
      LinesStandard: 'LinesStandard',
      Lines50: 'Lines50',
      UserCol: 'UserCol',
      EmailCol: 'EmailCol',
      ClientCol: 'ClientCol',
      ProfileCol: 'ProfileCol'
  };
  const onDropDownSelect = (eventKey: string | any) => {
      switch (eventKey) {
          case EventKey.LinesStandard:
              setLinesPerPage('default');
              break;
          case EventKey.Lines50:
              setLinesPerPage('50');
              break;
          case EventKey.UserCol:
              setActiveColumns({ ...activeColumns, name: !activeColumns.name});
              break;
          case EventKey.EmailCol:
              setActiveColumns({ ...activeColumns, email: !activeColumns.email});
              break;
          case EventKey.ClientCol:
              setActiveColumns({ ...activeColumns, companyName: !activeColumns.companyName});
              break;
          case EventKey.ProfileCol:
              setActiveColumns({ ...activeColumns, profile: !activeColumns.profile});
              break;
          default:
              throw new Error('onDropDownSelect received invalid eventKey');
      }
  };
  return (
      <Dropdown className="UsersMenu" onSelect={onDropDownSelect} autoClose='outside' >
          <Dropdown.Toggle data-testid="Dropdown.Toggle" className="FlatIconButton" as='div'>
              <BsThreeDotsVertical />
          </Dropdown.Toggle>
          <Dropdown.Menu data-testid="Dropdown.Menu">
              <Dropdown.Header>Linhas por página</Dropdown.Header>
              <Dropdown.Item data-testid="Dropdown.Item.LinesStandard" eventKey={EventKey.LinesStandard}>
                  <input type='checkbox' className='form-check-input' checked={linesPerPage === 'default'} readOnly /> Padrão
              </Dropdown.Item>
              <Dropdown.Item data-testid="Dropdown.Item.Lines50" eventKey={EventKey.Lines50}>
                  <input type='checkbox' className='form-check-input' checked={linesPerPage === '50'} readOnly /> 50 linhas
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Header>Colunas</Dropdown.Header>
              <Dropdown.Item data-testid="Dropdown.Item.UserCol" eventKey={EventKey.UserCol}>
                  <input type='checkbox' className='form-check-input' checked={activeColumns.name} readOnly /> Usuário
              </Dropdown.Item>
              <Dropdown.Item data-testid="Dropdown.Item.EmailCol" eventKey={EventKey.EmailCol}>
                  <input type='checkbox' className='form-check-input' checked={activeColumns.email} readOnly /> E-mail
              </Dropdown.Item>
              <Dropdown.Item data-testid="Dropdown.Item.ClientCol" eventKey={EventKey.ClientCol}>
                  <input type='checkbox' className='form-check-input' checked={activeColumns.companyName} readOnly /> Cliente
              </Dropdown.Item>
              <Dropdown.Item data-testid="Dropdown.Item.ProfileCol" eventKey={EventKey.ProfileCol}>
                  <input type='checkbox' className='form-check-input' checked={activeColumns.profile} readOnly /> Perfil de acesso
              </Dropdown.Item>
          </Dropdown.Menu>
      </Dropdown>
  );
};

export default Menu;