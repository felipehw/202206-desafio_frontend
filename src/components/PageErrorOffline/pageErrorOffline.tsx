import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from '@emotion/styled';

import { RiWifiOffFill } from 'react-icons/ri';

const StyledDiv = styled.div`
    display: flex;
    flex-flow: column;
    height: 100vh;
`;
const StyledDivIconContainer = styled.div`
    flex-grow: 1;
`;
const StyledRiWifiOffFill = styled(RiWifiOffFill)`
    height: 100%;
    max-height: 80vh;
    width: 100%;
`;

type locationState = { prevPathname: string };
const PageErrorOffline = () => {
    const location = useLocation();
    const locationState = location.state as locationState;
    return (
        <StyledDiv data-testid="PageErrorOffline" className="text-center">
            <h1>Check your internet connection.</h1>
            <StyledDivIconContainer>
                <StyledRiWifiOffFill />
            </StyledDivIconContainer>
            <p className="lead">
                {locationState.prevPathname ? 
                    <Link data-testid="linkToReturn" to={locationState.prevPathname}>Try again</Link> : ''
                }
            </p>
        </StyledDiv>
    );
};

export default PageErrorOffline;