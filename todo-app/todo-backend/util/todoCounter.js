const { setAsync, getAsync } = require('../redis')

async function incrementCounter() {
  try {
    const currentValue = await getAsync('added_todos')
    const incrementedValue = Number(currentValue) + 1
    await setAsync('added_todos', incrementedValue)
  } catch (error) {
    console.error('Error incrementing the counter:', error)
  }
}

module.exports = { incrementCounter }
