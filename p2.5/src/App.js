import { useEffect, useState } from "react";
import "./App.css";
import { useAddTodoMutation, useDeleteTodoMutation, useGetTodosQuery, useUpdateTodoMutation } from "./features/api/apiSlice";

function App() {
  const [todo, setTodo] = useState("");
    // rename "data" as "todos"
  const { data: todos, isLoading, isSuccess, isError, error } = useGetTodosQuery()
  const [addTodo] = useAddTodoMutation()
  const [updateTodo] = useUpdateTodoMutation()
  const [deleteTodo] = useDeleteTodoMutation()
  
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todo) {
      // logic to add todo using RTK Query
      addTodo({title:todo, completed:false})
      setTodo("");
    }
  };
  const [content, setContent] = useState("")


  useEffect(()=>{
    console.log("==>",todos, isLoading, isSuccess)
    let buff=<p></p>
    if(isLoading){
      buff = <p>Loading...</p>
    }else if(isSuccess){
      buff = todos.map((todo)=>
        <li className={todo.completed ? "checked" : ""} key={`${todo.id}-${todo.title}`} onClick={()=>updateTodo({...todo,completed:!todo.completed})}>
            {todo.title}
            <span className="close" onClick={()=>deleteTodo({id:todo.id})}>x</span>
        </li>
      )  
    }else if(isError){
      buff=<p>error</p>
    }
    setContent(buff)
  },[todos])

  return (
    <div className="App">
      <div className="header">
        <form onSubmit={handleSubmit}>
          <h2>My To Do List</h2>
          <input
            type="text"
            placeholder="Your Todo"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <button className="addBtn" type="submit">
            Add
          </button>
        </form>
      </div>
      <ul>

        {content}

      </ul>
    </div>
  );
}

export default App;
