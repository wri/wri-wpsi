import ee
import sys

service_account="wps-automation@wpsi-208318.iam.gserviceaccount.com"
credential_path=sys.environ["GOOGLE_APPLICATION_CREDENTIALS"]
auth = ee.ServiceAccountCredentials(service_account, credential_path)

ee.Authenticate()

ee.Initialize(project="wpsi-208318")

print(ee.String('Hello from the Earth Engine servers!').getInfo())