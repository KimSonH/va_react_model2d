import axios from 'axios'

import { UrlApi } from './urlApi'

import { getAdminFromLocalStorage, removeAdminFromLocalStorage } from '@admin/components/hooks/useQueryAdmin'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true
})

let isRefreshing = false
let failedQueue: { resolve: (value: unknown) => void; reject: (reason?: unknown) => void }[] = []

const processQueue = (error: null, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })

  failedQueue = []
}

axiosInstance.interceptors.response.use(
  (response) => {
    const { data, config } = response

    if (data.http_status === 401) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject })
        })
          .then(() => {
            return axios({
              ...config,
              headers: {
                ...config.headers
              }
            })
          })
          .catch((err) => {
            return err
          })
      }

      isRefreshing = true

      return new Promise((resolve, reject) => {
        axios
          .get(UrlApi.GET_REFRESH, {
            baseURL: import.meta.env.VITE_API_URL,
            timeout: 30000,
            withCredentials: true
          })
          .then(({ data }) => {
            if (data.http_status === 401) {
              processQueue(data, null)
              const admin = getAdminFromLocalStorage()
              removeAdminFromLocalStorage()
              reject(data)
              if (data.http_status === 401 && admin) {
                location.reload()
              }
            } else {
              processQueue(null, data.token)
              resolve(
                axios({
                  ...config,
                  headers: {
                    ...config.headers
                  }
                })
              )
            }
          })
          .then(() => {
            isRefreshing = false
          })
      })
    }
    return response
  },
  (error) => {
    const { response, config } = error

    if (response.status === 401 && !config._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject })
        })
          .then(() => {
            return axios({
              ...config,
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json, text/plain, */*'
              }
            })
          })
          .catch((err) => {
            return err
          })
      }

      config._retry = true
      isRefreshing = true

      return new Promise((resolve, reject) => {
        axios
          .get(UrlApi.GET_REFRESH, {
            baseURL: import.meta.env.VITE_API_URL,
            timeout: 30000,
            withCredentials: true
          })
          .then(({ data }) => {
            processQueue(null, data.token)
            resolve(
              axios({
                ...config,
                headers: {
                  ...config.headers
                }
              })
            )
          })
          .catch((err) => {
            processQueue(err, null)
            const admin = getAdminFromLocalStorage()
            removeAdminFromLocalStorage()
            reject(err)
            if (err?.response?.status === 401 && admin) {
              location.reload()
            }
          })
          .then(() => {
            isRefreshing = false
          })
      })
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
