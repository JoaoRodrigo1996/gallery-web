import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://gallery-server-api.onrender.com',
  withCredentials: true,
})
