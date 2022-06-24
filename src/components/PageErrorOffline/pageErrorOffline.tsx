import React from "react";
import { Link, useLocation } from "react-router-dom";

import { RiWifiOffFill } from 'react-icons/ri';

import './pageErrorOffline.scss';

type locationState = { prevPathname: string };

const PageErrorOffline = () => {
    const location = useLocation();
    const locationState = location.state as locationState;
    return (
        <div data-testid="PageErrorOffline" className="PageErrorOffline text-center">
            <h1>Check your internet connection.</h1>
            <div className="PageErrorOffline__IconContainer">
                <RiWifiOffFill className="PageErrorOffline__Icon"/>
            </div>
            <p className="lead">
                {locationState.prevPathname ? 
                    <Link data-testid="linkToReturn" to={locationState.prevPathname}>Try again</Link> : ''
                }
            </p>
        </div>
    );
};

export default PageErrorOffline;