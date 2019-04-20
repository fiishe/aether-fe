class ApiController < ApplicationController
  protect_from_forgery with: :null_session, unless: -> { request.format.json? }
end
