import axios from 'axios'

const defaultBackendURL = 'http://localhost:3001/api/persons'

const baseUrl = process.env.REACT_APP_BACKEND_URL || defaultBackendURL

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject)
  return request.then((response) => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then((response) => response.data)
}

const destroy = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then((response) => response.data)
}

const personService = {
  getAll,
  create,
  update,
  destroy,
}
export default personService
