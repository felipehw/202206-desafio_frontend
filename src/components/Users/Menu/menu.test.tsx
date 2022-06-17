import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Menu from './menu';
import { ActiveColumns, LinesPerPage } from '../users';

let linesPerPage: LinesPerPage;
let activeColumns: ActiveColumns;
const setLinesPerPage = (lines: LinesPerPage) => { linesPerPage = lines };
const setActiveColumns = (acols: ActiveColumns) => { activeColumns = acols };

beforeEach(() => {
    linesPerPage = 'default';
    activeColumns = {
        name: true,
        email: true,
        companyName: true,
        profile: true,
    };
});

test('renders Dropdown.Toggle', () => {
    render(<Menu
        linesPerPage={linesPerPage} setLinesPerPage={setLinesPerPage}
        activeColumns={activeColumns} setActiveColumns={setActiveColumns}
    />);
    const dropdownToggle = screen.getByTestId('Dropdown.Toggle');
    expect(dropdownToggle).toBeInTheDocument();
});

test('click Dropdown.Toggle shows the menu', async () => {
    render(<Menu
        linesPerPage={linesPerPage} setLinesPerPage={setLinesPerPage}
        activeColumns={activeColumns} setActiveColumns={setActiveColumns}
    />);
    const dropdownToggle = screen.getByTestId('Dropdown.Toggle');
    expect(screen.queryByTestId('Dropdown.Menu')).not.toBeInTheDocument();
    await userEvent.click(dropdownToggle);
    expect(screen.getByTestId('Dropdown.Menu')).toBeInTheDocument();
});

test("menu doesn't vanish with multiple clicks inside", async () => {
    const setLinesPerPage = jest.fn((lines: LinesPerPage) => { linesPerPage = lines });
    render(<Menu
        linesPerPage={linesPerPage} setLinesPerPage={setLinesPerPage}
        activeColumns={activeColumns} setActiveColumns={setActiveColumns}
    />);
    const dropdownToggle = screen.getByTestId('Dropdown.Toggle');
    await userEvent.click(dropdownToggle);
    const dropdownItemLinesStandard = screen.getByTestId('Dropdown.Item.LinesStandard');
    const dropdownItemLines50 = screen.getByTestId('Dropdown.Item.Lines50');
    await userEvent.click(dropdownItemLinesStandard);
    await userEvent.click(dropdownItemLines50);
    expect(screen.getByTestId('Dropdown.Menu')).toBeInTheDocument();
});

test.each([
    { testId: 'Dropdown.Item.LinesStandard', linesPerPageValue: 'default' },
    { testId: 'Dropdown.Item.Lines50', linesPerPageValue: '50' }
])('click "$testId" fires setLinesPerPage("$linesPerPageValue")', async ({ testId, linesPerPageValue }) => {
    const setLinesPerPage = jest.fn((lines: LinesPerPage) => { linesPerPage = lines });
    render(<Menu
        linesPerPage={linesPerPage} setLinesPerPage={setLinesPerPage}
        activeColumns={activeColumns} setActiveColumns={setActiveColumns}
    />);
    const dropdownToggle = screen.getByTestId('Dropdown.Toggle');
    await userEvent.click(dropdownToggle);
    const dropdownItem = screen.getByTestId(testId);
    await userEvent.click(dropdownItem);
    expect(setLinesPerPage).lastCalledWith(linesPerPageValue);
});

test.each([
    { testId: 'Dropdown.Item.UserCol', activeCol: 'name' },
    { testId: 'Dropdown.Item.EmailCol', activeCol: 'email' },
    { testId: 'Dropdown.Item.ClientCol', activeCol: 'companyName' },
    { testId: 'Dropdown.Item.ProfileCol', activeCol: 'profile' },
] as { testId: string, activeCol: keyof ActiveColumns }[])
('click "$testId", fire setActiveColumns(), flipping boolean', async ({ testId, activeCol }) => {
    const setActiveColumns = jest.fn((acols: ActiveColumns) => { activeColumns = acols });
    render(<Menu
        linesPerPage={linesPerPage} setLinesPerPage={setLinesPerPage}
        activeColumns={activeColumns} setActiveColumns={setActiveColumns}
    />);
    const dropdownToggle = screen.getByTestId('Dropdown.Toggle');
    await userEvent.click(dropdownToggle);
    const dropdownItem = screen.getByTestId(testId);
    expect(activeColumns[activeCol]).toBeTruthy();
    await userEvent.click(dropdownItem);
    expect(activeColumns[activeCol]).toBeFalsy();
});
