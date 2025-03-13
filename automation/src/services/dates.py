from datetime import datetime

def prev_month(month, delta):
    """
    Calculate the previous month based on the given month and delta.
    Args:
      month (int): The current month as an integer (1-12).
      delta (int): The number of months to go back. Can be negative or positive.
    Returns:
      int: The resulting month after applying the delta. The result is always in the range 1-12.
    """
    
    if month+delta <= 0:
        return month+delta+12
    else:
        return (month+delta)%12
    
def get_month_year(date_str):
  """
  Converts a date string in the format 'YYYYMM' to a string with the full month name and year.
  Args:
    date_str (str): A string representing a date in the format 'YYYYMM'.
  Returns:
    str: A string with the full month name followed by the year, e.g., 'January 2023'.
  Raises:
    ValueError: If the input string does not match the format 'YYYYMM'.
  """

  date_obj = datetime.strptime(date_str, "%Y%m")
  return date_obj.strftime("%B %Y")

def get_mask_date_str(date_str):
  """
  Converts a date string in the format 'YYYYMM' to a string in the format 'previous month previous year-month year'.
  Args:
    date_str (str): A string representing a date in the format 'YYYYMM'.
  Returns:
    str: A string in the format 'previous month previous year-month year', e.g., 'December 2022-January 2023'.
  Raises:
    ValueError: If the input string does not match the format 'YYYYMM'.
  """
  
  date_obj = datetime.strptime(date_str, "%Y%m")
  prev_month_date_obj = date_obj.replace(month=prev_month(date_obj.month, -1))
  
  if date_obj.month == 1:
    prev_month_date_obj = prev_month_date_obj.replace(year=date_obj.year - 1)
  
  prev_month_str = prev_month_date_obj.strftime("%B %Y")
  current_month_str = date_obj.strftime("%B %Y")
  
  return f"{prev_month_str}-{current_month_str}"

