import eeUtil as eu

eu.init()

for asset in eu.ls('wpsi'):
  print(str(asset))
  eu.setAcl("wpsi/"+ asset, "public")


