const redis = require('redis')
const { promisify } = require('util')
const { REDIS_URL } = require('../util/config')

let getAsync
let setAsync

if (!REDIS_URL) {
  const redisIsDisabled = () => {
    console.log('No REDIS_URL set, Redis is disabled')
    return null
  }
  getAsync = redisIsDisabled
  setAsync = redisIsDisabled
} else {
  const client = redis.createClient({
    url: REDIS_URL,
  })

  console.log('Redis is enabled')

  getAsync = promisify(client.get).bind(client)
  setAsync = promisify(client.set).bind(client)
}

/* async function initializeRedisKeys() {
  // Init added_todos with an initial val of 0
  await setAsync('added_todos', 0)
}

initializeRedisKeys() */

module.exports = {
  getAsync,
  setAsync,
}
