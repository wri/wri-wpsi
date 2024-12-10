import os
import eeUtil as eu
from src.services.dates import get_month_year
from src.services.resourcewatch import layer_set_asset_id, layer_set_name
from src.services.path import strip_extension
from src.services.cloudstorage import latest_24_month, download
from src.services.project import project

# define constants
BUCKET=os.environ["BUCKET"]
GS_STAGING_PREFIX=os.environ["GS_STAGING_PREFIX"]
MONTH_24_LAYER_ID=os.environ["MONTH_24_LAYER_ID"]
GEE_PROJECT_FOLDER=os.environ["GEE_PROJECT_FOLDER"]

# Login to gcloud and gee properly

eu.init(bucket=BUCKET)

# get the last 24 month image
filename, blob_name = latest_24_month()
print("****latest 24 month****")
print(filename, blob_name)

# download the file from google storage
download(blob_name, filename)

# run the projection
project(filename)

# upload it to GEE and make it public
imageId = f"{GEE_PROJECT_FOLDER}/{strip_extension(filename)}"
eu.upload(filename, imageId, gs_prefix=GS_STAGING_PREFIX, public=True, clean=False)

# update the layerConfig.assetId in the given layerId from resourcewatch
layer_set_asset_id(MONTH_24_LAYER_ID, imageId)
layer_set_name(MONTH_24_LAYER_ID, f"24 Month Standardized Precipitation Index (SPI) Forecast {get_month_year(strip_extension(filename)[-6:])}")