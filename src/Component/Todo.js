import React, { useState, useEffect}  from 'react'
import { Button,  Modal, Form,} from 'react-bootstrap';
import { useDispatch, useSelector} from "react-redux";
import { addTodo, editTodo, setTask } from '../Redux/action';
import cuid from 'cuid'

const Todo = () => {

    const [show, setShow] = useState(false);
    const [model, setModel] = useState("")

    const result = useSelector((state) => state.todos.todoData)
    const data = useSelector((state) => state.todos.tasks)

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
        dispatch(setTask({ ...data, [name]: value}));
  }
    

    const handleSubmit = (e) => {
        e.preventDefault()
        if(data.id){
            dispatch(editTodo({...data}))
        }
        else{
            dispatch(addTodo({ ...data, id: cuid() }))
        }
        handleClose()
    }

    const handleEdit = (fields) => {
        console.log(fields)
        dispatch(setTask(fields))
        setModel("Edit")
        handleShow()
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
    <Form.Control type="text" name='title' defaultValue={data.title} placeholder="Enter Title" onChange={handleChange}/>
    </Form.Group>
    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
    <Form.Label>Description</Form.Label>
    <Form.Control as="textarea" rows={3} defaultValue={data.des} name='des'onChange={handleChange}/>
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
    <br />
    <div>
    {result.map((fields) => 
    <div>
    <span onClick={() =>handleEdit(fields)}><h6>{fields.title}</h6></span>
    <br />
    </div>
    )}
    </div> 
    </div>
    </div>
    )
}


export default Todo
