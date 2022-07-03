import styled from '@emotion/styled';
import { CUSTOM_BRIGHTGRAY } from '../../theme/variables';

const FlatIconButton = styled.div`
    cursor: pointer;
    width: fit-content;
    padding-right: 0.3rem;
    padding-left: 0.3rem;
    border-radius: 10px;
    &:hover {
        background-color: ${CUSTOM_BRIGHTGRAY};
    }
    &:active {
        background-color: ${CUSTOM_BRIGHTGRAY};
    }
`;

export default FlatIconButton;