import React from 'react'
import '../index.css'
import { Container, Row, Col } from 'react-bootstrap'


function Footer(){
    return(
        <div className="bg-neutral-700">
            <Container>
                <Row>
                    <Col className="text-center py-3">Copyright &copy; KrystianKierklo</Col>
                </Row>
            </Container>
        </div>
    )
}

export default Footer