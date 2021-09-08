import React, { useState, useEffect}  from 'react'
import { Button,  Modal, Form,} from 'react-bootstrap';
import { useDispatch, useSelector} from "react-redux";
import { addTodo } from '../Redux/action';
import { Link } from "react-router-dom";
import cuid from 'cuid'

const Todo = () => {

    const [show, setShow] = useState(false);
    const [model, setModel] = useState("Submit")
    const [tasks, setTasks] = useState({title: '', description: ''});

    const result = useSelector((state) => state.todos.todoData)
    console.log(result)

    const dispatch = useDispatch();

    const handleClose = () => {
        setShow(false)
    }

    const handleShow = () => {
        setShow(true)
    };

    const handleButton = () => {
        setModel("Add Todo")
        handleShow()
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTasks({ ...tasks, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(tasks.title, tasks.description)
        dispatch(addTodo({  tasks, id: cuid() }))
        handleClose()
    }

    return (
    <div>
    <h1>Todo App</h1>
    <br />
    <Button variant="primary" type="submit" onClick={() => handleButton()}> Add Todo</Button>
    <div>
    <Modal show={show} onHide={handleClose}>
    <Modal.Header >
    <Modal.Title>{model}</Modal.Title>
    </Modal.Header>
    <Modal.Body>

    <Form onSubmit={handleSubmit} >
    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
    <Form.Label>Title</Form.Label>
    <Form.Control type="text" name='title' placeholder="Enter Title" onChange={handleChange}/>
    </Form.Group>
    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
    <Form.Label>Description</Form.Label>
    <Form.Control as="textarea" rows={3} name='description'onChange={handleChange}/>
    </Form.Group>
    
    <center>
    <Button variant="primary" type="submit">Submit</Button>&nbsp;&nbsp;&nbsp;&nbsp;
    <Button variant="secondary" onClick={handleClose}>Close</Button>
    </center>

    </Form>

    </Modal.Body>
    </Modal>
    </div>
      <br />
        <div>
        <h3>Todo List</h3>
        <div>
        {result.map((fields) => 
        <div>
        <Link to={`/`}>
        <span onClick={handleShow}><h6>{fields.tasks.title}</h6></span>
        </Link>
        <br />
        </div>
        )}
    </div>
    </div>
    </div>
    )
}


export default Todo
