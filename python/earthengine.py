import ee

ee.Authenticate()

ee.Initialize(project="wpsi-208318")

print(ee.String('Hello from the Earth Engine servers!').getInfo())