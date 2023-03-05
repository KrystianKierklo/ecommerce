import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'


function FormContainer({children}) {
  return (
    <Container className="border-y-amber-400 border-solid border-4 py-5 rounded-2xl ">
        <Row className="justify-content-md-center">
            <Col xs={12} md={4}>
                {children}
            </Col>
        </Row>
    </Container>
  )
}


export default FormContainer
