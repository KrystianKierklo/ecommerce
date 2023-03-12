import React, {useState, useEffect, useProps} from 'react'
import {Link, useNavigate, useLocation} from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import Loader from '../components/Loader';
import Message from '../components/Message';
import {useDispatch, useSelector} from 'react-redux'
import {login} from '../actions/userActions'
import FormContainer from '../components/FormContainer';

function LoginScreen() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const location = useLocation()
    const navigate = useNavigate()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userLogin = useSelector(state => state.userLogin)
    const {error, loading, userInfo} = userLogin

    
    useEffect(() => {
        if(userInfo){
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }


  return (
    <FormContainer >
        <h1 className="text-5xl text-center mb-5">Logowanie</h1>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='email'>
                <Form.Label>Adres email</Form.Label>
                    <Form.Control type='email' placeholder='Wprowadź adres email' value={email} onChange={(e)=>setEmail(e.target.value)}>
                        
                    </Form.Control>
            </Form.Group>

            <Form.Group controlId='password' className="mt-3">
                <Form.Label>Hasło</Form.Label>
                    <Form.Control type='password' placeholder='Wprowadź hasło' value={password} onChange={(e)=>setPassword(e.target.value)}>
                        
                    </Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary' className="mt-4 login-btn">Zaloguj się</Button>
        </Form>

        <Row className="py-3">
            <Col className="text-center">
                Nie masz konta? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}> Zarejestruj się</Link>
            </Col>
        </Row>
    </FormContainer>
  )
}

export default LoginScreen
