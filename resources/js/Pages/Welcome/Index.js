import React,{useState} from 'react';
import {Button, Row, Col, Toast, Form,Card,Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {getTokenCustom, onMessageListener} from "./firebase";
import CSRFInput from "@ueaweb/laravel-react-csrf-input";
import axios from "axios";
export default function Index() {


    const [title,setTitle]=useState("");
    const [body,setBody]=useState("");
    const [show, setShow] = useState(false);
    const [notification, setNotification] = useState({title: '', body: ''});
    const [isTokenFound, setTokenFound] = useState(false);
    getTokenCustom(setTokenFound);
    onMessageListener().then(payload => {
        setShow(true);
        setNotification({title: payload.notification.title, body: payload.notification.body})
        console.log(payload);
    }).catch(err => console.log('failed: ', err));
    const myToken = document.head.querySelector('meta[name="csrf-token"]').getAttribute('content');
    const submit =()=>{
        if(title&&body){
            axios({
                method: 'post',
                url: 'http://localhost:8000/notify',
                data: {
                    _token:myToken,
                    title: title,
                    body:body
                }
            });
        }
    }
    return (
        <Container>
            <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide animation style={{
                position: 'absolute',
                top: 500,
                right: 20,
            }}>
                <Toast.Header>
                    <img
                        src="https://www.alliedmarketresearch.com/assets/images/AMR-logo.png"
                        className="rounded mr-2"
                        alt=""
                    />
                    <strong className="mr-auto">{notification.title}</strong>
                    &nbsp;<small className={"ml-3"}>just now</small>
                </Toast.Header>
                <Toast.Body>{notification.body}</Toast.Body>
            </Toast>
            <Row>
                <Col centered>
            <Card className={"justify-content-md-center m-5"}>
            <Form className="p-3">
                <CSRFInput token={myToken} />
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Title</Form.Label>
                    <Form.Control  type="text" value={title} onChange={(e=>setTitle(e.target.value))} placeholder="Enter Title" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Message</Form.Label>
                    <Form.Control as="textarea" value={body} onChange={(e=>setBody(e.target.value))}  rows={3} name={"body"} />
                </Form.Group>
                    <Button className="ml-auto" type={"button"} onClick={submit}>Submit</Button>
            </Form>
            </Card>
                </Col>
            </Row>
        </Container>
    );
}
