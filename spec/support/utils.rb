def get_json(url)
  get url
  return JSON.parse(response.body)
end

def login(user)
  controller.session[:user_id] = user.id
  controller.session[:expires_at] = DateTime.now + 1.hour
end
