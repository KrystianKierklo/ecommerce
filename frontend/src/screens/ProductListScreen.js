import React, {useState, useEffect, useProps} from 'react'
import { useNavigate, useLocation, useParams, Link} from 'react-router-dom'
import {Form, Button, Row, Col, Table} from 'react-bootstrap'
import Loader from '../components/Loader';
import Message from '../components/Message';
import {useDispatch, useSelector} from 'react-redux'
import FormContainer from '../components/FormContainer';
import {listUsers, deleteUser} from '../actions/userActions'
import {LinkContainer} from 'react-router-bootstrap'
import {listProducts, deleteProduct, createProduct} from '../actions/productActions'
import {PRODUCT_CREATE_RESET} from '../constants/productConstants'
import Paginate from '../components/Paginate';

function ProductListScreen() {
    const { id } = useParams()

    const dispatch = useDispatch()
    

    const productList = useSelector(state => state.productList)
    const {loading, error, products, pages, page} = productList

    const productDelete = useSelector(state => state.productDelete)
    const {loading:loadingDelete, error:errorDelete, success:successDelete} = productDelete

    const productCreate = useSelector(state => state.productCreate)
    const {loading:loadingCreate, error:errorCreate, success:successCreate, product: createdProduct} = productCreate

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin


    const navigate = useNavigate()
    const location = useLocation()

    let keyword = location.search

    useEffect(() => {
        dispatch({type: PRODUCT_CREATE_RESET})

        if(!userInfo.isAdmin){
            navigate(`/login`)
        }
        
        if(successCreate){
            navigate(`/admin/product/${createdProduct._id}/edit`)
        }else{
            dispatch(listProducts(keyword))
        }

    }, [dispatch, navigate, userInfo, successDelete, successCreate, keyword])



    const deleteHandler = (id, name) => {
        if(window.confirm(`Czy na pewno chcesz usunąć ten produkt ${name} ?`)){
            dispatch(deleteProduct(id))
        }
    } 

    const createProductHandler = () => {
        dispatch(createProduct())
    }

  return (
    <div>
        
        <Row className="align-items-center">
            <Col>
                <h1 className="text-4xl text-center mb-5" >Produkty w sklepie ({products.length})</h1>
            </Col>
            <Col className="text-right">
                <Button className="my-3" onClick={createProductHandler}>
                    Dodaj produkt
                </Button>
            </Col>
        </Row>

        {loadingDelete && <Loader />}
        {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

        {loadingCreate && <Loader />}
        {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

        {loading
        ? <Loader />
        : error
            ?<Message varint='danger'>{error}</Message>
            :(

                <div>
                    <Table striped bordered hover responsive className="table-sm">
                        <thead className="text-center ">
                            <tr>
                                <th>Id</th>
                                <th>Nazwa</th>
                                <th>Ilość</th>
                                <th>Cena</th>
                                <th>Kategoria</th>
                                <th>Marka</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {products.map(product => (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td><Link to={`/product/${product._id}`}>{product.name}</Link></td>
                                    <td>{product.countInStock}</td>
                                    <td>{product.price} zł</td>
                                    <td>{product.category}</td>
                                    <td>{product.brand}</td>
                                    
                                    <td >
                                        <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                            <Button varinat='light' className="btn-sm"><i class="fa-regular fa-pen-to-square text-lime-500"></i></Button>
                                        </LinkContainer>

                                        <Button varinat='danger' className="btn-sm" onClick={() => deleteHandler(product._id, product.name)}><i class="fa-solid fa-trash-can text-red-500"></i></Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Paginate page={page} pages={pages} isAdmin={true} keyword={keyword}/>
                </div>
            )}
    </div>
  )
}

export default ProductListScreen
