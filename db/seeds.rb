# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# TEST USERS
# none of this is real Discord user info unless by coincidence
# use the dev links at the top of the page ("user 1", etc) to login to these accounts
users = [
  {
    snowflake: "42557928562698828",
    username: "giorno",
    discriminator: "3118",
    avatar_url: "https://i.imgur.com/PMtXPsx.jpg"
  },
  {
    snowflake: "68641462307745286",
    username: "ribbonsss",
    nick: "sayo",
    discriminator: "6917",
    avatar_url: "https://i.imgur.com/NjVh4jm.jpg"
  },
  {
    snowflake: "12557928562698828",
    username: "subject_f",
    discriminator: "8349",
    avatar_url: "https://i.imgur.com/SZLd22L.jpg"
  }
]
users.each do |u|
  User.create(u)
end
