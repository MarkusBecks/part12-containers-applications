const express = require('express')
const { Todo } = require('../mongo')
const { incrementCounter } = require('../util/todoCounter')
const { getAsync } = require('../redis')
const router = express.Router()

/* GET todos listing. */
router.get('/', async (_, res) => {
  console.log('GET ALL ROUTE')
  const todos = await Todo.find({})
  res.send(todos)
})

router.get('/statistics', async (req, res) => {
  const addedTodos = await getAsync('added_todos')
  const statistics = {
    added_todos: addedTodos || 0,
  }
  res.status(200).json(statistics)
})

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  })
  await incrementCounter()
  res.send(todo)
})

const singleRouter = express.Router()

const findByIdMiddleware = async (req, res, next) => {
  console.log('findByIdMiddleware is called')
  const { id } = req.params
  console.log('id: ', id)
  console.log('type of id: ', typeof id)
  req.todo = await Todo.findById(id)
  console.log('req.todo: ', req.todo)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()
  res.sendStatus(200)
  console.log('deleted')
})

/* GET todo. */
/* singleRouter.get('/', async (req, res) => {
  res.send(req.todo)
}) */
singleRouter.get('/', async (req, res) => {
  try {
    res.status(200).send(req.todo)
  } catch (error) {
    console.error(error)
    res.status(500).send({ message: 'Internal server error' })
  }
})

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const { text, done } = req.body // Extract updated data from the req.body

  // Update the todo with new data
  req.todo.text = text
  req.todo.done = done

  try {
    // Save the updated todo
    const updatedTodo = await req.todo.save()

    res.status(200).send(updatedTodo) // Send the updated todo as res
  } catch (error) {
    res.status(500).send(error)
  }
})

router.use('/:id', findByIdMiddleware, singleRouter)

module.exports = router
