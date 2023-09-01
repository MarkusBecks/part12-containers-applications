import axios from 'axios'

const defaultBackendURL = 'http://localhost:3001'

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL || defaultBackendURL,
})

export default apiClient
