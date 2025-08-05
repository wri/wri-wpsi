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
        print(f"Making GET request to: {rw_api_url}")
        data = requests.request("GET", rw_api_url, headers=create_headers()).json()
        print(data)
        return data["data"]
    except:
        raise ValueError('Failed getting layer data')

def updateLayer(datasetId, layerId, layerData):
    try:
        rw_api_url = 'https://api.resourcewatch.org/v1/dataset/{}/layer/{}'.format(datasetId, layerId)
        print(f"Making PATCH request to: {rw_api_url}")
        res = requests.patch(rw_api_url, data=json.dumps(layerData), headers=create_headers())
        # Print response details for debugging
        print(f"Response status code: {res.status_code}")
        print(f"Response content: {res.text}")
        
        try:
            response_data = res.json()
            print("Response data:", json.dumps(response_data, indent=2))
            return response_data["data"]["attributes"]["layerConfig"]
        except json.JSONDecodeError as e:
            print(f"Failed to parse JSON response: {e}")
            print(f"Raw response content: {res.text}")
            raise ValueError('Failed to parse API response as JSON')
            
    except requests.exceptions.RequestException as e:
        print(f"Request failed: {str(e)}")
        raise ValueError(f'Failed to update layer data: {str(e)}')
    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        raise ValueError(f'Failed to update layer data: {str(e)}')

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

def layer_set_name(layerId, name):
    """
    Updates the name of a layer with the given layerId.
    Args:
        layerId (str): The ID of the layer to be updated.
        name (str): The new name to set for the layer.
    Returns:
        None
    Raises:
        KeyError: If the layer data does not contain the expected keys.
        Exception: If there is an error updating the layer.
    Example:
        layer_set_name("12345", "New Layer Name")
    """

    layerData = getLayerData(layerId)

    datasetId = layerData["attributes"]["dataset"]
    layerId = layerData["id"]
    print(layerData["attributes"]["name"])

    layerData["attributes"]["name"] = name

    updateLayer(datasetId, layerId, layerData["attributes"])

def layer_set_sql(layerId, sql):
    layerData = getLayerData(layerId)

    datasetId = layerData["attributes"]["dataset"]
    layerId = layerData["id"]
    print(layerData["attributes"]["layerConfig"]["body"]["layers"][0]["options"]["sql"])

    layerData["attributes"]["layerConfig"]["body"]["layers"][0]["options"]["sql"] = sql

    print(layerData["attributes"]["layerConfig"]["body"]["layers"][0]["options"]["sql"])
    updateLayer(datasetId, layerId, layerData["attributes"])