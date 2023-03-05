import React, {useState, useEffect, useProps} from 'react'
import {Link, useNavigate, useLocation} from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import Loader from '../components/Loader';
import Message from '../components/Message';
import {useDispatch, useSelector} from 'react-redux'
import {register} from '../actions/userActions'
import FormContainer from '../components/FormContainer';


function RegisterScreen() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const location = useLocation()
    const navigate = useNavigate()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userRegister = useSelector(state => state.userRegister)
    const {error, loading, userInfo} = userRegister

    useEffect(() => {
        if(userInfo){
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])


    const submitHandler = (e) => {
        e.preventDefault()

        if(password != confirmPassword){
            setMessage('Podane hasła muszą być identyczne!')
        }else{
            dispatch(register(name, email, password))
        }
    }


  return (
    <FormContainer>
        <h1 className="text-5xl text-center mb-5">Rejestracja</h1>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>

            <Form.Group controlId='name'>
                <Form.Label>Imię</Form.Label>
                    <Form.Control required type='name' placeholder='Wprowadź swoje imię' value={name} onChange={(e)=>setName(e.target.value)}>
        
                    </Form.Control>
            </Form.Group>

            <Form.Group controlId='email' className="mt-3">
                <Form.Label>Adres email</Form.Label>
                    <Form.Control required type='email' placeholder='Wprowadź adres email' value={email} onChange={(e)=>setEmail(e.target.value)}>
                            
                    </Form.Control>
            </Form.Group>

            <Form.Group controlId='password' className="mt-3">
                <Form.Label>Hasło</Form.Label>
                    <Form.Control required type='password' placeholder='Wprowadź hasło' value={password} onChange={(e)=>setPassword(e.target.value)}>
                        
                    </Form.Control>
            </Form.Group>

            <Form.Group controlId='PasswordConfirm' className="mt-3">
                <Form.Label>Powtórz hasło</Form.Label>
                    <Form.Control required type='Password' placeholder='Powtórz hasło' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}>
                        
                    </Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary' className="mt-4 login-btn">Zarejestruj się</Button>
        </Form>

        <Row className="py-3">
            <Col className="text-center">
                Posiadasz już konto? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}> Zaloguj się</Link>
            </Col>
        </Row>
    </FormContainer>
  )
}

export default RegisterScreen
