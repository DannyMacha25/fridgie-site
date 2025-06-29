import { Container, Image, Row, Col, Card, Button, Form} from "react-bootstrap"
import ItemCard from './components/ItemCard'
import banner from "./assets/fridgie_black_banner.png"
import { UpcScan, PencilSquare, Camera } from "react-bootstrap-icons"

import type { Item } from "./interfaces"
import './Welcome.css'
import { useState } from "react"
import api from "./services/api"



const GoogleForm = () => {
    return (
        <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSeg2ESQ60xgF59fJ6qIIiOYOm6vRvPeHHU8DTsXgMemq1nRFw/viewform?embedded=true" 
        width="100%" height="400">Loading…</iframe>
    );
}

type Category = 'Dairy' | 'Produce' | 'Grain' | 'Protein' | 'Frozen' | 'Non-Perishable';

function generateRandomProduct(): Item {
  const categories: Record<Category, string[]> = {
    Dairy: ['Milk', 'Cheese', 'Yogurt'],
    Produce: ['Apple', 'Carrot', 'Lettuce'],
    Grain: ['Bread', 'Rice', 'Pasta'],
    Protein: ['Chicken', 'Tofu', 'Eggs'],
    Frozen: ['Frozen Pizza', 'Ice Cream', 'Frozen Vegetables'],
    'Non-Perishable': ['Canned Beans', 'Pasta Sauce', 'Cereal'],
  };

  const categoryKeys = Object.keys(categories) as Category[];
  const randomCategory = categoryKeys[Math.floor(Math.random() * categoryKeys.length)];
  const items = categories[randomCategory];
  const randomItem = items[Math.floor(Math.random() * items.length)];

  const id = Math.floor(Math.random() * 100000);
  const quantity = Math.floor(Math.random() * 10) + 1;

  const today = new Date();
  today.setDate(today.getDate() - 2)
  const expirationOffset = Math.floor(Math.random() * 25); // Up to 14 days
  const expirationDate = new Date(today.getTime() + expirationOffset * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0];

  return {
    id,
    name: randomItem,
    expirationDate,
    quantity,
    category: randomCategory
  };
}

const Spacer = () => {
    return (
        <Row className="mt-2"></Row>
    )
}

const ExamplePhone = () => {
    const products = Array.from({length : 18}, () => generateRandomProduct()).sort((a, b) => {
        return new Date(a.expirationDate ? a.expirationDate : Date.now()).getTime() - new Date(b.expirationDate ? b.expirationDate : Date.now()).getTime()
    })
    const itemList = products.map((item) => {
        return (<ItemCard item={item}/>)
    })

    return (
        <div className="phone">
            <div className="phone-pill mb-3"/>
            <Container className="phone-content">
                {itemList}
            </Container>
        </div>
    )
}

const InputMethodsInfromation = () => {
    const [currSelected, setCurrSelected] = useState<string>('Receipt')
    
    const msgReceipt = 'Receipt scanning is the fastest way to input your new foods into Fridgie. All you need to do is grab all of your store receipts and scan it using the camera function inside of the Fridgie App. From there, Fridgie will do its best to read the receipt and enter all the items for you!'
    const msgBarcode = 'Barcode scanning is an easy way of getting your food into Fridgie! All you need to do is open the barcode scanning function in Fridgie and position the barcode of the item within your phone\'s camera.'
    const msgManual = 'Manual entry is the classic way of entering information. You will be prompted for information about the food and then you enter it to the best of your ability.'

    const ReceiptPressed = () => {
        setCurrSelected('Receipt')
    }

    const BarcodePressed = () => {
        setCurrSelected('Barcode')
    }

    const ManualPressed = () => {
        setCurrSelected('Manual')
    }

    return (
        <Container fluid className="">
            <Row>
                <Col xs={12} md={4} className="d-flex justify-content-center"> <Button className={currSelected == 'Receipt' ? 'selected' : 'unselected'} onClick={ReceiptPressed} style={{width: '50%'}}> <Camera /> Receipt Scan </Button> </Col>
                <Col xs={12} md={4} className="mt-2 mt-md-0 d-flex justify-content-center"> <Button className={currSelected == 'Barcode' ? 'selected' : 'unselected'} onClick={BarcodePressed} style={{width: '50%'}}><UpcScan /> Barcode Scan</Button> </Col>
                <Col xs={12} md={4} className="mt-2 mt-md-0 d-flex justify-content-center"> <Button className={currSelected == 'Manual' ? 'selected' : 'unselected'} onClick={ManualPressed} style={{width: '50%'}}><PencilSquare /> Manual Entry </Button> </Col>
            </Row>
            <Row>
                <Col className="d-flex justify-content-center mt-2 function-info-container">
                    <p className="info-text m-2">
                        { currSelected == 'Receipt' ? msgReceipt : currSelected == 'Barcode' ? msgBarcode : msgManual  }
                    </p>
                </Col>
            </Row>
        </Container>
    )
}

