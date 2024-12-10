import os
import eeUtil as eu
from automation.src.services.resourcewatch import layer_set_name
from src.services.mask import mask
from src.services.dates import get_mask_date_str
from src.services.cloudstorage import latest_24_month, download
from src.services.path import strip_extension
from src.services.project import project
from src.services.cartosql import init, upload_to_carto, deleteRows

# define constants
BUCKET=os.environ["BUCKET"]
GS_STAGING_PREFIX=os.environ["GS_STAGING_PREFIX"]
MONTH_3_LAYER_ID=os.environ["MONTH_3_LAYER_ID"]
GEE_PROJECT_FOLDER=os.environ["GEE_PROJECT_FOLDER"]
CARTO_MASK_TABLE_NAME=os.environ["CARTO_MASK_TABLE_NAME"]
MASK_LAYER_ID=os.environ["MASK_LAYER_ID"]

# Login to gcloud and gee properly

eu.init(bucket=BUCKET)

# get the last 24 month image
filename, blob_name = latest_24_month()
print("****Mask automation****")
print(filename, blob_name)

# download the file from google storage
download(blob_name, filename)

# run the projection
project(filename)

# upload it to GEE and make it public
masked_df = mask(filename)

# carto
init()
deleteRows(CARTO_MASK_TABLE_NAME, "true")
upload_to_carto(CARTO_MASK_TABLE_NAME, masked_df)
layer_set_name(MASK_LAYER_ID, f"Moderate to Severe Drought - 24 Month SPI ({get_mask_date_str(strip_extension(filename)[-6:])})")