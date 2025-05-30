import { Container, Image, Row, Col} from "react-bootstrap"
import banner from "./assets/fridgie_black_banner.png"

import './Welcome.css'

const GoogleForm = () => {
    return (
        <iframe src="https://docs.google.com/forms/d/e/1FAIpQLScjLgBftIuaet5t51eT-RC7lAWJFx9d6SuNwaaKRqcLbNKlyw/viewform?embedded=true" 
        width="100%" height="400">Loading…</iframe>
    );
}

function Welcome() {
    return (
        <Container className="justify-content-center align-items-center" fluid>
            {/* Logo Banner*/}
            <Row className="mt-5 logo">
                <Col xs={1} lg={4}/>
                <Col xs={10} lg={4}>
                    <Image width={"100%"} height={"100%"} fluid src={banner} />
                </Col>
                <Col xs ={1} lg={4}/>
                    
            </Row>
            
            
            <Row className="mt-3 mb-5 slogan">
                <Col md={1} lg={4}/>
                <Col md={10} lg={4} className="text-center">
                    <span>
                        The future of food tracking and saving{' '}
                        <span className="text-success">money</span>
                    </span>
                </Col>
                <Col md={1} lg={4}/>
            </Row>

            <Row className="survey">
                <Col xs={0} lg={2}/>
                <Col xs={12} lg={8}>
                    <GoogleForm />
                    <p className="mt-5 text-center text-muted">{"(c) Fridgie LLC. 2025"}</p>
                </Col>
                <Col xs={0} lg={2}/>
            </Row>
                    
        </Container>
    )
}

export default Welcome