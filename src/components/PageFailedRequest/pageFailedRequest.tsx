import React from "react";
import { Link, useLocation } from "react-router-dom";

import { GiBrokenWall } from 'react-icons/gi';

import './pageFailedRequest.scss';

type locationState = {
    prevPathname: string
    status: number,
    statusText: string,
};
const PageFailedRequest = () => {
    const location = useLocation();
    const locationState = location.state as locationState;
    return (
        <div data-testid="PageFailedRequest" className="PageFailedRequest text-center">
            <h1>Server isn't in a good mood</h1>
            <div>
                <h2>Code: <span data-testid="status">{locationState.status}</span></h2>
                <h3>Description: <span data-testid="statusText">{locationState.statusText}</span></h3>
            </div>
            <div className="PageFailedRequest__IconContainer">
                <GiBrokenWall className="PageFailedRequest__Icon" size="6rem" />
            </div>
            <p className="lead">
                <Link data-testid="linkToReturn" to={locationState.prevPathname}>Try again</Link>
            </p>
        </div>
    );
};

export default PageFailedRequest;
