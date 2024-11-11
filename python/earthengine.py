import ee
from google.auth import compute_engine

scopes = [
    "https://www.googleapis.com/auth/earthengine"
]

credentials = compute_engine.Credentials(scopes=scopes)
ee.Initialize(credentials)