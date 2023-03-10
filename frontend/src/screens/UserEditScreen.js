import React, {useState, useEffect, useProps} from 'react'
import {Link, useNavigate, useLocation, useParams} from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import Loader from '../components/Loader';
import Message from '../components/Message';
import {useDispatch, useSelector} from 'react-redux'
import {getUserDetails, updateUser} from '../actions/userActions'
import FormContainer from '../components/FormContainer';
import {USER_UPDATE_RESET} from '../constants/userConstants'

function EditUserScreen() {
    // const{id} = useParams()
    const{id: userId} = useParams()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const {error, loading, user} = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const {error:errorUpdate, loading:loadingUpdate, success: successUpdate} = userUpdate

    useEffect(() => {
        if(successUpdate){
            dispatch({type: USER_UPDATE_RESET})
            navigate('/admin/userlist')
        }else{
                
            if(!user || user._id !== Number(userId)){
                dispatch(getUserDetails(userId))
            }else{
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }

    }, [userId, user, successUpdate, navigate])


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({_id: user._id, name, email, isAdmin}))
    }


  return (
    <div>
        <Link to='/admin/userlist' >Powrót</Link>
        <FormContainer className="formcontainer">
            <h1 className="text-5xl text-center mb-5">Edytuj użytkownika</h1>
            {loadingUpdate && <Loader />}

            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
            
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <Form onSubmit={submitHandler}>

                <Form.Group controlId='name'>
                    <Form.Label>Imię</Form.Label>
                        <Form.Control type='name' placeholder='Wprowadź swoje imię' value={name} onChange={(e)=>setName(e.target.value)}>
            
                        </Form.Control>
                </Form.Group>

                <Form.Group controlId='email' className="mt-3">
                    <Form.Label>Adres email</Form.Label>
                        <Form.Control type='email' placeholder='Wprowadź adres email' value={email} onChange={(e)=>setEmail(e.target.value)}>
                                
                        </Form.Control>
                </Form.Group>

                <Form.Group controlId='isadmin' className="mt-3">
                    <Form.Check type='checkbox' label='Is Admin' checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)}>

                    </Form.Check>

                </Form.Group>

                <Button type='submit' variant='primary' className="mt-4 login-btn">Zapisz zmiany</Button>
            </Form>
            )}

    </FormContainer>
    </div>
  )
}

export default EditUserScreen
