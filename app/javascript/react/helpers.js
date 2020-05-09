const defaultFetch = uri => {
  return new Promise((resolve, reject) => {
    fetch(uri)
      .then(res => {
        if(res.ok) {return res}
        else {
          let errorMessage = `${res.status} (${res.statusText})`;
          throw(new Error(errorMessage));
        }
      })
      .then(res => res.json())
      .then(json => {
        if (json.status == "fail") { throw(new Error(json.data.message)); }
        else {
          resolve(json);
        }
      })
      .catch(e => {
        e.message = `Error occurred while attempting to fetch ${uri}:
          ${e.message}`;
        reject(e);
      });
  })
};

const getMeta = metaName => {
  let metaElems = document.getElementsByTagName('meta');
  let metaArr = Array.from(metaElems);
  let meta = metaArr.find(metaTag => {
    return metaTag.getAttribute('name') == metaName
  });
  return meta.getAttribute('content');
}

const stripString = str => {
  return ( str || '' ).replace( /^\s+|\s+$/g, '' );
}

export { defaultFetch, getMeta, stripString };
