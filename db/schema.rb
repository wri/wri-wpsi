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

ActiveRecord::Schema.define(version: 2019_09_25_205227) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

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
    t.string "gid_2"
    t.date "month_indep"
    t.string "gid_1"
    t.string "gid_0"
    t.decimal "SI.POV.DDAY"
    t.decimal "SI.POV.LMIC"
    t.decimal "SI.POV.UMIC"
    t.decimal "SH.STA.STNT.ZS"
    t.decimal "NY.GDP.PCAP.PP.KD"
    t.decimal "SL.UEM.TOTL.ZS"
    t.decimal "FP.CPI.TOTL.ZG"
    t.decimal "SL.AGR.EMPL.ZS"
    t.decimal "NV.AGR.TOTL.ZS"
    t.decimal "rainfed"
    t.decimal "value_a_2010"
    t.decimal "value_i_2010"
    t.decimal "value_r_2010"
    t.decimal "bci_bci"
    t.decimal "v2x_corr"
    t.decimal "v2x_execorr"
    t.decimal "SP.DYN.IMRT.IN"
    t.decimal "al_ethnic"
    t.decimal "al_religion"
    t.binary "election_recent"
    t.decimal "reign"
    t.decimal "et_anom_month"
    t.decimal "et_act_month"
    t.decimal "et_anom_year"
    t.decimal "agreements_count_12m"
    t.decimal "agreements_fatalities_12m"
    t.decimal "battles_count_12m"
    t.decimal "battles_fatalities_12m"
    t.decimal "peaceful_protests_riots_count_12m"
    t.decimal "peaceful_protests_riots_fatalities_12m"
    t.decimal "remote_violence_count_12m"
    t.decimal "remote_violence_fatalities_12m"
    t.decimal "strategic_development_count_12m"
    t.decimal "strategic_development_fatalities_12m"
    t.decimal "violence_against_civilians_count_12m"
    t.decimal "violence_against_civilians_fatalities_12m"
    t.decimal "violent_protests_riots_count_12m"
    t.decimal "violent_protests_riots_fatalities_12m"
    t.binary "remote_violence_binary_12m"
    t.binary "peaceful_protests_riots_binary_12m"
    t.binary "violence_against_civilians_binary_12m"
    t.binary "violent_protests_riots_binary_12m"
    t.binary "agreements_binary_12m"
    t.binary "battles_binary_12m"
    t.decimal "loccount"
    t.decimal "locdensity"
    t.decimal "age_0-14"
    t.decimal "age_15-24"
    t.decimal "age_25-64"
    t.decimal "age_65+"
    t.decimal "sex_0-14"
    t.decimal "sex_15-24"
    t.decimal "sex_25-64"
    t.decimal "sex_65+"
    t.decimal "natpop"
    t.decimal "rurpop"
    t.decimal "urbpop"
    t.decimal "rurratio"
    t.decimal "spi_3"
    t.decimal "spi_6"
    t.decimal "spi_12"
    t.decimal "spi_24"
    t.decimal "urbrate"
    t.decimal "wateraccess"
    t.decimal "sanitationaccess"
    t.date "month_start"
    t.decimal "bwd"
    t.decimal "bws"
    t.decimal "iav"
    t.decimal "rfr"
    t.decimal "sev"
    t.index ["gid_2", "month_indep"], name: "index_widget_datapoints_on_gid_2_and_month_indep", unique: true
  end

end
