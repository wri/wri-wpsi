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

ActiveRecord::Schema.define(version: 2022_11_20_204758) do

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

  create_table "categories", force: :cascade do |t|
    t.string "title"
    t.text "description"
    t.string "slug"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["slug"], name: "index_categories_on_slug", unique: true
  end

  create_table "categories_layers", id: false, force: :cascade do |t|
    t.bigint "category_id", null: false
    t.bigint "layer_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["category_id", "layer_id"], name: "index_categories_layers_on_category_id_and_layer_id", unique: true
  end

  create_table "file_uploads", force: :cascade do |t|
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "layers", force: :cascade do |t|
    t.string "name"
    t.text "short_description"
    t.string "layer_id"
    t.string "dataset_id"
    t.boolean "published", default: false, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "primary", default: false, null: false
    t.text "long_description"
    t.string "source_name"
    t.string "source_url"
    t.string "source_description"
    t.text "widget_spec"
    t.boolean "mask", default: false, null: false
    t.index ["layer_id"], name: "index_layers_on_layer_id", unique: true
  end

  create_table "news_items", force: :cascade do |t|
    t.string "title"
    t.text "description"
    t.text "article_url"
    t.string "image_url"
    t.text "image_alt_text"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.date "date"
    t.boolean "published", default: false
    t.string "categories", default: [], array: true
  end

  create_table "pages", force: :cascade do |t|
    t.string "name"
    t.string "slug"
    t.text "content"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.decimal "sort_priority"
    t.string "menu"
    t.string "location"
    t.index ["slug"], name: "index_pages_on_slug", unique: true
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  create_table "widget_datapoints", id: false, force: :cascade do |t|
    t.string "GID_2"
    t.date "month_date"
    t.string "GID_1"
    t.string "GID_0"
    t.decimal "SI.POV.DDAY"
    t.decimal "SI-POV-LMIC"
    t.decimal "SI.POV.UMIC"
    t.decimal "SH-STA-STNT-ZS"
    t.decimal "NY-GDP-PCAP-PP-KD"
    t.decimal "SL-UEM-TOTL-ZS"
    t.decimal "FP-CPI-TOTL-ZG"
    t.decimal "SL-AGR-EMPL-ZS"
    t.decimal "NV-AGR-TOTL-ZS"
    t.decimal "rainfed"
    t.decimal "spam_V_agg_t_sum"
    t.decimal "spam_V_agg_i_sum"
    t.decimal "spam_V_agg_r_sum"
    t.decimal "bci_bci"
    t.decimal "v2x_corr"
    t.decimal "v2x_execorr"
    t.decimal "SP-DYN-IMRT-IN"
    t.decimal "al_ethnic"
    t.decimal "al_religion"
    t.string "reign"
    t.decimal "et_anom_y_MIN"
    t.binary "remote_violence_binary_12m"
    t.binary "peaceful_protests_riots_binary_12m"
    t.binary "violence_against_civilians_binary_12m"
    t.binary "violent_protests_riots_binary_12m"
    t.binary "agreements_binary_12m"
    t.binary "battles_binary_12m"
    t.decimal "locdensity"
    t.decimal "age_0-14"
    t.decimal "age_15-24"
    t.decimal "age_25-64"
    t.decimal "age_65"
    t.decimal "sex_0-14"
    t.decimal "sex_15-24"
    t.decimal "sex_25-64"
    t.decimal "sex_65"
    t.decimal "natpop"
    t.decimal "urbrate"
    t.decimal "wateraccess"
    t.decimal "sanitationaccess"
    t.date "month_start"
    t.decimal "bwd"
    t.decimal "bws"
    t.decimal "iav"
    t.decimal "rfr"
    t.decimal "sev"
    t.decimal "acl_sum_fatl"
    t.string "spi_24"
    t.string "buffalo_number"
    t.string "cattle_number"
    t.string "chicken_number"
    t.string "conflict_cat"
    t.string "Cropland2000_mean_percent"
    t.string "DeliveredkcalFraction"
    t.string "duck_number"
    t.string "EG-ELC-ACCS-ZS"
    t.string "EG-ELC-LOSS-ZS"
    t.string "EG-IMP-CONS-ZS"
    t.string "elec_expt_totl"
    t.string "elec_impt_totl"
    t.string "elect_dist_loss"
    t.string "energy_all"
    t.string "eng_cons_pcap"
    t.string "eng_cons_pgdp"
    t.string "eng_cons_totl"
    t.string "eng_prod_totl"
    t.string "EP-PMP-DESL-CD"
    t.string "fd_ex_per"
    t.string "fd_im_per"
    t.string "food_all"
    t.string "goat_number"
    t.string "horse_number"
    t.string "IC-FRM-OUTG-ZS"
    t.string "loss_ha"
    t.string "ndvi_act_avg"
    t.string "Pasture2000_mean_percent"
    t.string "pig_number"
    t.string "sheep_number"
    t.string "spam_P_i_ws"
    t.string "spam_P_r_sum"
    t.string "spi_3_f2"
    t.string "swe_area"
    t.string "water_all"
    t.string "wspowerprd"
    t.string "yield_gap_barley"
    t.string "yield_gap_maize"
    t.string "yield_gap_rice"
    t.string "yield_gap_soybean"
    t.integer "month"
    t.integer "year"
    t.date "year_date"
    t.index ["GID_2", "month_date"], name: "index_widget_datapoints_on_GID_2_and_month_date", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
end
