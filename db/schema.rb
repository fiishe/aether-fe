# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_07_16_092022) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

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
    t.bigint "owner_id"
    t.bigint "crystal", default: 0, null: false
    t.index ["owner_id"], name: "index_campaigns_on_owner_id"
  end

  create_table "chapters", force: :cascade do |t|
    t.string "title", null: false
    t.integer "map_id", null: false
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
    t.bigint "crystal", default: 0, null: false
  end

  create_table "maps", force: :cascade do |t|
    t.string "name", null: false
    t.integer "creator_id", null: false
    t.integer "height", null: false
    t.integer "width", null: false
    t.integer "tile_size", null: false
    t.json "tile_data", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "grid_alpha"
    t.string "grid_color"
    t.bigint "crystal", default: 0, null: false
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

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "campaigns", "users", column: "owner_id"
end
