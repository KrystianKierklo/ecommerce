import React from 'react';
import '../index.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {logout} from '../actions/userActions'
import SearchBox from '../components/SearchBox'


function Header() {
	const cart = useSelector(state => state.cart)
    const {cartItems} = cart

	const userLogin = useSelector(state => state.userLogin)
	const { userInfo } = userLogin
	const dispatch = useDispatch()

	const logoutHandler = () =>{
		dispatch(logout())
		localStorage.clear()
	}

	return (
		<header className="text-xl">
			<Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
				<Container fluid >
                    <LinkContainer to='/'>
					    <Navbar.Brand className="hover:text-amber-400 hover:font-bold" href='/'>PikeShop</Navbar.Brand>
                    </LinkContainer>
					<Navbar.Toggle aria-controls='navbarScroll' />
					<Navbar.Collapse id='navbarScroll'>
						<SearchBox />
						<Nav
							className='my-2 my-lg-0 ms-auto p-1'
							navbarScroll>
                            <LinkContainer to='/cart'>
                                <Nav.Link className="hover:text-amber-400"><i class="fa-solid fa-cart-shopping"></i> Koszyk {cartItems.length > 0 ? <span>({cartItems.reduce((acc, item) =>acc + item.qty, 0)})</span> : null}
                                </Nav.Link>
                            </LinkContainer>

							{userInfo && userInfo.isAdmin && (
								<NavDropdown title={`Panel Admina`} id='adminmenu' className="pr-5">
									<LinkContainer to='/admin/userlist'>
										<NavDropdown.Item>Użytkownicy</NavDropdown.Item>
									</LinkContainer>
									<LinkContainer to='/admin/productlist'>
										<NavDropdown.Item>Przedmioty</NavDropdown.Item>
									</LinkContainer>
									<LinkContainer to='/admin/orderlist'>
										<NavDropdown.Item>Zamówienia</NavDropdown.Item>
									</LinkContainer>
								
							</NavDropdown>
							)}


							{userInfo ? (
								<NavDropdown title={`Witaj ${userInfo.name} !`} id='username' className="pr-5">
									<LinkContainer to='/profile'>
										<NavDropdown.Item className="hover:text-amber-400"><i class="fa-solid fa-address-card"></i> Mój profil</NavDropdown.Item>
									</LinkContainer>
									<NavDropdown.Item onClick={logoutHandler} className="hover:text-amber-400"><i class="fa-solid fa-right-from-bracket"></i> Wyloguj się</NavDropdown.Item>
								</NavDropdown>
							): (
									<LinkContainer to='/login'>
										<Nav.Link className="hover:text-amber-400"><i class="fa-solid fa-right-to-bracket"></i> Logowanie</	Nav.Link>
									</LinkContainer>
								)							
							}

							

						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
}

export default Header;
