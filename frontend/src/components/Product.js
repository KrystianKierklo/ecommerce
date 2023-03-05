import React from 'react';
import { Card } from 'react-bootstrap';
import Rating from './Rating'
import '../index.css'
import { Link } from 'react-router-dom'

function Product({ product }) {
	return( 
        <Card className='my-3 rounded produkt'>
            <Link to={`/product/${product._id}`}>
                <Card.Img className="scale-75 max-h-72" src={product.image} />
            </Link>

            <Card.Body>
                <Link to={`/product/${product._id}`}>
                    <Card.Title as="div">
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>

                <Card.Text as="div">
                    <div className="my-3">
                        <Rating value={product.rating} text={product.numReviews} />
                    </div>
                </Card.Text>

                <Card.Text as="h3">
                    <strong>Cena: </strong>{product.price} zł
                </Card.Text>
            </Card.Body>
        </Card>
    )
}


export default Product