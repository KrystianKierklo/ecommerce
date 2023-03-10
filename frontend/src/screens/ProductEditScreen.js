import React, {useState, useEffect, useProps} from 'react'
import axios from 'axios';
import {Link, useNavigate, useLocation, useParams} from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import Loader from '../components/Loader';
import Message from '../components/Message';
import {useDispatch, useSelector} from 'react-redux'
import { listProductDetails, createProduct, updateProduct } from '../actions/productActions';
import FormContainer from '../components/FormContainer';
import {USER_UPDATE_RESET} from '../constants/userConstants'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';


function ProductEditScreen() {
    // const{id} = useParams()
    const{id: productId} = useParams()

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [brand, setBrand] = useState('')
    const [image, setImage] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [uploading, setUploading] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const {error, loading, product} = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const {error:errorUpdate, loading:loadingUpdate, success:successUpdate} = productUpdate


    useEffect(() => {

        if(successUpdate){
            dispatch({type:PRODUCT_UPDATE_RESET})
            navigate(`/admin/productlist`)
        }else{
            if(!product.name || product._id !== Number(productId)){
                dispatch(listProductDetails(productId))
            }else{
                setName(product.name)
                setPrice(product.price)
                setBrand(product.brand)
                setImage(product.image)
                setCategory(product.category)
                setDescription(product.description)
                setCountInStock(product.countInStock)
    
            }
        }

       
    }, [dispatch, productId, product, navigate, successUpdate])


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id:productId,
            name:name,
            price: price,
            image: image,
            brand: brand,
            category: category,
            countInStock: countInStock,
            description: description
        }))
    }

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()

        formData.append('image', file)
        formData.append('product_id', productId)

        setUploading(true)

        try {
            const config = {
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            }

            const {data} = await axios.post('/api/products/upload/', formData, config)

            setImage(data)
            setUploading(false)

        }catch(error){
            setUploading(false)
        }
    }

  return (
    <div>
        <Link to='/admin/productlist' >Powrót</Link>
        <FormContainer className="formcontainer">
            <h1 className="text-5xl text-center mb-5">Edytuj produkt</h1>

            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
            
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <Form onSubmit={submitHandler}>

                    <Form.Group controlId='name'>
                        <Form.Label>Nazwa</Form.Label>
                            <Form.Control type='name' placeholder='Wprowadź nazwę przedmiotu' value={name} onChange={(e)=>setName(e.target.value)}>
                
                            </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='price'>
                        <Form.Label>Cena</Form.Label>
                            <Form.Control type='number' placeholder='Podaj cenę' value={price} onChange={(e)=>setPrice(parseFloat(e.target.value))}>

                            </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='image'>
                        <Form.Label>Zdjęcie</Form.Label>
                        <Form.Control type='text' placeholder='Wybierz zdjęcie' value={image} onChange={(e)=>setImage(e.target.value)}>
                        </Form.Control>

                        <Form.Control type='file' placeholder='Wybierz zdjęcie' onChange={uploadFileHandler}>
                        </Form.Control>

                        {uploading && <Loader />}

                        {/* <Form.File id='image-file' label='Wybierz plik ze zdjęciem' custom onChange={uploadFileHandler} >

                        </Form.File> */}

                    </Form.Group>

                    <Form.Group controlId='brand'>
                        <Form.Label>Marka</Form.Label>
                            <Form.Control type='text' placeholder='Wprawdź markę produktu' value={brand} onChange={(e)=>setBrand(e.target.value)}>
                
                            </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='countInStock'>
                        <Form.Label>Ilość</Form.Label>
                            <Form.Control type='number' placeholder='Wprawdź ilość' value={countInStock} onChange={(e)=>setCountInStock(e.target.value)}>
                
                            </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='category'>
                        <Form.Label>Kategoria</Form.Label>
                            <Form.Control type='text' placeholder='Wprawdź kategorię' value={category} onChange={(e)=>setCategory(e.target.value)}>
                
                            </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='description'>
                        <Form.Label>Opis</Form.Label>
                            <Form.Control as='textarea' placeholder='Dodaj opis' value={description} onChange={(e)=>setDescription(e.target.value)}>
                
                            </Form.Control>
                    </Form.Group>

                <Button type='submit' variant='primary' className="mt-4 login-btn">Zapisz zmiany</Button>
            </Form>
            )}

    </FormContainer>
    </div>
  )
}

export default ProductEditScreen
