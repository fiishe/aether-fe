import { getMeta } from './utils'

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

const fetchSecure = (method, uri, payload, headers) => {
  let req = {
    credentials: 'same-origin',
    method: method,
    body: payload,
    headers: headers || {
      'Content-Type': 'application/json'
    }
  }
  req.headers['x-CSRF-Token'] = getMeta('csrf-token')

  for (let key in headers) {
    req.headers[key] = headers[key]
  }

  return new Promise((resolve, reject) => {
    fetch(uri, req)
      .then(handleResponse)
      .then(json => { resolve(json) })
      .catch(e => {
        e.message = `Error occurred while attempting to ${method} ${uri}:
        ${e.message}`
        reject(e)
      })
  })
}

const fetchPost = (uri, payload, headers) => {
  return fetchSecure('POST', uri, payload, headers)
}

const fetchPatch = (uri, payload, headers) => {
  return fetchSecure('PATCH', uri, payload, headers)
}

const fetchDelete = (uri, payload, headers) => {
  return fetchSecure('DELETE', uri, payload, headers)
}

export default fetchGet
export {
  fetchGet,
  fetchPost,
  fetchPatch,
  fetchDelete
}
