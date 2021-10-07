import {Button, Row, Col, Card, Modal, Form, Badge, CloseButton} from 'react-bootstrap';
import {useState} from "react";


function Memos({logout, handleCreateMemo, memos, handleDeleteMemo}) {
    const [show, setShow] = useState(false);
    const [content, setMemoText] = useState('');
    const [memoTags, setTags] = useState('');
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function handleSubmit(event) {
        event.preventDefault()
        console.log({content, memoTags})
        const tags = memoTags.split(',')
        handleCreateMemo({content, tags})
        handleClose()
    }

    function handleTextChange(event) {
        setMemoText(event.target.value)
    }

    function handleTagsChange(event) {
        setTags(event.target.value)
    }


    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New Memo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Memo text</Form.Label>
                            <Form.Control type="text" placeholder="Enter your memo here" onChange={handleTextChange}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Tags</Form.Label>
                            <Form.Control type="text" placeholder="Tag1, Tag2, ..." onChange={handleTagsChange}/>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
            <Row className='mt-3'>
                <Col><h1>Welcome!</h1></Col>
                <Col xs='auto'>
                    <Button variant="success" onClick={handleShow}>New memo</Button>
                </Col>
                <Col xs='auto'>
                    <Button variant="outline-primary" onClick={logout}>Logout</Button>
                </Col>
            </Row>
            <Row className='mt-3 text-center'>
                <Col>
                    <h3>View your current memos or create a new one!</h3>
                </Col>
            </Row>
            <Row>
                {
                    memos.map(memo => {
                        return (
                            <Card style={{width: '18rem'}}>
                                <Card.Body>
                                    <Card.Title>
                                        <strong>{memo.create_timestamp.slice(0,10)}</strong><CloseButton className='float-sm-end' onClick={() => handleDeleteMemo(memo)}/>
                                    </Card.Title>
                                    <Card.Subtitle className='text-center'>
                                        {memo.content}
                                    </Card.Subtitle>
                                </Card.Body>
                                <Card.Footer>
                                    {memo.tag ? memo.tag.map(tag => {
                                        return (
                                            <Badge bg='secondary'>{tag}</Badge>
                                        )
                                    }) :
                                        console.log('no tags')
                                    }
                                </Card.Footer>
                            </Card>
                        )
                    })
                }
            </Row>
        </>
    );
}

export default Memos;
