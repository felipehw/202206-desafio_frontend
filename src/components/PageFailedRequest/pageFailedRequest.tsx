import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from '@emotion/styled';

import { GiBrokenWall } from 'react-icons/gi';

const StyledDiv = styled.div`
    display: flex;
    flex-flow: column;
    height: 100vh;
    justify-content: space-between;
`;
const StyledDivIconContainer = styled.div`
    flex-grow: 0;
`;

type locationState = {
    prevPathname: string
    status: number,
    statusText: string,
};
const PageFailedRequest = () => {
    const location = useLocation();
    const locationState = location.state as locationState;
    return (
        <StyledDiv data-testid="PageFailedRequest" className="text-center">
            <h1>Server isn't in a good mood</h1>
            <div>
                <h2>Code: <span data-testid="status">{locationState.status}</span></h2>
                <h3>Description: <span data-testid="statusText">{locationState.statusText}</span></h3>
            </div>
            <StyledDivIconContainer>
                <GiBrokenWall size="6rem" />
            </StyledDivIconContainer>
            <p className="lead">
                <Link data-testid="linkToReturn" to={locationState.prevPathname}>Try again</Link>
            </p>
        </StyledDiv>
    );
};

export default PageFailedRequest;
