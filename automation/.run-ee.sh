export GEE_SERVICE_ACCOUNT="wps-automation@wpsi-208318.iam.gserviceaccount.com"
export GOOGLE_APPLICATION_CREDENTIALS="gcloud-key.json"
export CLOUDSDK_CORE_PROJECT="wpsi-208318"
export BUCKET="wps_pillar1a"
export IMAGES_PREFIX_PATH="data_sources/Deltares/Data20"
export GS_STAGING_PREFIX="wps-staging-delete-me"


## to inspect data
# python automation/earthengine.py
# python automation/list_blobs.py
# python automation/latest_files.py
python automation/month_24_automation.py
python automation/month_3_automation.py
