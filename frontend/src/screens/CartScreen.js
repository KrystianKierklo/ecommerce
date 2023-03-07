import React, {useEffect} from 'react'
import {Route, Link, useParams, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {Row, Col, ListGroup, Image, Form, Button, Card} from 'react-bootstrap'
import Message from '../components/Message'
import {addToCart, removeFromCart} from '../actions/cartActions'
import queryString from 'query-string'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import '../index.css'

function CartScreen() {
    const {id} = useParams()
    const navigate = useNavigate();


    const location = useLocation()
    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const {cartItems} = cart



    useEffect(() => {
        if(id){
            dispatch(addToCart(id, qty))
        }
    }, [dispatch, id, qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        if (userInfo) {
            navigate('/shipping')
          } else {
            navigate('/login')
          }
    }


  return (
    <Row>
        <Col md={8}>
            <h1 className="text-5xl text-center mb-5">Twój koszyk</h1>
            {cartItems.length === 0 ? (
                <Message variant="info"> Twój koszyk jest pusty <Link to={'/'}> Powrót do strony głównej</Link> </Message>
            ) : (
                <ListGroup variant='flush'>
                    {cartItems.map(item => (
                        <ListGroup.Item key={item.product} >
                            <Row>
                                <Col md={2}>
                                    <Image src={item.image} alt={item.name} fluid rounded/>
                                </Col>
                                <Col md={3}>
                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                </Col>
                                <Col md={2}>
                                    {item.price} zł
                                </Col>
                                <Col md={1}>
                                    <Form.Control as='select' value={item.qty} onChange={(e) => dispatch(addToCart(item.product, 
                                        Number(e.target.value)))}>
                                        {
                                            [...Array(item.countInStock).keys()].map((x) => (
                                                <option key={x + 1} value={x + 1} >
                                                    {x + 1}
                                                </option>
                                            ))}
                                    </Form.Control>
                                </Col>
                                <Col md={1}>
                                    <Button type='button' variant='light' onClick={() => removeFromCartHandler(item.product)}>
                                        <i class="fa-solid fa-trash-can"></i>
                                    </Button>
                                </Col>

                            </Row>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )
        }
        </Col>
        <Col md={4}>
            <Card>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2 className="text-center text-2xl">Podsumowanie: <p className="text-sm">{cartItems.reduce((acc, item) =>acc + item.qty, 0)} przedmiotów</p></h2>
                        <span className="text-base">Razem: {cartItems.reduce((acc, item) =>acc + item.qty * item.price, 0).toFixed(2)} zł </span>
                    </ListGroup.Item>
                    <ListGroup.Item className="text-center">
                        <Button type='button' className="btn-block" disabled={cartItems.length === 0} onClick={checkoutHandler}>
                            Przejdź do kasy
                        </Button>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </Col>
    </Row>
  )
}


export default CartScreen

