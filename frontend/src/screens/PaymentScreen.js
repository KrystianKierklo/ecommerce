import React, {useState, useEffect, useProps} from 'react'
import {Link, useNavigate, useLocation} from 'react-router-dom'
import {Form, Button, Row, Col, FormGroup} from 'react-bootstrap'
import Loader from '../components/Loader';
import Message from '../components/Message';
import {useDispatch, useSelector} from 'react-redux'
import {register} from '../actions/userActions'
import FormContainer from '../components/FormContainer';
import {saveShippingAddress} from '../actions/cartActions'
import {savePaymentMethod} from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'




function PaymentScreen() {
    const location = useLocation()
    const navigate = useNavigate()

    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart
    const dispatch = useDispatch()

    const [paymentMethod, setPaymentMethod] = useState('')

    if(!shippingAddress.address){
        navigate('/shipping')
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }

  return (
      <FormContainer>
        <CheckoutSteps step1 step2 step3/>
        <Form onSubmit={submitHandler}>
            <FormGroup>
                <Form as='legend'>Wybierz metodę płatnośći</Form>
                <Col className="mt-2">
                    <Form.Check type='radio' label='PayPal' value='paypal' name='paymentMethod' onChange={(e) => setPaymentMethod(e.target.value)}>
                    </Form.Check>
                </Col>
                <Col className="mt-2">
                    <Form.Check type='radio' label='Karta Kredytowa' value='Karta Kredytowa' name='paymentMethod' onChange={(e) => setPaymentMethod(e.target.value)}>
                    </Form.Check>
                </Col>
                <Col className="mt-2">
                    <Form.Check type='radio' label='Przelewy24' value='Przelewy24' name='paymentMethod' onChange={(e) => setPaymentMethod(e.target.value)}>
                    </Form.Check>
                </Col>
                <Col className="mt-2">
                    <Form.Check type='radio' label='Płatność przy odbiorze' value='Płatność przy odbiorze' name='paymentMethod' onChange={(e) => setPaymentMethod(e.target.value)}>
                    </Form.Check>
                </Col>
            </FormGroup>


            <Button type='submit' variant='primary' className="mt-5" disabled={paymentMethod === ''}>
                Kontynnuj
            </Button>
        </Form>
    </FormContainer>
  )
}

export default PaymentScreen
