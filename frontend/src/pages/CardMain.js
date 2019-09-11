import React from 'react';
import { Link } from 'react-router-dom';

import '../pages/CardMain.css';

export default function CardMain(){
    return(
        <div className="main-container">

            <Link>
            </Link>

            <ul>

                <li key={1}>

                    <img src={"user.avatar"} alt=""/>

                    <footer>
                        <strong>{"user.name"}</strong>
                        <p>{"user.bio"}</p>
                    </footer>


                </li>

            </ul>

        </div>
    )
}