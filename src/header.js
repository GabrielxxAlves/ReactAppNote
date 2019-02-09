import React from 'react'

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
                <button className="ui button">Sign up</button>
                <button className="ui button">Login</button>
            </div>
        </div>
    )
}

export default HeaderHome