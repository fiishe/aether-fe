const defaultFetch = uri => {
  return new Promise((resolve, reject) => {
    fetch(uri)
      .then(res => {
        if(res.ok) {return res}
        else {
          let errorMessage = `${res.status} (${res.statusText})`
          throw(new Error(errorMessage))
        }
      })
      .then(res => res.json())
      .then(json => {
        if (json.status == "fail") { throw(new Error(json.data.message)) }
        else {
          resolve(json)
        }
      })
      .catch(e => {
        e.message = `Error occurred while attempting to fetch ${uri}:
          ${e.message}`
        reject(e)
      })
  })
}

export default defaultFetch
