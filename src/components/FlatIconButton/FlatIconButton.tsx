import styled from '@emotion/styled';

const FlatIconButton = styled.div`
    cursor: pointer;
    width: fit-content;
    padding-right: 0.3rem;
    padding-left: 0.3rem;
    border-radius: 10px;
    &:hover {
        background-color: var(--custom-brightgray);
    }
    &:active {
        background-color: var(--custom-brightgray);
    }
`;

export default FlatIconButton;