import React, {useState, useEffect, useProps} from 'react'
import { useNavigate, useLocation} from 'react-router-dom'
import {Form, Button, Row, Col, Table} from 'react-bootstrap'
import Loader from '../components/Loader';
import Message from '../components/Message';
import {useDispatch, useSelector} from 'react-redux'
import FormContainer from '../components/FormContainer';
import {LinkContainer} from 'react-router-bootstrap'
import {listOrders, deliverOrder} from '../actions/orderActions' 



function OrderListScreen() {

    const dispatch = useDispatch()

    const orderList = useSelector(state => state.orderList)
    const {loading, error, orders} = orderList

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin


    const navigate = useNavigate()

    useEffect(() => {
        if(userInfo && userInfo.isAdmin){
            dispatch(listOrders())
        }else{
            navigate(`/login`)
        }
        
    }, [dispatch, navigate, userInfo])


  return (
    <div>
        <h1 className="text-4xl text-center mb-5">Lista zamówień</h1>
        {loading
        ? <Loader />
        : error
            ?<Message varint='danger'>{error}</Message>
            :(
                <Table striped bordered hover responsive className="table-sm">
                    <thead className="text-center ">
                        <tr>
                            <th>Numer</th>
                            <th>Kupujący</th>
                            <th>Data</th>
                            <th>Kwota</th>
                            <th>Status płatności</th>
                            <th>Czy dostarczone</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {orders.map(order => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.user && order.user.name}</td>
                                <td>{order.createAt.substring(0, 10)}</td>
                                <td>{order.totalPrice} zł</td>
                                <td>{order.isPaid ? (
                                    <p className="text-green-500">Opłacone</p>
                                ): <p className="text-red-500">Nie opłacone</p>}</td>
                                <td>{order.isDelivered ? (
                                    <p className="text-green-500">Dostarczone</p>
                                ): <p className="text-red-500">Nie dostaczone</p>}</td>
                                
                                
                                <td>
                                    <LinkContainer to={`/order/${order._id}`}>
                                        <Button varinat='light' className="btn-sm">Szczegóły</Button>
                                    </LinkContainer>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
    </div>
  )
}

export default OrderListScreen
