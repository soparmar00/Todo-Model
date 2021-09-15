import React, { useState, useEffect}  from 'react'
import { Button,  Modal, Form,} from 'react-bootstrap';
import { useDispatch, useSelector} from "react-redux";
import { addTodo, completeTodo, copy_todo, deleteTodo, editTodo, removeUn, selectTodo, setTask, uncomplete } from '../Redux/action';
import cuid from 'cuid'
import './style.css'

const Check = () => {

  const [show, setShow] = useState(false);
  const [model, setModel] = useState("Submit")
  const [select, setSelect] = useState()
  const [completeSel, setCompleteSel] = useState()

  const result = useSelector((state) => state.todos.todoData)
  const data = useSelector((state) => state.todos.tasks)
  const sel = useSelector((state) => state.todos.select)
  const complete = useSelector((state) => state.todos.complete)
  const copyData = useSelector((state) => state.todos.copyData)

  const dispatch = useDispatch();

  const created = JSON.parse(localStorage.getItem('Created At'))
  const edited = JSON.parse(localStorage.getItem('Edited At'))
  const completed = JSON.parse(localStorage.getItem('Completed At'))


  useEffect(() => {
      setSelect(
        result.map((data) => {
            return{
                set : false,
                title: data.title,
                id: data.id
            }
        })
    );
  }, [result])

  useEffect(() => {
      setCompleteSel(
        complete.map((data) => {
            return{
                set : false,
                title: data.title,
                id: data.id,
                dis: data.dis,
            }
        })
    );
  }, [complete])

  useEffect(() => {
      dispatch(selectTodo(select))
  }, [select])



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
      dispatch(editTodo({...data, edit: new Date().toLocaleString() + ""}))
    }
    else{
      dispatch(addTodo({ ...data, id: cuid() , create: new Date().toLocaleString() + "" }))
    }
    handleClose()
  }

  const handleEdit = (fields) => {
      dispatch(setTask(fields))
      setModel("Edit")
      handleShow()
    }

const handleDelete = (sel) => {
    let id = []
    sel.map((del) => {
        if(del.set) {
            id.push(del.id)
        }
        return del
    }) 
    dispatch(deleteTodo(id))
} 

const handleComplete = (sel) => {
    let completeData = []
    sel.map((del) => {
        if(del.set) {
            completeData.push(del.id)
        }
        return del
    })  

    const cData = result.filter(data => completeData.includes(data.id))
    cData.map((data) => {data.complete = new Date().toLocaleString() + "" ; return data})
    dispatch(completeTodo({comD: cData}))
    handleDelete(sel)
}

  const handleCopy = (sel) => {
    let copy = []
    sel.map((del) => {
        if(del.set) {
            copy.push(del)
        }
        return del;
    })  
    dispatch(copy_todo(copy))
  }

  const handleUncomplete = (completeSel) => {
    let returnData = []
    completeSel.map((re) => {
        if(re.set) {
            returnData.push(re)
        }
        return re
    })
    dispatch(uncomplete(returnData)) 
    handleUncompleteRemove(completeSel) 
  }

  const handleUncompleteRemove = (completeSel) => {
    let returnId = []
    completeSel.map((re) => {
        if(re.set) {
            returnId.push(re.id)
        }
        return re
    })
    dispatch(removeUn(returnId))  
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
              <div style={{float: 'left', paddingLeft: 70}} >
                
                  <h3>Todo List</h3>
                    <div> 
                      <br />
                        <ul style={{listStyle: "none"}}>
                          {result.map((fields) => 
                            <div >
                              <input type="checkbox" onChange={event => {
                               let checked = event.target.checked;
                                setSelect(
                                  select.map(data => {
                                    if (fields.id === data.id) {
                                        data.set = checked;
                                      }
                                    return data;
                                  })
                                );
                          }}></input>       
                          <div class="dropdown">
                            <li>
                              <span  onClick={() =>handleEdit(fields)}><h6>{fields.title}</h6></span>
                            </li>
                              <div class="dropdown-content">
                                {created.map((his) => {
                                  if(fields.id === his.id){
                                    return <p>Created At : {his.create}</p>;
                                    }
                                    return ''
                                  }  
                                )}

                                {edited ? edited.map((his) => {
                                  if(fields.id === his.id){
                                    return <p>Edited At : {his.edit}</p>;
                                    }
                                    return ''
                                  }  
                                ) : ''}
                              </div>
                          </div>
                          </div>
                          )}
                        </ul>
                      <br />
                    </div>
                      
                  <br />
                  <Button variant="danger" onClick={() => handleDelete(sel)}>Delete</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                  <Button variant="success" onClick={() => handleComplete(sel)}>Complete</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                  <Button variant="warning" onClick={() => handleCopy(sel)}>Copy</Button>
              </div>

            <div style={{float: 'right', paddingRight: 200}} >
              <h3>Compelte Todo</h3>
               <br />
                <ul style={{listStyle: "none"}}>                    
                  {complete.map((fields) =>
                  <div>
                    <input type="checkbox" onChange={event => {
                      let checked = event.target.checked;
                      setCompleteSel(
                        completeSel.map(data => {
                          if (fields.id === data.id) {
                          data.set = checked;
                          }
                          return data;
                        })
                     );
                  }}>
                </input>
                  <div class="dropdown">
                    <span>
                      <li>
                        <h6>{fields.title}</h6>
                      </li>
                    </span>
                    <div class="dropdown-content">
                      {created.map((his) => {
                        if(fields.id === his.id) {
                          return <p>Created At : {his.create}</p>;
                        }
                        return ''
                        }  
                      )}
                      
                      {edited ? edited.map((his) => {
                          if(fields.id === his.id) {
                              return <p>Edited At : {his.edit}</p>;
                          }
                          return ''
                        }  
                      ): ''}
    
                      {completed.map((his) => {
                          if(fields.id === his.id) {
                              return <p>Created At : {his.complete}</p>;
                          }
                          return ''
                        }  
                      )}
    
                    </div>
                  </div>
                  </div>
   
                  )}   
                </ul>
                  <Button variant="secondary" onClick={() => handleUncomplete(completeSel)}>Uncomplete</Button>&nbsp;&nbsp;&nbsp;&nbsp;
            </div>
            <div style={{float: 'right', paddingRight: 300}} >
              <h3>Copy Todos</h3>
                <br />
                  <ul style={{listStyle: "none"}}>  
                    {copyData ? copyData.map((fields) =>       
                      <li>
                        <h6>Copy of "{fields.title}"</h6>
                      </li>) : ''
                    }
                  </ul>
            </div>
        </span>
    </div>
    )
}


export default Check;