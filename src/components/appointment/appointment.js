import React from 'react'
import { Link } from 'react-router-dom'

const Appointment = (props) => {
    return (
        <div className='conteudo'>
            <div class="ui placeholder segment">
                <div class="ui icon header">
                <i class="handshake outline icon"></i>
                    Vamos marcar aquele compromisso?
                </div>
                <Link to='/login'>
                    <div class="ui primary button">Add Compromisso</div>
                </Link>
            </div>
        </div>
    )
}

export default Appointment