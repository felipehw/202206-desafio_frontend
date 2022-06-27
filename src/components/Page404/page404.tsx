import React from "react";
import { Link } from "react-router-dom";
import styled from '@emotion/styled';

import { TbError404 } from 'react-icons/tb';

const StyledDiv = styled.div`
    display: flex;
    flex-flow: column;
    height: 100vh;
`;
const StyledDivIconContainer = styled.div`
    flex-grow: 1;
`;
const StyledTbError404 = styled(TbError404)`
    height: 100%;
    width: 100%;
    max-height: 80vh;
`;

const Page404 = () => {
    return (
        <StyledDiv data-testid='Page404' className='text-center'>
            <h1>Invalid URL</h1>
            <StyledDivIconContainer>
                <StyledTbError404/>
            </StyledDivIconContainer>
            <p className="lead">Return to the <Link data-testid="LinkToRoot" to='/'>living room</Link>.</p>
        </StyledDiv>
    );
};

export default Page404;