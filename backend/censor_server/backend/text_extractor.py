
from cgitb import text
import numpy as np
import easyocr
import socket
class TextExractor:

    def __init__(self):

        self.reader = easyocr.Reader(['en'])

    def recognize_text(self, img, conact = False):
        '''loads an image and recognizes text.'''
        socket.setdefaulttimeout(3)
        result = self.reader.readtext(img)
        return_arr = []
        if result is not None and len(result) > 0:
            for line in result:
                return_arr.append(line[1])

        if len(return_arr) > 0:
            if conact:
                return ' '.join(return_arr)
            else:
                return return_arr
        else:
            return None
