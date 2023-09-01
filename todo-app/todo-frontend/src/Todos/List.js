import React from 'react'
import Todo from './Todo'

const TodoList = ({ todos, deleteTodo, completeTodo }) => {
  return (
    <>
      {todos.map((todo, index, array) => (
        <React.Fragment key={todo._id}>
          <Todo
            key={todo._id}
            todo={todo}
            deleteTodo={deleteTodo}
            completeTodo={completeTodo}
          />
          {index !== array.length - 1 && <hr key={`hr-${todo._id}`} />}
        </React.Fragment>
      ))}
    </>
  )
}

export default TodoList
