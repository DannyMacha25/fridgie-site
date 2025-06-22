import { Container, Image, Row, Col, Card, Button} from "react-bootstrap"
import ItemCard from './components/ItemCard'
import banner from "./assets/fridgie_black_banner.png"

import type { Item } from "./interfaces"
import './Welcome.css'
import { useState } from "react"

const GoogleForm = () => {
    return (
        <iframe src="https://docs.google.com/forms/d/e/1FAIpQLScjLgBftIuaet5t51eT-RC7lAWJFx9d6SuNwaaKRqcLbNKlyw/viewform?embedded=true" 
        width="100%" height="400">Loading…</iframe>
    );
}

const testItem : Item = {
    id: 1,
    name: 'Cheese',
    expirationDate: '2025-06-30',
    purchaseDate: '',
    quantity: 1,
    upc: '',
    category: 'Dairy',
    storageLocationId: 1
}

const testItem2 : Item = {
    id: 1,
    name: 'Milk',
    expirationDate: '2025-06-25',
    purchaseDate: '',
    quantity: 1,
    upc: '',
    category: 'Dairy',
    storageLocationId: 1
}

const Spacer = () => {
    return (
        <Row className="mt-2"></Row>
    )
}

const ExamplePhone = () => {

    return (
        <div className="phone">
            <div className="phone-pill mb-3"/>
            <Container className="phone-content">
                <ItemCard item={testItem} />
                <ItemCard item={testItem2} />
                <ItemCard item={testItem2} />
                <ItemCard item={testItem2} />
                <ItemCard item={testItem2} />
                <ItemCard item={testItem2} />
                <ItemCard item={testItem2} />
                <ItemCard item={testItem2} />
                <ItemCard item={testItem2} />
            </Container>
        </div>
    )
}

const InputMethodsInfromation = () => {
    const [currSelected, setCurrSelected] = useState<string>('Receipt')
    
    const msgReceipt = 'Receipt scanning is the fastest way to input your new foods into Fridgie. All you need to do is grab all of your store receipts and scan it using the camera function inside of the Fridgie App. From there, Fridgie will do its best to read the receipt and enter all the items for you!'
    const msgBarcode = 'Barcode scanning is an easy way of getting your food into Fridgie! All you need to do is open the barcode scanning function in Fridgie and position the barcode of the item in your phone\'s camera.'
    const msgManual = 'Manual entry is the classic way of entering information. You will be prompted for information about the food and enter it to the best of your ability.'

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
                <Col className="d-flex justify-content-center"> <Button className={currSelected == 'Receipt' ? 'selected' : 'unselected'} onClick={ReceiptPressed} style={{width: '50%'}}>Receipt Scan</Button> </Col>
                <Col className="d-flex justify-content-center"> <Button className={currSelected == 'Barcode' ? 'selected' : 'unselected'} onClick={BarcodePressed} style={{width: '50%'}}>Barcode Scan</Button> </Col>
                <Col className="d-flex justify-content-center"> <Button className={currSelected == 'Manual' ? 'selected' : 'unselected'} onClick={ManualPressed} style={{width: '50%'}}>Manual Entry</Button> </Col>
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

            <Row className="mt-5 mb-5">
                <Col xs={2}>
                </Col>
                <Col xs={5} className="colA">
                    <Row>
                        <p className="info-title">Control Your Fridge </p>
                    </Row>
                    <Row className="justify-content-start mt-5 info-text" style={{height: '70%', width:'90%'}}>
                        <p className=" mt-4"
                        style={{width: '90%'}}>
                            Fridgie is an all new and exciting way to take control of your fridge or pantry! Say no more to expired items, ordering pricey food, and overspending.
                        </p>
                    </Row>
                </Col>
                <Col className='colB' style={{ flex: '1 1 auto', width: 'auto' }}>
                    <ExamplePhone />
                </Col>
                <Col xs={2}>
                </Col>

            </Row>

            <Spacer />
            <Spacer />
            {/* Input Methods */}
            <Row className="mt-5 mb-5">
                <Col xs={2}>
                </Col>
                <Col>
                    <Row> <p className="info-title">New Ways to Track Your Food</p> </Row>
                    <Row> <p className="info-text">The team developing Fridgie is working hard to make your experience as easy and convenient as possible for ever type of user! Look below to find out more about how you will be able to use Fridgie in different ways!</p></Row>
                </Col>
                <Col xs={2}>
                </Col>
            </Row>

            <Row className="mt-5 mb-5">
                <Col xs={2}></Col>
                <Col>
                    <InputMethodsInfromation />
                </Col>
                <Col xs={2}></Col>
            </Row>

            <Spacer />
            <Spacer />
            
            {/*Survey*/}
            <Row className="mt-5 mb-5">
                <Col xs={2}>
                </Col>
                <Col>
                    <Row> <p className="info-title">Stay Updated</p> </Row>
                    <Row> <p className="info-text">Fridgie is still under development. and we are all currently making it the best we possibly can for you. For now, please fill out this form to stay updated and to voice your opinion on features you'd like to see!</p></Row>
                </Col>
                <Col xs={2}>
                </Col>
            </Row>

            <Row className="survey">
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