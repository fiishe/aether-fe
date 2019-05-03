def get_json(url)
  get url
  return JSON.parse(response.body)
end
