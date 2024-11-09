from datetime import datetime
import os

# 24 month

def getPrevMonth(month, delta):
    if month+delta <= 0:
        return month+delta+12
    else:
        return (month+delta)%12

current_year_month = f"{datetime.now().year}{getPrevMonth(datetime.now().month, -1):02}"
prev_year_month = f"{datetime.now().year}{getPrevMonth(datetime.now().month, -2):02}"

file = 'ERA5_SPI24_{year_month}'

env_file = os.getenv('GITHUB_ENV') # Get the path of the runner file

# write to the file
with open(env_file, "a") as env_file:
    env_file.write(f"WPS_24_MONTH_GS=gs://wps_pillar1a/data_sources/Deltares/Data{current_year_month}/{file.format(year_month=prev_year_month)}.tif\n")
    env_file.write(f"WPS_24_MONTH_GS_PROJ=gs://wps_pillar1a/data_sources/Deltares/Data{current_year_month}/proj_{file.format(year_month=prev_year_month)}.tif\n")
    env_file.write(f"WPS_24_MONTH_FILENAME={file.format(year_month=prev_year_month)}.tif")
    