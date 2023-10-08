import axios from 'axios'
import {baseURL} from './baseUrl'

const instance = axios.create({
    baseURL: baseURL,
    params: {language: 'en'},
  headers: {
    'X-RapidAPI-Key': 'e770177eb6mshb7efff0aee0d0ccp1006fejsnf05378b4c36a',
    'X-RapidAPI-Host': 'quran-com.p.rapidapi.com'
  }
  });

export default instance