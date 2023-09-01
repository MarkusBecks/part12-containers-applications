import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import Todo from '../Todos/Todo'

describe('Todo Component Tests', () => {
  const sampleTodo = {
    _id: '1',
    text: 'Sample Todo',
    done: false,
  }

  it('renders a todo with text', () => {
    render(<Todo todo={sampleTodo} />)
    const todoText = screen.getByText('Sample Todo')
    expect(todoText).toBeInTheDocument()
  })

  it('renders a todo as not done', () => {
    render(<Todo todo={sampleTodo} />)
    const notDoneText = screen.getByText('This todo is not done')
    expect(notDoneText).toBeInTheDocument()
  })

  it('calls deleteTodo when delete button is clicked', () => {
    const deleteTodoMock = jest.fn()
    render(<Todo todo={sampleTodo} deleteTodo={deleteTodoMock} />)
    const deleteButton = screen.getByText('Delete')
    fireEvent.click(deleteButton)
    expect(deleteTodoMock).toHaveBeenCalledWith(sampleTodo)
  })
})
