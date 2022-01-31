import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React from 'react';
import {Container, Row, Col, Navbar, Button} from 'react-bootstrap';


const Home: NextPage = () => {

  const Onboarding = () => {
    console.log("Starting onboarding")
    fetch("/api/onboarding")
    .then((res) => res.json())
    .then(
      (data) => {
        console.log(data)
        window.location = data.url
      },
      (error) => {
        console.log(error);
      }
    );
  }

  return (
    <div> 
         <Navbar bg="light">
          <Container>
            <Navbar.Brand href="#home">PayPal Provisioning Platform </Navbar.Brand>
          </Container>
        </Navbar>

        <Container className="mt-3">
            <Row>
              <Col>
                 <Button variant="primary" onClick={()=> Onboarding()}>Link/Signup with PayPal </Button>{' '}
              </Col>
            </Row>
        </Container>

    </div>
  )
}

export default Home
