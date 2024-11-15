import os
import eeUtil as eu
from src.services.path import strip_extension
from src.services.cloudstorage import latest_3_month, download
from src.services.project import project

# define constants
BUCKET=os.environ["BUCKET"]
GS_STAGING_PREFIX=os.environ["GS_STAGING_PREFIX"]

# Login to gcloud and gee properly

eu.init(bucket=BUCKET)

# get the last 24 month image
filename, blob_name = latest_3_month()
print("****latest 3 month****")
print(filename, blob_name)

# download the file from google storage
download(blob_name, filename)

# run the projection
project(filename)

# upload it to GEE and make it public
eu.upload(filename, f"projects/wpsi-208318/assets/wpsi/{strip_extension(filename)}", gs_prefix=GS_STAGING_PREFIX, public=True, clean=False)

# update the layerConfig.assetId in the given layerId from resourcewatch
