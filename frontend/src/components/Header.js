import React from 'react';
import '../index.css';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap'

function Header() {
	return (
		<header className="text-xl">
			<Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
				<Container fluid >
                    <LinkContainer to='/'>
					    <Navbar.Brand className="hover:text-amber-400 hover:font-bold" href='/'>PikeShop</Navbar.Brand>
                    </LinkContainer>
					<Navbar.Toggle aria-controls='navbarScroll' />
					<Navbar.Collapse id='navbarScroll'>
						<Nav
							className='my-2 my-lg-0 ms-auto p-1'
							navbarScroll>
                            <LinkContainer to='/cart'>
                                <Nav.Link className="hover:text-amber-400"><i class="fa-solid fa-cart-shopping"></i> Koszyk
                                </Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/login'>
                                <Nav.Link className="hover:text-amber-400"><i class="fa-solid fa-right-to-bracket"></i> Logowanie</Nav.Link>
                            </LinkContainer>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
}

export default Header;
