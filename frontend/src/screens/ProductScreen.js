import React, {useState, useEffect} from 'react'
import { Link, useParams, useHistory, useLocation, useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {useDispatch, useSelector} from 'react-redux'
import {listProductDetails, createProductReview} from '../actions/productActions'
import {PRODUCT_CREATE_RESET, PRODUCT_CREATE_REVIEW_RESET} from '../constants/productConstants'


function ProductScreen() {
    const {id} = useParams()
    const navigate = useNavigate();


    const [qty, setQty] = useState(1)

    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, product} = productDetails


    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const ProductReviewCreate = useSelector(state => state.ProductReviewCreate)
    const {loading: loadingProductReview, error: errorProductReview, success: successProductReview} = ProductReviewCreate


	useEffect(()=>{
        if(successProductReview){
            setRating(0)
            setComment('')
            dispatch({type: PRODUCT_CREATE_REVIEW_RESET})
        }
        dispatch(listProductDetails(id))
	}, [dispatch, successProductReview])



    const addToCartHandler = () => {
        navigate(`/cart/${id}?qty=${qty}`)
    }


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(id,{rating,comment}))
    } 

    return (
        <div>
            <Link to='/' className="btn btn-light my-3">Strona główna</Link>
            {loading ? <Loader />
            : error ? <Message variant='danger' children={error} />
                : (

                    <div>
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

                        <Row>
                            <Col md={6}>
                                <h1 className="text-3xl mt-5 mb-3">Opinie:</h1>
                                {product.reviews.length < 1 && <Message varing='info' >Użytkownicy nie dodali jeszcze żadnej opinii
                                o tym produkcie</Message>}

                                <ListGroup variant="flush" >
                                    {product.reviews.map((review) => (
                                        <ListGroup.Item key={review._id} className="mt-3">
                                            <strong>{review.name}</strong>
                                            <span className="pl-5"> {review.createdAt.substring(0, 10)}- {review.createdAt.substring(11, 16)}</span>
                                            <Rating value={review.rating} color='#f8e825'/>
                                            <p>{review.comment}</p>
                                        </ListGroup.Item>
                                        
                                    ))}

                                        <ListGroup.Item className="mt-5">
                                            <h4 className="text-xl text-center">Dodaj opinię</h4>

                                            {loadingProductReview && <Loader />}
                                            {successProductReview && <Message varinat='succes'>Dziękujemy za opinię &#128512</Message>}
                                            {errorProductReview && <Message varinat='succes'>{errorProductReview}</Message>}

                                            {userInfo ? (
                                                <Form onSubmit={submitHandler}>
                                                    <Form.Group controlId='rating'>
                                                        <Form.Label>Ocena</Form.Label>
                                                        <Form.Control as='select' value={rating} onChange={(e) => setRating(e.target.value)}>
                                                            <option value='0'>Wybierz na ile polecasz te produkt innym </option>
                                                            <option value='1'>1 - Totalnie nie polecam</option>
                                                            <option value='2'>2 - Odradzam</option>
                                                            <option value='3'>3 - Może być</option>
                                                            <option value='4'>4 - Polecam</option>
                                                            <option value='5'>5 - Świetny</option>
                                                        </Form.Control>

                                                        <Form.Group controlId='comment' className="mt-3">
                                                            <Form.Label>Wiadomość</Form.Label>
                                                            <Form.Control as='textarea' row='5' value={comment} onChange={(e) => setComment(e.target.value)} placeholder='Napisz kilka słów co sądzisz o produkcie'>
                                                            </Form.Control>
                                                        </Form.Group>
                                                    </Form.Group>

                                                    <Button disabled={loadingProductReview} type='submit' varinat='primary' className="login-btn mt-5 mb-2">
                                                        Opublikuj
                                                    </Button>

                                                </Form>
                                            ): (
                                                <Message varing='info'>Aby dodać opinię <Link to='/login'>zaloguj się!</Link></Message>
                                            )}
                                        </ListGroup.Item>

                                </ListGroup>
                            </Col>
                        </Row>
                    </div>
                )
            }
        </div>
    )
}

export default ProductScreen
