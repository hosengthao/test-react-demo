import {Button, Row, Col, Card, Modal, Form, Badge, CloseButton, Toast, ToastContainer, Spinner} from 'react-bootstrap';
import {useEffect, useState} from "react";
import LoadingMemo from "./LoadingMemo";


function Memos({
                   logout,
                   handleCreateMemo,
                   memos,
                   handleDeleteMemo,
                   getMemosPending,
                   getMemosFailure,
                   createMemoPending,
                   createMemoFailure,
                   deleteMemoFailure,
                   deleteMemoPending}) {

    const [show, setShow] = useState(false);
    const [content, setMemoText] = useState('');
    const [memoTags, setTags] = useState('');
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [showError, setShowError] = useState(false);
    const [showCreateMemoError, setShowCreateMemoError] = useState(createMemoFailure);
    const [showDeleteMemoError, setShowDeleteMemoError] = useState(deleteMemoFailure);


    useEffect(()=> {
        if(getMemosFailure) {
            setShowError(true)
        }
    }, [getMemosFailure])

    function handleSubmit(event) {
        event.preventDefault()
        console.log({content, memoTags})
        const tags = memoTags.split(',')
        handleCreateMemo({content, tags})
        handleClose()
    }

    useEffect(()=> {
        if(createMemoFailure) {
            setShowError(true)
        }
    }, [createMemoFailure])

    useEffect(()=> {
        if(deleteMemoFailure) {
            setShowError(true)
        }
    }, [deleteMemoFailure])

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
                {memos || !getMemosPending ?
                    memos.map(memo => {
                        return (
                            <Card style={{width: '18rem'}} bg=''>
                                <Card.Body key={memo.id}>
                                    <Card.Title>
                                        <strong>{new Date(memo.create_timestamp).toString().slice(0, 16)}
                                        </strong>
                                        <CloseButton className='float-sm-end' onClick={() => {handleDeleteMemo(memo)}}/>
                                    </Card.Title>
                                    <Card.Subtitle className='text-center'>
                                        {new Date(memo.create_timestamp).toString().slice(16, 21)}<br/>{memo.content}
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
                    }) :
                    <h2>Loading...</h2>
                }
            </Row>
            <ToastContainer className="p-3" position='bottom-end'>
                <Toast bg='danger' onClose={() => setShowError(false)} show={showError} delay={3000} autohide>
                    <Toast.Body className={'text.white'}>Error retrieving memos</Toast.Body>
                </Toast>
                <Toast bg='danger' onClose={() => setShowCreateMemoError(false)} show={showCreateMemoError} delay={3000} autohide>
                    <Toast.Body className={'text.white'}>Error creating memo</Toast.Body>
                </Toast>
                <Toast bg='danger' onClose={() => setShowDeleteMemoError(false)} show={showDeleteMemoError} delay={3000} autohide>
                    <Toast.Body className={'text.white'}>Error deleting memo</Toast.Body>
                </Toast>
            </ToastContainer>
            {createMemoPending && <LoadingMemo/>}
        </>
    );
}

export default Memos;
