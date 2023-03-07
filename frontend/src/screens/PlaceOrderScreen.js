import React, {useState, useEffect, useProps} from 'react'
import {Link, useNavigate, useLocation} from 'react-router-dom'
import {Form, Button, Row, Col, ListGroup, Image, Card} from 'react-bootstrap'
import Loader from '../components/Loader';
import Message from '../components/Message';
import {useDispatch, useSelector} from 'react-redux'
import {register} from '../actions/userActions'
import FormContainer from '../components/FormContainer';
import {saveShippingAddress} from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'
import {createOrder} from '../actions/orderActions'
import { ORDER_CREATE_RESET } from '../constants/orderConstants';

function PlaceOrderScreen() {
    const orderCreate = useSelector(state => state.orderCreate)
    const{order, error, success} = orderCreate

    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const cart = useSelector(state => state.cart)

    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    cart.shippingPrice = (cart.itemsPrice > 500 ? 0 : 10).toFixed(2)
    cart.taxPrice = (Number((cart.itemsPrice) * (0.23))).toFixed(2)

    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)

    
    if (! cart.paymentMethod){
        navigate(`/payment`)
    }

    useEffect(() => {
        if(success){
            navigate(`/order/${order._id}`)
            dispatch({type: ORDER_CREATE_RESET})
        }
    }, [success, navigate])

    const placeOrder = () =>{
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,
        }))
    }
    

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4/>
      <Row>
        <Col md={8}>
            <ListGroup cariant='flush'>
                <ListGroup.Item >
                    <h2 className="text-3xl font-bold">Adres dostawy</h2>
                    <p className="pt-4 text-xl">
                        {cart.shippingAddress.address}, {cart.shippingAddress.city}
                        {'   '},
                        {cart.shippingAddress.postalCode},
                        {'   '}
                        {cart.shippingAddress.country}
                    </p>
                </ListGroup.Item>

                <ListGroup.Item className="mt-4">
                    <h2 className="text-3xl font-bold">Metoda płatności </h2>
                    <p className="pt-4 text-xl">
                        {cart.paymentMethod}
                    </p>
                </ListGroup.Item>

                <ListGroup.Item className="mt-4">
                    <h2 className="text-3xl font-bold">Kupowane przedmioty: </h2>
                    <p className="pt-4 text-xl">
                        <ListGroup cariant='flush'>
                            {cart.cartItems.map((item, index) => (
                                <ListGroup.Item key={index} className="text-base">
                                    <Row>
                                        <Col md={1}>
                                            <Image src={item.image} alt={item.name} fluid rounded/>
                                        </Col>
                                        <Col>
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </Col>
                                        <Col md={4}>
                                            {item.qty}  X  ${item.price} zł = {item.qty * item.price} zł
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </p>
                </ListGroup.Item>

            </ListGroup>
        </Col>

        <Col md={4}>
            <Card>
                <ListGroup varinat='flush'>
                    <ListGroup.Item>
                        <h2 className="text-3xl text-center">Podsumowanie zamówienia</h2>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>Przedmioty: </Col>
                            <Col>{cart.itemsPrice} zł</Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>Koszt dostawy: </Col>
                            <Col>{cart.shippingPrice} zł</Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>Podatek: </Col>
                            <Col>{cart.taxPrice} zł</Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>Łącznie: </Col>
                            <Col>{cart.totalPrice} zł</Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup>
                        {error && <Message variant='danger'>{error}</Message>}
                    </ListGroup>

                    <ListGroup.Item>
                        <Button className="btn-block login-btn" type='button' onClick={placeOrder}>Złóż zamówienie</Button>
                    </ListGroup.Item>

                </ListGroup>
            </Card>
        </Col>
      </Row>
    </div>
  )
}

export default PlaceOrderScreen
