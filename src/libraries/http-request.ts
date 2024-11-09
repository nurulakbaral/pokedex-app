import axios from 'axios'

const BASE_URL = 'https://pokeapi.co/api/v2'

export const httpRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})
