import axios from 'axios'

import config from '@/config/config'

const instance = axios.create({})

instance.defaults.baseURL = config.apiUrl

instance.interceptors.request.use(config => {
    console.log('Interceptando Request: ', config)
    return config
}, error => {
    console.log('Erro ao fazer Request: ', error)
    return Promise.reject(error)
})

export default instance