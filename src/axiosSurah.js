import axios from 'axios'
import {baseURL} from './SurahFull'

const instance2 = axios.create({
    baseURL: baseURL,
    headers: {
        'X-RapidAPI-Key': 'e770177eb6mshb7efff0aee0d0ccp1006fejsnf05378b4c36a',
        'X-RapidAPI-Host': 'al-quran1.p.rapidapi.com'
      }
  });

export default instance2