import { getMeta } from './utils'

const getCSRFToken = () => { return getMeta('csrf-token') }

const handleResponse = res => {
  // check if response is OK
  if (!res.ok) { throw(new Error(`${res.status} (${res.statusText})`)) }

  // extract and validate body of response
  let json = res.json()
  if (json.status == 'fail') { throw(new Error(json.data.message)) }

  return json
}

const fetchGet = uri => {
  return new Promise((resolve, reject) => {
    fetch(uri)
      .then(handleResponse)
      .then(json => { resolve(json) })
      .catch(e => {
        e.message = `Error occurred while attempting to GET ${uri}:
          ${e.message}`
        reject(e)
      })
  })
}

const fetchPost = (uri, payload, headers) => {
  let req = {
    credentials: 'same-origin',
    method: 'POST',
    body: payload,
    headers: headers || {
      'Content-Type': 'application/json'
    }
  }
  req.headers['x-CSRF-Token'] = getCSRFToken()

  return new Promise((resolve, reject) => {
    fetch(uri, req)
      .then(handleResponse)
      .then(json => { resolve(json) })
      .catch(e => {
        e.message = `Error occurred while attempting to POST ${uri}:
        ${e.message}`
        reject(e)
      })
  })
}

const fetchPatch = (uri, payload, headers) => {
  let req = {
    credentials: 'same-origin',
    method: 'PATCH',
    body: payload,
    headers: headers || {
      'Content-Type': 'application/json'
    }
  }
  req.headers['x-CSRF-Token'] = getCSRFToken()

  for (let key in headers) {
    req.headers[key] = headers[key]
  }

  return new Promise((resolve, reject) => {
    fetch(uri, req)
      .then(handleResponse)
      .then(json => { resolve(json) })
      .catch(e => {
        e.message = `Error occurred while attempting to PATCH ${uri}:
        ${e.message}`
        reject(e)
      })
  })
}

export default fetchGet
export {
  fetchGet,
  fetchPost,
  fetchPatch
}
