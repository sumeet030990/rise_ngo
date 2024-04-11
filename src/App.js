import logo from './rise_logo.png';
import sign from './rise_sign.png';
import './App.css';
import { useEffect, useRef, useState } from 'react';
import { Card, Navbar, Nav, Container, Form, Row, Col, Button } from 'react-bootstrap';
import generatePDF from 'react-to-pdf';

function NumInWords(number) {
  const first = [
    '',
    'One ',
    'Two ',
    'Three ',
    'Four ',
    'Five ',
    'Six ',
    'Seven ',
    'Eight ',
    'Nine ',
    'Ten ',
    'Eleven ',
    'Twelve ',
    'Thirteen ',
    'fourteen ',
    'Fifteen ',
    'Sixteen ',
    'Seventeen ',
    'Eighteen ',
    'Nineteen ',
  ];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'eighty', 'Ninety'];
  const mad = ['', 'Thousand', 'Lakh', 'Crore'];
  let word = '';

  for (let i = 0; i < mad.length; i++) {
    let tempNumber = number % (100 * Math.pow(1000, i));
    if (Math.floor(tempNumber / Math.pow(1000, i)) !== 0) {
      if (Math.floor(tempNumber / Math.pow(1000, i)) < 20) {
        word = first[Math.floor(tempNumber / Math.pow(1000, i))] + mad[i] + ' ' + word;
      } else {
        word =
          tens[Math.floor(tempNumber / (10 * Math.pow(1000, i)))] +
          '-' +
          first[Math.floor(tempNumber / Math.pow(1000, i)) % 10] +
          mad[i] +
          ' ' +
          word;
      }
    }

    tempNumber = number % Math.pow(1000, i + 1);
    if (Math.floor(tempNumber / (100 * Math.pow(1000, i))) !== 0)
      word = first[Math.floor(tempNumber / (100 * Math.pow(1000, i)))] + 'hunderd ' + word;
  }
  return word;
}

function getAssesmentYear() {
  // Get the current date.
  const date = new Date();

  // Get the full year.
  const year = parseInt(date.getFullYear().toString().slice(-2));

  // Get the month.
  const month = date.getMonth();

  let assessmentYear = 0;
  // Check if the month is April or later.
  if (month >= 3) {
    // If the month is April or later, the assessment year is the current year + 1.
    assessmentYear = `${year} - ${year + 1}`;
  } else {
    // If the month is March or earlier, the assessment year is the current year.
    assessmentYear = `${year - 1} - ${year}`;
  }

  return assessmentYear;
}

function App() {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState('');
  const [amountInWords, setAmountInWords] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [receiptNo, setReceiptNo] = useState(0);
  const targetRef = useRef();

  useEffect(() => {
    const date = new Date();

    const formattedDate = date.toLocaleDateString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric' });
    setDate(formattedDate);
  }, []);

  useEffect(() => {
    const amt = NumInWords(amount);

    setAmountInWords(amt);
  }, [amount]);

  const getReceiptNumber = () => {
    const yearRange = getAssesmentYear();
    const date = new Date();

    const month = date.toLocaleDateString('en-GB', { month: 'short' });

    return `${receiptNo}/${month}/${yearRange}`;
  };

  return (
    <>
      <Navbar expand="lg" bg="dark" data-bs-theme="dark">
        <Container fluid>
          <Navbar.Brand href="#home">Rise</Navbar.Brand>
          <Nav className="me-auto my-2 my-lg-0" style={{ marginLeft: '10%', maxHeight: '100px' }} navbarScroll>
            <Nav.Link href="#action1" className="active">
              Create Receipt
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Card>
        <Card.Body>
          <Card.Title>Create Receipt</Card.Title>
          <Row>
            <Col xs="auto">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Name"
                className=" mr-sm-2"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </Col>
            <Col xs="auto">
              <Form.Label>Amount:</Form.Label>
              <Form.Control
                type="number"
                required
                placeholder="Amount"
                className=" mr-sm-2"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
              />
            </Col>
            <Col xs="auto">
              <Form.Label>Payment Method:</Form.Label>
              <Form.Select
                name="payment_method"
                id="payment_method"
                value={paymentMethod}
                onChange={(event) => {
                  setPaymentMethod(event.target.value);
                }}
              >
                <option value="">-Select Payment Method-</option>
                <option value="Cash">Cash</option>
                <option value="Cheque">Cheque</option>
                <option value="DD">DD</option>
                <option value="NEFT">NEFT</option>
                <option value="RTGS">RTGS</option>
                <option value="IMPS">IMPS</option>
                <option value="UPI">UPI</option>
                <option value="Net Banking">Net Banking</option>
                <option value="Debit Card">Debit Card</option>
                <option value="Credit Card">Credit Card</option>
                <option value="PhonePe">PhonePe</option>
                <option value="GooglePay">GooglePay</option>
                <option value="Paytm">Paytm</option>
                <option value="Paypal">Paypal</option>
              </Form.Select>
            </Col>
            <Col xs="auto">
              <Form.Label>Receipt No:</Form.Label>
              <Form.Control
                type="number"
                required
                placeholder="Receipt"
                className=" mr-sm-2"
                value={receiptNo}
                onChange={(event) => setReceiptNo(event.target.value)}
              />
            </Col>
            <Col xs="auto">
              <Button type="button" onClick={() => generatePDF(targetRef, { filename: `${receiptNo || 'page'}.pdf` })}>
                Save Receipt
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <div ref={targetRef} className="container">
        <div className="receipt-heading mt-5">
          <div className="mt-5">
            <img src={logo} width={130} height={130} alt="Rise" />
          </div>
          <div className="rise-details mt-5">
            <h3>RISING INFINITELY FOR SOCIAL EMPOWERMENT</h3>
            <h5>Registered under Charitable Societies Act 1860 (20)</h5>
            <h5>RISING INFINITELY FOR SOCIAL EMPOWERMENT</h5>
            <h5>Registration No. MAH – 843/11</h5>
          </div>
        </div>
        <div className="address me-3">
          <p>Registered Address : M-18, MIDC Area,</p>
          <p>Hingna Road, Nagpur – 440016 </p>
          <p>Contact : +919970427534</p>
        </div>
        <div className="donation-text">
          <p>DONATIONS EXEMPTED UNDER 80 G VIDE ORDER NO.</p>
          <p>ITBA/EXM/S/80G/2019-20/1018507999(1).</p>
        </div>
        <div className="date me-3">
          <p>Date: {date}</p>
          <p>NO. {getReceiptNumber()}</p>
        </div>
        <div className="receipt text-center">
          <b>
            <u>RECEIPT</u>
          </b>
        </div>
        <div className="receipt-text mt-5">
          <p>
            Received with THANKS from <b>Mrs/Miss./Mr {name}</b>
          </p>
          <p>
            Sum of Rupees {amountInWords} by {paymentMethod} dated {date}.
          </p>
        </div>
        <div className="amount-container">
          <div>Rs. </div>
          <div className="amount-round-container">
            <span>{amount} /-</span>
          </div>
        </div>
        <div className="subject-to-realization mt-4">* Subject to realization of Cheque / DD</div>

        <div className="sign-container me-3">
          <img src={sign} alt="sign" width={250} height={100} />
          <p className="mt-3">For RISING INFINITELY FOR SOCIAL EMPOWERMENT</p>
        </div>
      </div>
    </>
  );
}

export default App;
