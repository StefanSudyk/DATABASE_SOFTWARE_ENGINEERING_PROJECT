import re
from flask_restful import abort,Resource
import base64
from PIL import Image
import io

class PhotoValidation(Resource):

    def address_photo_validation(self, address_photo):
        if address_photo:
            return True

    def description_photo_validation(self, description_photo):
        if len(description_photo) < 5:
            abort(401, message="Enter a longer photo description")
            return False
        else:
            return True

    def photo_validation(self, photo):
        try:
            # Decode the Base64 string
            binary_photo = base64.b64decode(photo)

            # Try to open the image
            image = Image.open(io.BytesIO(binary_photo))
            image.verify()  # Verify that it is, in fact, an image
        except (base64.binascii.Error, IOError):
            abort(401, message="Invalid photo data. Please upload a valid image.")
            return False
        return True