import requests
import json
import sys
import os


# print(config)
API_TOKEN = os.environ["RW_API_KEY"]

if API_TOKEN:
    print('RW_API_KEY successfully loaded!')
else:
    print('Please check the path to your .env file and make sure you have a key called RW_API_KEY in your .env file.')

def create_headers():
    return {
        'content-type': "application/json",
        'authorization': "{}".format(API_TOKEN),
    }

def getLayerData(layerId):
    try:
        rw_api_url = 'https://api.resourcewatch.org/v1/layer/{}'.format(layerId)
        data = requests.request("GET", rw_api_url, headers=create_headers()).json()["data"]
        return data
    except:
        raise ValueError('Failed getting layer data')

def updateLayer(datasetId, layerId, layerData):
    try:
        rw_api_url = 'https://api.resourcewatch.org/v1/dataset/{}/layer/{}'.format(datasetId, layerId)
        print(rw_api_url)
        res = requests.patch(rw_api_url, data=json.dumps(layerData), headers=create_headers())
        print(res.json()["data"]["attributes"]["layerConfig"]["assetId"])
    except:
        raise ValueError('Failed to update layer data')

def layer_set_asset_id(layerId, assetIdContent):
    """
    Updates the asset ID of a specified layer.
    Args:
        layerId (str): The ID of the layer to be updated.
        assetIdContent (str): The new asset ID to be set for the layer.
    Returns:
        None
    Raises:
        KeyError: If the layer data does not contain the expected keys.
        Exception: If there is an error updating the layer.
    Example:
        layer_set_asset_id("cdd0000b-34a9-4b3d-9640-8f57422f2aad", "projects/wpsi-208318/assets/wpsi/ERA5_SPI24_202409")
    """

    layerData = getLayerData(layerId)

    datasetId = layerData["attributes"]["dataset"]
    layerId = layerData["id"]
    print(layerData["attributes"]["layerConfig"]["assetId"])

    ### updated assetId
    layerData["attributes"]["layerConfig"]["assetId"] = assetIdContent

    updateLayer(datasetId, layerId, layerData["attributes"])
