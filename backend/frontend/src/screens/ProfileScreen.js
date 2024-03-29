import React, {useState, useEffect, useProps} from 'react'
import {Link, useNavigate, useLocation} from 'react-router-dom'
import {Form, Button, Row, Col,Table} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import Loader from '../components/Loader';
import Message from '../components/Message';
import {useDispatch, useSelector} from 'react-redux'
import {getUserDetails, register, updateUserProfile} from '../actions/userActions'
import {USER_UPDATE_PROFILE_RESET} from '../constants/userConstants'
import {listMyOrders} from '../actions/orderActions'


function ProfileScreen() {

    const location = useLocation()
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const {error, loading, user} = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const {success} = userUpdateProfile

    const orderListMy = useSelector(state => state.orderListMy)
    const {loading: loadingOrders, error:errorOrders, orders} = orderListMy

    useEffect(() => {
        if(!userInfo){
            navigate('/login')
        }else{
            if(!user || !user.name || success || userInfo._id !== user._id){
                dispatch({type: USER_UPDATE_PROFILE_RESET})
                dispatch(getUserDetails(Number(userInfo._id)))
                dispatch(listMyOrders())
            }else{
                setName(user.name)
                setEmail(user.email)
            }
        }}, [navigate, userInfo, dispatch, user, success])


    const submitHandler = (e) => {
        e.preventDefault()

        if(password != confirmPassword){
            setMessage('Podane hasła muszą być identyczne!')
        }else{
            dispatch(updateUserProfile({
                'id': user._id,
                'name': name,
                'email': email,
                'password': password
        }))
        setMessage('')
        }
    }


  return (
    <Row>
        <Col md={3}>
            <h2 className="text-2xl text-center">Moje dane:</h2>
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
                        <Form.Control type='password' placeholder='Wprowadź hasło' value={password} onChange={(e)=>setPassword(e.target.value)}>
                            
                        </Form.Control>
                </Form.Group>

                <Form.Group controlId='PasswordConfirm' className="mt-3">
                    <Form.Label>Powtórz hasło</Form.Label>
                        <Form.Control type='Password' placeholder='Powtórz hasło' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}>
                            
                        </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary' className="mt-4 login-btn"><i class="fa-regular fa-pen-to-square"></i> Zapisz zmiany</Button>
            </Form>
        </Col>

        <Col md={9}>
            <h2 className="text-2xl text-center">Moje zamówienia</h2>
            {loadingOrders ? (
                <Loader />
            ): errorOrders ? (
                <Message varinat='danger'>{errorOrders}</Message>
            ): (
                <Table striped responsive className="table-sm">
                    
                    <thead>
                        <tr>
                            <th>Numer</th>
                            <th>Data</th>
                            <th>Kwota</th>
                            <th>Płatność</th>
                            <th>Dostarczone</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.createAt.substring(0, 10)} - {order.createAt.substring(11, 16)}</td>
                                <td>{order.totalPrice} zł</td>
                                <td>{!order.isPaid ? (
                                    <p className="text-red-500">Nie opłacone</p>
                                ): (
                                    order.paidAt ? (
                                      <p className="text-green-500">Opłacone {order.paidAt.substring(0, 10)}- {order.paidAt.substring(11, 16)}</p>
                                    ) : (
                                      <p className="text-green-500">Opłacone</p>
                                    ))}
                                </td>
                                <td>
                                    <LinkContainer to={`/order/${order._id}`}>
                                        <Button className="btn-sm">Szczegóły</Button>
                                    </LinkContainer>
                                </td>
                                <td></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )} 
        </Col>
    </Row>
  )
}

export default ProfileScreen
