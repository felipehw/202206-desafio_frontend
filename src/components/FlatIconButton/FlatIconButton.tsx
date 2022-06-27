import styled from '@emotion/styled';

const FlatIconButton = styled.div`
    cursor: pointer;
    width: fit-content;
    padding-right: 0.3rem;
    padding-left: 0.3rem;
    border-radius: 10px;
    &:hover {
        background-color: rgba(233, 236, 239, 1);
    }
    &:active {
        background-color: rgb(217, 217, 217, 1);
    }
`;

export default FlatIconButton;