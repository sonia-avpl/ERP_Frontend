import axios from 'axios'

const ApiService = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
})

ApiService.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// ❗ Global error handler (response interceptor)
ApiService.interceptors.response.use(
  (response) => response,
  (error) => {
    // Example: handle 401 errors globally
    if (error.response && error.response.status === 401) {
      console.warn('Unauthorized, redirecting to login...')
      // Optionally redirect or clear storage
    }
    return Promise.reject(error)
  }
)

export default ApiService
