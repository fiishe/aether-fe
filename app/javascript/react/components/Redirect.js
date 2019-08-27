let Redirect = (destination) => {
  return(
    () => {
      window.location = destination // Causes browser to get the full page again
    }
  )
}

export default Redirect
