import {useEffect, useState } from 'react'
import Navbaar from './components/Navbaar'
import { stringify, v4 as uuidv4 } from 'uuid';
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
 // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  useEffect(() => {
    let todostring = localStorage.getItem("todos")
    if(todostring){
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
   
    }, [])
  
  const saveTols =()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  }
  const addTodo = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    console.log(todos);
    saveTols()
  }
  const editTodo = (e,id) => {
    let t = todos.filter(item => {
      return item.id === id;
    }
    )
  
    console.log(id);
    console.log(t);
    setTodo(t[0].todo)
    let newtodos = todos.filter(item => {
      return item.id !== id;
    }
    )
    setTodos(newtodos)
    saveTols()
  }
  const deleteTodo = (e,id) => {
    console.log(id);
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    console.log(index);
    let newtodos = todos.filter(item => {
      return item.id !== id;
    }
    )
    setTodos(newtodos)
    saveTols()

  }
  const changeCheckbox = (e) => {
    let id = e.target.name;
    console.log(id);
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    console.log(index);
    let newtodos = [...todos];
    newtodos[index].isCompleted = !newtodos[index].isCompleted;
    setTodos(newtodos)
    saveTols()
  }
  const changeInput = (e) => {
    setTodo(e.target.value)
    // console.log(setTodo);
    
  }


  return (
    <>
      <Navbaar />
      <div className="container max-sm:h-full max-sm:w-full bg-blue-100 h-full mt-3 rounded-md max-sm:rounded-none w-[90vw] mx-auto">
        <div className='mx-auto '>
          <h1 className='text-2xl font-bold font-mono p-4'>List your todos</h1>
          <input className='w-1/2 py-1 mx-4' onChange={changeInput} value={todo} type="text" />
          <button onClick={addTodo} className='bg-violet-600 text-white font-bold py-1 px-6 m-2 rounded-md'>Add</button>
        </div>
        <div className="todos">

          <h2 className='m-4 text-xl '>your tasks:</h2>
          {todos.length === 0 && <div> N0 tasks to show</div>}
          {todos.map((item) => { return <div key={item.id} className="todo flex justify-between max-sm:flex-wrap w-1/2 ">
                <div className='flex'>
                  <input className=' mx-2 p-1' onChange={changeCheckbox} checked={item.isCompleted} type="checkbox" name={item.id} id="" />
                  <span className={item.isCompleted ? "line-through  rounded-md bg-violet-400 text-white max-sm:m-2 max-sm:w-[80vw] max-sm:p-2 m-2 p-2" : " bg-violet-400 text-white rounded-md m-4 p-2 max-sm:m-2 max-sm:w-[80vw] max-sm:p-2 "}>{item.todo}</span>
                </div>
                <div className='flex justify-center items-center max-sm:ml-14'>
                  <button onClick={(e) => { editTodo(e,item.id) }} className='bg-violet-600 text-white font-bold py-1   px-6  m-2 rounded-md'><CiEdit /></button>
                  <button onClick={(e) => { deleteTodo(e,item.id) }} className='bg-violet-600 text-white font-bold py-1 px-6 m-2 rounded-md'><MdDelete /></button>
                </div>
              </div>
            
          })}




        </div>
      </div>
    </>
  )
}

export default App