const NewsletterPrompt = () => {
    const [email, setEmail] = useState<string>('')
    const [disableInput, setDisableInput] = useState<boolean>(false)
    const [emailSubmitted, setEmailSubmitted] = useState<boolean>(false)
    const [errorSubmittingEmail, setErrorSubmittingEmail] = useState<boolean>(false)

    const updateInput = (e : React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const subscribeButton = (e : any | undefined) => {
        e.preventDefault()
        
        if (!email.includes('@')) {
            setErrorSubmittingEmail(true)
            return
        }

        
        setDisableInput(true)
        api.subscribeToNewsletter(email)
            .then(data => {
                console.log(data)
                setEmailSubmitted(true)
            })
            .catch(err => {
                console.log(err)
                setDisableInput(false)
                setErrorSubmittingEmail(true)
            })
    }

    return (
        <Card className="border-0 newsletter">
            <Card.Title className="text-center mb-0 mt-4"> <p className="info-subtitle">Want to keep in touch? </p></Card.Title>
            <Card.Body className="text-center mb-4"> 
                <p className="info-font">Enter your email here to subscribe to our newsletter and be one of the first to know when Fridgie releases!</p>
                {emailSubmitted ? (
                    <p className="info-success">Thank you for subscribing, we will reach out with any updates!</p>
                ):
                <Form className="mt-2">
                    <Row>
                        <Col xs={0} md={2}/>
                        <Col xs={12} md={6}><Form.Control disabled={disableInput}  value={email} onChange={updateInput} type='email' placeholder="name@example.com" /></Col>
                        <Col xs={12} md={2} className="mt-2 mt-md-0" ><Button variant='primary' disabled={disableInput} onClick={subscribeButton} type='submit'>Submit</Button></Col>
                        <Col xs={0} md={2}/>
                    </Row>
                    {errorSubmittingEmail ? <Row>
                        <p className="info-error mt-2">There has been an error, are you already subscribed? Or did you type in a bad email?</p>
                    </Row> : ""}
                    
                </Form>}
                
            </Card.Body>
        </Card>
    )
}

function Welcome() {
    return (
        <Container className="justify-content-center align-items-center" fluid>
            {/* Logo Banner*/}
            <Row className="mt-5 mb-5 logo">
                <Col xs={1} lg={4}/>
                <Col xs={10} lg={4}>
                    <Image width={"100%"} height={"100%"} fluid src={banner} />
                </Col>
                <Col xs ={1} lg={4}/>
                    
            </Row>
            
            
            {/*<Row className="mt-3 mb-5 slogan">
                <Col md={1} lg={4}/>
                <Col md={10} lg={4} className="text-center">
                    <span>
                        The future of food tracking and saving{' '}
                        <span className="text-success">money</span>
                    </span>
                </Col>
                <Col md={1} lg={4}/>
            </Row> */}

            <Row className="mt-2 mt-mb-5 mb-2 mb-md-5 content">
                <Col s={0} lg={2}>
                </Col>
                <Col s={10} lg={5} className="colA">
                    <Row>
                        <p className="info-title">Control Your Fridge </p>
                    </Row>
                    <Row className="justify-content-center justify-content-md-start mt-2 info-text mb-4" >
                        <Col>
                            <p className="ms-0 ms-md-2 mt-0 text-center info-text text-center text-start-md"
                            style={{width: '100%'}}>
                                Fridgie is an all new and exciting way to take control of your fridge or pantry! Say no more to expired items, ordering pricey food, and overspending.
                            </p>
                        </Col>
                    </Row>
                    <Row className="">
                        <NewsletterPrompt />
                    </Row>
                </Col>
                <Col className='d-none d-md-flex colB mt-5' style={{ flex: '1 1 auto', width: 'auto' }}>
                    <ExamplePhone />
                </Col>
                <Col s={0} lg={2}>
                </Col>

            </Row>

            <Spacer />
            <Spacer />
            {/* Input Methods */}
            <Row className="mt-2 mt-mb-5 mb-2 mb-md-5 content">
                <Col xs={0} md={2}>
                </Col>
                <Col>
                    <Row> 
                       <Col> <p className="info-title">New Ways to Track Your Food</p> </Col>
                    </Row>
                    <Row className="mt-2"> <p className="ms-0 ms-md-2 info-text">The team developing Fridgie is working hard to make your experience as easy and convenient as possible for ever type of user! Look below to find out more about how you will be able to use Fridgie in different ways!</p></Row>
                </Col>
                <Col xs={0} md={2}>
                </Col>
            </Row>

            <Row className="mt-2 mt-md-5 mb-5 content">
                <Col xs={0} md={2}></Col>
                <Col>
                    <InputMethodsInfromation />
                </Col>
                <Col xs={0} md={2}></Col>
            </Row>

            <Spacer />
            <Spacer />
            
            {/*Survey*/}
            <Row className="mt-2 mt-mb-5 mb-2 mb-md-5 content">
                <Col xs={0} md={2}>
                </Col>
                <Col>
                    <Row> <p className="info-title">Share Your Voice</p> </Row>
                    <Row className="info-text"> <p className="info-text ms-2">Fridgie is still under development. and we are all currently making it the best we possibly can for you. For now, please fill out this form to voice your opinion on features you'd like to see!</p></Row>
                </Col>
                <Col xs={0} md={2}>
                </Col>
            </Row>

            <Row className="content">
                <Col xs={0} lg={2}/>
                <Col xs={12} lg={8}>
                    <GoogleForm />
                    <p className="mt-5 text-center text-muted">{"(c) Fridgie LLC. 2025"}</p>
                </Col>
                <Col xs={0} lg={2}/>
            </Row>
                

            {/*
            <Row>
                <ItemCard item={testItem}/>
            </Row> */}
            {/*<Row className="survey">
                <Col xs={0} lg={2}/>
                <Col xs={12} lg={8}>
                    <GoogleForm />
                    <p className="mt-5 text-center text-muted">{"(c) Fridgie LLC. 2025"}</p>
                </Col>
                <Col xs={0} lg={2}/>
            </Row>*/}
                    
        </Container>
    )
}

export default Welcome