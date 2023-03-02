import React, {useState, useEffect} from 'react'
import { Link, useParams, useHistory, useLocation } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {useDispatch, useSelector} from 'react-redux'
import {listProductDetails} from '../actions/productActions'



function ProductScreen() {
    const {id} = useParams()
    const history = []


    const [qty, setQty] = useState(1)

    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, product} = productDetails

	useEffect(()=>{
        dispatch(listProductDetails(id))

	}, [dispatch])

    const addToCartHandler = () => {
        window.location.replace(`/cart/${id}?qty=${qty}`);
        history.push(`/cart/${id}?qty=${qty}`)
    }

    return (
        <div>
            <Link to='/' className="btn btn-light my-3">Strona główna</Link>
            {loading ? <Loader />
            : error ? <Message variant='danger' children={error} />
                : 
                    <Row>
                        <Col md={6}>
                            <Image src={product.image} alt={product.name} fluid/>
                        </Col>
                        <Col md={3}>
                            <ListGroup varinat='flush'>
                                <ListGroup.Item>
                                    <h3>{product.name}</h3>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Rating value={product.rating} text={product.numReviews} />
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <strong>Cena: </strong> {product.price} zł
                                </ListGroup.Item>
                                
                                <ListGroup.Item>
                                <strong>Opis: </strong> {product.description}
                                </ListGroup.Item>

                            </ListGroup>
                        </Col>

                        <Col md={3}>
                            <Card>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Cena: </Col>
                                            <Col><strong>{product. price} zł</strong></Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Status: </Col>
                                            <Col><strong>{product.countInStock > 0 ? <span className="text-green-600">dostępny</span> : <span className="text-red-500">niedostępny</span>}</strong></Col>
                                        </Row>
                                    </ListGroup.Item>

                                    {product.countInStock > 0 && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Ilość: </Col>
                                                <Col xs='auto' className="my-1">
                                                    <Form.Control as='select' value={qty} onChange={(e) => setQty(e.target.value)}>
                                                        {
                                                            [...Array(product.countInStock).keys()].map((x) => (
                                                                <option key={x + 1} value={x + 1}>
                                                                    {x + 1}
                                                                </option>
                                                            ))
                                                        }
                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    )}

                                    <ListGroup.Item className="text-center">
                                        <Button onClick={addToCartHandler} className="btn-block" type='button' disabled={product.countInStock == 0} 
                                        >
                                            Dodaj do koszyka
                                        </Button>
                                    </ListGroup.Item>

                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
            }
        </div>
    )
}

export default ProductScreen
