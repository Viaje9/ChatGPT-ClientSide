import axios from 'axios'
console.log(import.meta.env.VITE_API_URL, '12321312312312312312');
const request = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 30000,
  withCredentials: true,
  
})

export default request