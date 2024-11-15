import os
import eeUtil as eu
from google.cloud import storage

# define constants
BUCKET=os.environ["BUCKET"]
IMAGES_PREFIX_PATH=os.environ["IMAGES_PREFIX_PATH"]

# Login to gcloud and gee properly
eu.init(bucket=BUCKET)

client = storage.Client()

def _latest_file(file_type, prefix=IMAGES_PREFIX_PATH):
  """
    Retrieves the latest file of a specific type from a cloud storage bucket.
    This function lists all blobs in the specified bucket with a given prefix,
    filters out non-tif files, and identifies the latest file based on the filename.

    Parameters:
        file_type (str): The file type to filter (e.g., "ERA5_SPI24" or "SEAS5_SPI3").
        prefix (str): The prefix to filter files.

    Returns:
        tuple: A tuple containing the latest filename and the blob name.

    Raises:
        ValueError: If no valid file is found or if the latest filename is not a string or is an empty string.
    """

  blobs = client.list_blobs(BUCKET, prefix=prefix)

  latestFile = ''
  latestBlob = ''

  for blob in blobs:
    filename = blob.name.split("/")[-1]
    if filename[-3:] != 'tif':
      continue
    if filename[:10] == file_type:
      if filename > latestFile:
        latestBlob = blob.name
        latestFile = filename

  if not isinstance(latestFile, str) or latestFile == '':
    raise ValueError("latestFile is either not a string or is an empty string")

  return latestFile, latestBlob

def latest_24_month():
  """
  Retrieves the latest ERA5_SPI24 file from a cloud storage bucket.
  Calls the general _get_latest_file function with the appropriate prefix and file type.
  
  Returns:
      tuple: The filename of the latest ERA5_SPI24 file and the blob name.
  """

  return _latest_file("ERA5_SPI24")

def latest_3_month():
  """
  Retrieves the latest SEAS5 image filename from a cloud storage bucket.
  Calls the general _get_latest_file function with the appropriate prefix and file type.
  
  Returns:
      tuple: The filename of the latest SEAS5 image and the blob name.
  """

  return _latest_file("SEAS5_SPI3")

def print_all_blobs():
  """
  Prints the names of all blobs in the specified cloud storage bucket.
  This function lists all blobs in the specified bucket with a given prefix
  and prints their names.
  """
  blobs = client.list_blobs(BUCKET, prefix=IMAGES_PREFIX_PATH)
  
  for blob in blobs:
    print(blob.name)

def download(blob_name, filename):
  bucket = client.bucket(BUCKET)
  blob = bucket.blob(blob_name)
  blob.download_to_filename(filename)