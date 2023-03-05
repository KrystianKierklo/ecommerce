import React, {useState, useEffect, useProps} from 'react'
import {Link, useNavigate, useLocation} from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import Loader from '../components/Loader';
import Message from '../components/Message';
import {useDispatch, useSelector} from 'react-redux'
import {register} from '../actions/userActions'
import FormContainer from '../components/FormContainer';
import {saveShippingAddress} from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'



function ShippingScreen() {
    const location = useLocation()
    const navigate = useNavigate()

    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart


    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const dispatch = useDispatch()


    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(saveShippingAddress({address, city, postalCode, country}))
        navigate('/payment')
    }


  return (
      <FormContainer >
        <CheckoutSteps step1 step2/>
        <h1 className="text-3xl text-center">Dostawa i płatność</h1>
        <Form onSubmit={submitHandler}>

            <Form.Group controlId='address' className="mt-3">
                <Form.Label>Adres</Form.Label>
                    <Form.Control required type='text' placeholder='Wprowadź ulicę i numer domu' value={address ? address : ''} onChange={(e)=>setAddress(e.target.value)}>
            
                    </Form.Control>
            </Form.Group>

            <Form.Group controlId='city' className="mt-3">
                <Form.Label>Miasto</Form.Label>
                    <Form.Control required type='text' placeholder='Wprowadź nazwę twojego miasta' value={city ? city : ''} onChange={(e)=>setCity(e.target.value)}>
            
                    </Form.Control>
            </Form.Group>

            <Form.Group controlId='postalCode' className="mt-3">
                <Form.Label>Kod pocztowy</Form.Label>
                    <Form.Control required type='text' placeholder='Wprowadź kod pocztowy' value={postalCode ? postalCode : ''} onChange={(e)=>setPostalCode(e.target.value)}>
            
                    </Form.Control>
            </Form.Group>

            <Form.Group controlId='country' className="mt-3">
                <Form.Label>Państwo</Form.Label>
                    <Form.Control required type='text' placeholder='Wprowadź nazwę Państwa' value={country ? country : ''} onChange={(e)=>setCountry(e.target.value)}>
            
                    </Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary' className="login-btn mt-5">Kontynuuj</Button>


        </Form>
    </FormContainer>
  )
}



export default ShippingScreen
