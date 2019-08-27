const getMeta = metaName => {
  let metaElems = document.getElementsByTagName('meta')
  let metaArr = Array.from(metaElems)
  let meta = metaArr.find(metaTag => { return metaTag.getAttribute('name') == metaName })
  return meta.getAttribute('content')
}

const stripString = str => {
  return ( str || '' ).replace( /^\s+|\s+$/g, '' )
}

export { getMeta, stripString }
