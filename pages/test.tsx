import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import { Container, Row, Col, Navbar, Button } from "react-bootstrap";

const Home: NextPage = () => {
  const Onboarding = () => {
    window.location = "https://shopping-paypal.herokuapp.com/thankyou";
  };

  return (
    <div>
      <Navbar bg="light">
        <Container>
          <Navbar.Brand href="#home">
            PayPal Provisioning Platform{" "}
          </Navbar.Brand>
        </Container>
      </Navbar>

      <Container className="mt-3">
        <Row>
          PayPal linking flow complete - Success !!
          <Col>
            <Button variant="primary" onClick={() => Onboarding()}>
              Continue to BISB APP{" "}
            </Button>{" "}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
