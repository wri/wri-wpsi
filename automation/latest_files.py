from src.services.cloudstorage import latest_24_month, latest_3_month

if __name__ == "__main__":
  print(latest_3_month(), latest_24_month())