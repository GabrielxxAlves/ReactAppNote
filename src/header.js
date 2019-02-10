import React from 'react'
import Modal from './modal'

const HeaderHome = (props) => {
    return (
        <div className='container'>
            <div className='header'>
                <h2 className="ui header">
                        <i className="handshake outline icon"></i>
                        <div className="content">Mark Appointment</div>  
                </h2>
            </div>
            <div className='menu'>
                <button className="ui button" id='btn_sign'>Sign up</button>
                <button className="ui button">Login</button>
            </div>
            <Modal/>
        </div>
    )
}

export default HeaderHome