import React from 'react'
import { Button, Form } from 'semantic-ui-react'

const Login = (props) => {
    return (
        <div className="divFormLogin">
            <Form>
                <Form.Field>
                    <label>E-mail</label>
                    <input autoFocus placeholder='E-mail' />
                </Form.Field>
                <Form.Field>
                    <label>Senha</label>
                    <input placeholder='Senha' />
                </Form.Field>
                <div className='divBtnLogin'>
                    <Button inverted color='blue' type='button'>Logar</Button>
                </div>
        </Form>
      </div>
    )
}

export default Login