# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_05_31_002515) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "campaign_memberships", force: :cascade do |t|
    t.integer "campaign_id"
    t.integer "user_id"
    t.string "role", default: "member"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "campaigns", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "characters", force: :cascade do |t|
    t.string "name", null: false
    t.integer "level", default: 1, null: false
    t.boolean "promoted", default: false, null: false
    t.integer "user_id", null: false
    t.integer "campaign_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "class_name"
    t.integer "max_hp", default: 0, null: false
    t.integer "strength", default: 0, null: false
    t.integer "magic", default: 0, null: false
    t.integer "skill", default: 0, null: false
    t.integer "speed", default: 0, null: false
    t.integer "luck", default: 0, null: false
    t.integer "defense", default: 0, null: false
    t.integer "resistance", default: 0, null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "snowflake", null: false
    t.string "username", null: false
    t.string "discriminator", null: false
    t.string "nick"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "access_token"
    t.datetime "access_token_issued"
    t.string "refresh_token"
    t.string "avatar_url"
    t.string "bio"
  end

end
