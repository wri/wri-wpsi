import rasterio
from rasterio.crs import CRS
from rasterio.features import shapes
import geopandas as gpd

def mask(filename):
  with rasterio.open(filename) as src:
    # https://gis.stackexchange.com/questions/410885/defining-the-crs-using-rasterio-when-reading-nongeoreferenced-raster
    # Read the raster band you want to vectorize
    band = src.read(1)

    # Extract vector features from the raster
    shapes_generator = shapes(band, mask=band != 0, transform=src.transform)
    # Create a list of features with their geometries
    
    features = [
        {"geometry": geometry, "properties": { 'value': value } } for geometry, value in shapes_generator
    ]
    
    collection = {
      "type": "FeatureCollection",
      "features": features
    }

    gdf = gpd.GeoDataFrame.from_features(features=collection, crs=CRS.from_epsg(4326))
    
    gdf['mask'] = gdf['value'].apply(lambda x: 0 if x < -1.5 else 1)

    gdf = gdf.dissolve('mask')
    gdf = gdf.explode()

    return gdf