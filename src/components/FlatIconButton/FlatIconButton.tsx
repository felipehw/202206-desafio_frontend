import styled from '@emotion/styled';
import sassVars from '../../scss/variables.module.scss';

const FlatIconButton = styled.div`
    cursor: pointer;
    width: fit-content;
    padding-right: 0.3rem;
    padding-left: 0.3rem;
    border-radius: 10px;
    &:hover {
        background-color: ${sassVars.customBrightGray};
    }
    &:active {
        background-color: ${sassVars.customBrightGray};
    }
`;

export default FlatIconButton;