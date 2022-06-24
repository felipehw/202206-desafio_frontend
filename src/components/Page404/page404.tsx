import React from "react";
import { Link } from "react-router-dom";

import { TbError404 } from 'react-icons/tb';

import './page404.scss';

const Page404 = () => {
    return (
        <div data-testid='Page404' className='Page404 text-center'>
            <h1>Invalid URL</h1>
            <div className="Page404__IconContainer">
                <TbError404 className="Page404__Icon"/>
            </div>
            <p className="lead">Return to the <Link data-testid="LinkToRoot" to='/'>living room</Link>.</p>
        </div>
    );
};

export default Page404;