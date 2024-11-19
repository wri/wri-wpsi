import sys

def main():
    """
    Main function to handle command line arguments and execute the appropriate command.
    This function expects three command line arguments:
    1. command: The command to execute (e.g., 'updateLayer').
    2. layerId: The ID of the layer to be updated.
    3. assetId: The path of the asset id (e.g., projects/ee-lizsaccoccia/assets/spi3_112024).
    The function performs the following steps:
    1. Parses the command line arguments.
    2. Validates that both layerId and assetId are provided.
    3. Prints a success message if the arguments are valid.
    4. Prints an error message and usage example if the arguments are missing or invalid.
    5. Executes the 'updateLayer' command by calling the layer_set_asset_id function with the provided layerId and assetId.
    Usage example:
      python /home/carlos/wri/wri-wpsi/automation/rw-api.py updateLayer cdd0000b-34a9-4b3d-9640-8f57422f264d path/to/assetId
    """
    try:
      command = sys.argv[1]
      assert(command)
    except:
      print('command was not passed as argument')
      print('example: python automation.py <command> ...args')
      return

    if command == 'updateLayer':
      from src.services.resourcewatch import layer_set_asset_id
      try:
          layerId = sys.argv[2]
          assetId = sys.argv[3]
          assert(layerId and assetId) 
          print(f'layer id: {layerId} and assetId {assetId} successfully loaded')
      except:
          print('layer id or assetId where not passed as arguments')
          print(r'example: python automation.py updateLayer cdd0000b-34a9-4b3d-9640-8f57422f264d path/to/assetId')
          return
      layer_set_asset_id(layerId, assetId)
    
    if command == 'listBlobs':
      from src.services.cloudstorage import print_all_blobs
      print_all_blobs()
    
    if command == 'latestFiles':
      from src.services.cloudstorage import latest_24_month, latest_3_month
      print(latest_3_month(), latest_24_month())
    if command == 'layerSql':
      from src.services.resourcewatch import layer_set_sql
      try:
          layerId = sys.argv[2]
          sql = sys.argv[3]
          assert(layerId and sql)

      except:
          print('sql was not passed as argument')
          print(r'example: python automation.py layerSql cdd0000b-34a9-4b3d-9640-8f57422f264d "SELECT * FROM wps_spi24_mask WHERE value > -1.5"')
          return
      layer_set_sql(layerId, sql)
        

if __name__ == '__main__':
    main()