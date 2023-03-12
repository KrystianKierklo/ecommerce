import React, {useState, useEffect} from 'react';
import { Row, Col } from 'react-bootstrap';
import '../index.css';
import Product from '../components/Product'
import { useDispatch, useSelector } from 'react-redux'
import {listProducts} from '../actions/productActions'
import Loader from '../components/Loader';
import Message from '../components/Message';
import {useNavigate, useLocation} from 'react-router-dom'
import Paginate from '../components/Paginate'


function HomePage() {
	const dispatch = useDispatch()
	const productList = useSelector(state => state.productList)
	const {error, loading, products, page, pages} = productList

	const navigate = useNavigate()
	const location = useLocation()

	let keyword = location.search


	useEffect(()=>{
		dispatch(listProducts(keyword))

	}, [dispatch, keyword])


	return (
		<div>
			<h1 className="text-5xl text-center">Najnowsze produkty</h1>
			{loading ? <Loader />
				:error ? <Message variant='danger' children={error} />
				:
					<div>
						<Row className="mt-5">
						{products.map(product => (
							<Col key={product._id} sm={12} md={6} lg={4} xl={3} >
								<Product product={product} />
							</Col>
						))}
						</Row>
						<Paginate page={page} pages={pages} keyword={keyword}/>
					</div>
				}

		</div>
	)
}

export default HomePage;
