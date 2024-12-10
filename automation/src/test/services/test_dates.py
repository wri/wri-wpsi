import unittest
from src.services.dates import prev_month, get_mask_date_str

class TestDates(unittest.TestCase):
  def test_prev_month(self):
    self.assertEqual(prev_month(12, -1), 11)
    self.assertEqual(prev_month(1, -2), 11)
    self.assertEqual(prev_month(11, 2), 1)
    self.assertEqual(prev_month(12, 1), 1)
    self.assertEqual(prev_month(1, 3), 4)


  def test_get_mask_date_str(self):
    self.assertEqual(get_mask_date_str("202301"), "December 2022-January 2023")
    self.assertEqual(get_mask_date_str("202312"), "November 2023-December 2023")
    self.assertEqual(get_mask_date_str("202302"), "January 2023-February 2023")
    self.assertEqual(get_mask_date_str("202211"), "October 2022-November 2022")
    self.assertEqual(get_mask_date_str("202207"), "June 2022-July 2022")

if __name__ == '__main__':
  unittest.main()