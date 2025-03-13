# obligatories for automation
export GEE_SERVICE_ACCOUNT=
export GOOGLE_APPLICATION_CREDENTIALS=
export CLOUDSDK_CORE_PROJECT=
export BUCKET="wps_pillar1a"
export IMAGES_PREFIX_PATH="data_sources/Deltares/Data20"
export GS_STAGING_PREFIX="wps-staging-delete-me"
export GEE_PROJECT_FOLDER="projects/wpsi-208318/assets/wpsi"
export RW_API_KEY=

# depending on the script
export MONTH_24_LAYER_ID="cdd0000b-34a9-4b3d-9640-8f574321223d"
export MASK_LAYER_ID="b5e0343e-ebe9-4e65-b162-244190b6c1ce"
export MONTH_3_LAYER_ID="cdd0000b-34a9-4b3d-9640-8f57422f264d"

# Carto
export CARTO_USER="WRI-RW"
export CARTO_KEY=
export CARTO_MASK_TABLE_NAME=

## to inspect data
# python automation/earthengine.py
# python automation/automation.py listBlobs
python automation/automation.py latestFiles
# python automation/automation.py updateLayer cdd0000b-34a9-4b3d-9640-8f57422f264d projects/ee-lizsaccoccia/assets/spi3_112024
# python automation/automation.py updateLayerName cdd0000b-34a9-4b3d-9640-8f57422f264d "3 Month Standardized Precipitation Index (SPI) Forecast December 2024"
# python automation/automation.py layerSql b5e0343e-ebe9-4e65-b162-244190b6c1ce 'SELECT * FROM wps_spi24_mask_copy WHERE value > -1.5'
# python automation/automation.py updateLayer cdd0000b-34a9-4b3d-9640-8f57422f264d helo

## automations
# python automation/month_24_automation.py
# python automation/month_3_automation.py
