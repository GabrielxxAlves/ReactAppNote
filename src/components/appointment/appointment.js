import React from 'react'
import { Link } from 'react-router-dom'

const Appointment = (props) => {
    return (
        <div className='conteudo'>
            <div className="ui placeholder segment">
                <div className="ui icon header">
                <i className="handshake outline icon"></i>
                    Vamos marcar aquele compromisso?
                </div>
                <Link to='/login'>
                    <div className="ui primary button">Add Compromisso</div>
                </Link>
            </div>
        </div>
    )
}

export default Appointment