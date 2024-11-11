import ee 
from google.auth import compute_engine, impersonated_credentials

scopes = [
    "https://www.googleapis.com/auth/earthengine"
]

# Pay close attention to the scopes flow down...
credentials = compute_engine.Credentials(scopes=scopes)

delegated = impersonated_credentials.Credentials(
    source_credentials = credentials,
    target_principal = 'wps-automation@wpsi-208318.iam.gserviceaccount.com', # email of target service account.
    target_scopes = scopes,
    lifetime = 300
)

ee.Initialize(delegated)