import os

def strip_extension(filename: str) -> str:
    """
    Removes the file extension from the given filename.

    Parameters:
        filename (str): The name of the file, including the extension.

    Returns:
        str: The filename without the extension.
    """
    return os.path.splitext(filename)[0]