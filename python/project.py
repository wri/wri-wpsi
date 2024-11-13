import rasterio
from rasterio.crs import CRS
import os
import eeUtil as eu

FILE = os.environ["WPS_24_MONTH_FILENAME"]
EXTENTION = ".tif"


if FILE:
    print('The filename evn WPS_24_MONTH_FILENAME={FILE} successfully loaded!')
else:
    print('Please check the env WPS_24_MONTH_FILENAME was not loaded')

with rasterio.open(f"{FILE}{EXTENTION}", "r+") as rds:
    rds.crs = CRS.from_epsg(4326)

eu.init(bucket='wps_pillar1a')

eu.uploadAsset(f"{FILE}{EXTENTION}", f"projects/wpsi-208318/assets/wpsi/{FILE}", gs_prefix='', date='', public=True)