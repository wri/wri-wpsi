import rasterio
from rasterio.crs import CRS

def project(filename):
  with rasterio.open(filename, "r+") as rds:
    rds.crs = CRS.from_epsg(4326)