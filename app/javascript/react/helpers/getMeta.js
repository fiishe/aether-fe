const getMeta = (metaName) => {
  let metaElems = document.getElementsByTagName('meta')
  let metaArr = Array.from(metaElems)
  let meta = metaArr.find(metaTag => { return metaTag.getAttribute('name') == metaName })
  return meta.getAttribute('content')
}

export default getMeta
