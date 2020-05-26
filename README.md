[![Build Status](https://app.codeship.com/projects/034d3720-48b2-0137-0bcb-72c5a15f5221/status?branch=master)](https://app.codeship.com/projects/337952)

# aether-fe
## Setup
Requirements:
* Ruby 2.4.5
* PostgreSQL 11
* Yarn

Run `setup.sh` to install dependencies and migrate/seed dev database.

## Environment
Authentication is performed through Discord's OAuth2 provider, so you will need to register a [developer application](https://discord.com/developers/). Then, store the client ID and secret in `.env`:
```
DISCORD_CLIENT_ID=
DISCORD_CLIENT_SECRET=
```

## Development
Start a local rails development server (at `localhost:3000`), webpack-dev-server for live reloading javascript, and the game server respectively.
```
bundle exec rails server
yarn run start
yarn run game
```

## Testing
Back end (RSpec):
```
rspec
```
Front end (React, Jest+Enzyme):
```
yarn run test
```

## Deploying to Heroku
After creating the Heroku app, add PostgreSQL and Redis addons:
```
heroku addons:add heroku-postgresql -a app-name
heroku addons:add redistogo -a app-name
```

Initialize the production database:
```
heroku run bundle exec rails db:schema:load -a app-name
heroku run bundle exec rails db:seed -a app-name
```

Finally, deploy from Github or `git push heroku master`.
