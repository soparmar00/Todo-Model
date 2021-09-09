import React, { useState, useEffect}  from 'react'
import { Button,  Modal, Form,} from 'react-bootstrap';
import { useDispatch, useSelector} from "react-redux";
import { addTodo, CompleteTodo, deleteTodo, editTodo, selectTodo, setTask } from '../Redux/action';
import cuid from 'cuid'

const Todos = () => {

  const [show, setShow] = useState(false);
  const [model, setModel] = useState("Submit")
  const [select, setSelect] = useState(false)

  const result = useSelector((state) => state.todos.todoData)
  const data = useSelector((state) => state.todos.tasks)
  const com = useSelector((state) => state.todos.complete)

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
    console.log(e.target)
    dispatch(setTask({ ...data, [name]: value}));
  }
    

  const handleSubmit = (e) => {
    e.preventDefault()
    if(data.id){
      dispatch(editTodo({...data, edit: new Date().toLocaleString() + ""}))
    }
    else{
      dispatch(addTodo({ ...data, id: cuid() , create: new Date().toLocaleString() + "" }))
    }
    handleClose()
  }

  const handleEdit = (fields) => {
    console.log(fields)
      dispatch(setTask(fields))
      setModel("Edit")
      handleShow()
    }


  const handleDeleteTodo = (id) => {
    console.log(id)
    dispatch(deleteTodo(id))
  }

  const handleComplete = (fields) => {
      console.log(fields)
      dispatch(CompleteTodo(fields))
  }

    // const handleSelect = (e,id) => {
    //     console.log(select, id)
    //     const {name, checked} = e.target
    //     setSelect({...select, [name]: checked})
    //     dispatch(selectTodo({select, id}))
    // }



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

                {data ? 
                <Form onSubmit={handleSubmit} >
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" name='title' defaultValue={data.title} placeholder="Enter Title" onChange={handleChange}/>
                  </Form.Group>
   
                  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} defaultValue={data.dis} name='dis'onChange={handleChange}/>
                  </Form.Group>
    
                  <center>
                    <Button variant="primary" type="submit">Submit</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                  </center>

                </Form> : ''}

              </Modal.Body>
            </Modal>
          </div>

          <br />
            <span>
              <div style={{ textAlign:"left"}}>
                <form>
                  <h3>Todo List</h3>
                    <div> 
                      <br />
                        <ul style={{listStyle: "none"}}>
                          {result.map((fields) => 
                            <div>
                              <input type="checkbox" name='select' ></input>
                                <span>
                                  <li>
                                    <span onClick={() =>handleEdit(fields)}><h6>{fields.title}</h6></span>
                                    <Button variant="danger" onClick={() => handleDeleteTodo(fields.id)}>Delete</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <Button variant="success" onClick={() => handleComplete(fields)}>Compelte</Button>
                                    <br />
                                  </li>
                                </span>
                            </div>
                            )}
                        </ul>
                        <br />
                    </div>
                  </form>    
                  <br />
              </div>
              <div style={{ textAlign:"left"}}>
                {com ? 
                  <div>
                    <h3>Compelte Todo</h3>
                      {com.map((fields) => 
                      <h6>{fields.title}</h6>
                      )}
                  </div>
                  : '' }
    
              </div>
            </span>
    
    </div>
    )
}


export default Todos
