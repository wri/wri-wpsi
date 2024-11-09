import rasterio
from rasterio.crs import CRS
import os

FILE = os.environ["WPS_24_MONTH_FILENAME"]


if FILE:
    print('The filename evn WPS_24_MONTH_FILENAME={FILE} successfully loaded!')
else:
    print('Please check the env WPS_24_MONTH_FILENAME was not loaded')

with rasterio.open(FILE, "r+") as rds:
    rds.crs = CRS.from_epsg(4326)