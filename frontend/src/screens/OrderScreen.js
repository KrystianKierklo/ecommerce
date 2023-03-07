import React, {useState, useEffect, useProps} from 'react'
import {Link, useNavigate, useLocation, useParams} from 'react-router-dom'
import {Form, Button, Row, Col, ListGroup, Image, Card} from 'react-bootstrap'
import Loader from '../components/Loader';
import Message from '../components/Message';
import {useDispatch, useSelector} from 'react-redux'
import {register} from '../actions/userActions'
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps'
import {getOrderDetails} from '../actions/orderActions'
import { ORDER_CREATE_RESET } from '../constants/orderConstants';

function OrderScreen() {
    const { id: orderId } = useParams()
    const dispatch = useDispatch()

    const orderDetails = useSelector(state => state.orderDetails)
    const{order, error, loading} = orderDetails


    const location = useLocation()
    const navigate = useNavigate()

    if(!loading && !error){
        order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    }

    
    useEffect(() => {
        if(!order || order._id !== Number(orderId)){
            dispatch(getOrderDetails(orderId))
        }
    }, [order, orderId])


  return loading ? (
    <Loader />
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ): (

    <div>
        <h1 className="text-3xl text-center">Zamówienie numer: {order._id} </h1>
      <Row className="mt-5">
        <Col md={8}>
            <ListGroup cariant='flush'>
                <ListGroup.Item >
                    <h2 className="text-xl font-bold">Dostawa</h2>
                    <p className="pt-4 text-xl">
                        <strong>Imię: </strong> {order.user.name}
                    </p>
                    <p className="pt-4 text-xl">
                        <strong>Email: </strong> <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                    </p>
                    <p className="pt-4 text-xl">
                        {order.shippingAddress.address}, {order.shippingAddress.city}
                        {'   '},
                        {order.shippingAddress.postalCode},
                        {'   '}
                        {order.shippingAddress.country}
                    </p>
                </ListGroup.Item>

                <ListGroup.Item className="mt-4">
                    <h2 className="text-3xl font-bold">Wybrana metoda płatności </h2>
                    <p className="pt-4 text-xl">
                        {order.paymentMethod}
                    </p>
                </ListGroup.Item>

                <ListGroup.Item className="mt-4">
                    <h2 className="text-3xl font-bold">Zakupione przedmioty: </h2>
                    <p className="pt-4 text-xl">
                        <ListGroup cariant='flush'>
                            {order.orderItems.map((item, index) => (
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
                            <Col>{order.itemsPrice} zł</Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>Koszt dostawy: </Col>
                            <Col>{order.shippingPrice} zł</Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>Podatek: </Col>
                            <Col>{order.taxPrice} zł</Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>Łącznie: </Col>
                            <Col>{order.totalPrice} zł</Col>
                        </Row>
                    </ListGroup.Item>

                </ListGroup>
            </Card>
        </Col>
      </Row>
    </div>
  )
}

export default OrderScreen
