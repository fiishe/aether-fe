[![Build Status](https://app.codeship.com/projects/034d3720-48b2-0137-0bcb-72c5a15f5221/status?branch=master)](https://app.codeship.com/projects/337952)

# aether-fe
## Setup
Requirements:
* Ruby 2.7
* PostgreSQL 11
* Yarn

Run (or refer to) `setup.sh` to install dependencies and migrate/seed development database.

## Environment
The following are environment variables required for the app to function. In development, these can be set in a `.env` file (refer to `.env.example`). Setting environment variables in production will depend on the service.

* Authentication is performed through Discord's OAuth2 provider, so you will need to register a [developer application](https://discord.com/developers/). Then, store the client ID and secret:
```
DISCORD_CLIENT_ID=
DISCORD_CLIENT_SECRET=
```

* In production, it is advisable to use a cloud storage service to support uploading files. I used Amazon S3, but other services can be easily configured according to the [Active Storage guide](https://edgeguides.rubyonrails.org/active_storage_overview.html).
After creating the bucket and IAM user via the AWS console, store the access key information:
```
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
```

* Unique IDs are generated based on the difference between the current time and a defined `EPOCH` for the app environment, which is stored in `.env` as an integer time (a number of seconds since the [Unix Epoch](https://en.wikipedia.org/wiki/Unix_time)). This can be any time before the creation of the first database entry.
```
EPOCH=
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
