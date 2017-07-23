import axios from 'axios'
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_MESSAGE
} from './types'
import history from '../history'

const ROOT_URL = 'http://localhost:3000/api/v1'

export function signinUser ({ email, password }) {
  return function (dispatch) {
    // Submit email/password to the server
    axios.post(`${ROOT_URL}/signin`, { email, password })
      .then(response => {
        // If request is good...
        // - Update state to indicate user is authenticated
        console.log('from server on login', response)
        dispatch({ type: AUTH_USER })
        // - Save the JWT token
        localStorage.setItem('token', response.data.token)
        // - redirect to the route '/feature'
      })
      .catch(() => {
        // If request is bad...
        // - Show an error to the user
        dispatch(authError('Bad Login Info'))
      })
  }
}

export function signupUser ({ email, password }) {
  return function (dispatch) {
    axios.post(`${ROOT_URL}/signup`, { email, password })
      .then(response => {
        console.log('from server on signup', response)
        dispatch({ type: AUTH_USER })
        localStorage.setItem('token', response.data.token)
      })
      .catch(response => dispatch(authError(response.data.error)))
  }
}

export function authError (error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function signoutUser () {
  localStorage.removeItem('token')
  console.log('fired singnout')
  return { type: UNAUTH_USER }
}

export function fetchMessage () {
  return function (dispatch) {
    axios.get('http://localhost:3000/', {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        dispatch({
          type: FETCH_MESSAGE,
          payload: response.data.message
        })
      })
  }
}
