import React from 'react'
import { Link } from 'react-router-dom'

import ModalSignUp from './modalSignUp'
import './funcHeader'

const HeaderHome = (props) => {
    return (
        <div className='container'>
            <div className='header'>
                <h2 className="ui header">
                    <Link to='/'>
                        <i className="handshake outline icon" id="iconHand"></i>
                        <div className="content">Mark Appointment</div>
                    </Link>
                </h2>
            </div>
            <div className='menu'>
                <ModalSignUp/>
                <Link to='/login'>
                    <button  className="ui button">Login</button>
                </Link>
            </div>
        </div>
    )
}

export default HeaderHome