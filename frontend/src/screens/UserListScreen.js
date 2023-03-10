import React, {useState, useEffect, useProps} from 'react'
import { useNavigate, useLocation} from 'react-router-dom'
import {Form, Button, Row, Col, Table} from 'react-bootstrap'
import Loader from '../components/Loader';
import Message from '../components/Message';
import {useDispatch, useSelector} from 'react-redux'
import FormContainer from '../components/FormContainer';
import {listUsers, deleteUser} from '../actions/userActions'
import {LinkContainer} from 'react-router-bootstrap'



function UserListScreen() {

    const dispatch = useDispatch()

    const userList = useSelector(state => state.userList)
    const {loading, error, users} = userList

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userDelete = useSelector(state => state.userDelete)
    const {success: successDelete} = userDelete

    const navigate = useNavigate()

    useEffect(() => {
        if(userInfo && userInfo.isAdmin){
            dispatch(listUsers())
        }else{
            navigate(`/login`)
        }
        
    }, [dispatch, navigate, successDelete])

    const deleteHandler = (id, email) => {
        if(window.confirm(`Czy na pewno chcesz usunąć użytkownika o adresie email: ${email} ?`)){
            dispatch(deleteUser(id))
        }


        
    } 

  return (
    <div>
        <h1 className="text-4xl text-center mb-5">Zarejestrowani użytkownicy</h1>
        {loading
        ? <Loader />
        : error
            ?<Message varint='danger'>{error}</Message>
            :(
                <Table striped bordered hover responsive className="table-sm">
                    <thead className="text-center ">
                        <tr>
                            <th>Id</th>
                            <th>Imię</th>
                            <th>Email</th>
                            <th>Admin</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.isAdmin ? (
                                    <i class="fa-solid fa-circle-check text-lime-500"></i>
                                ): <i class="fa-solid fa-circle-minus text-red-500"></i>}</td>
                                <td>
                                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                        <Button varinat='light' className="btn-sm"><i class="fa-regular fa-pen-to-square text-lime-500"></i></Button>
                                    </LinkContainer>

                                    <Button varinat='danger' className="btn-sm" onClick={() => deleteHandler(user._id, user.email)}><i class="fa-solid fa-trash-can text-red-500"></i></Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
    </div>
  )
}

export default UserListScreen
