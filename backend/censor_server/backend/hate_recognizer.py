from backend.text_extractor import TextExractor
from detoxify.detoxify import Detoxify


class HateRecognizer:
    def __init__(self) -> None:
        self.hate_predictor = Detoxify('unbiased')
        self.text_extractor = TextExractor()
    
    def predict_hate(self, text):
        return self.hate_predictor.predict(text)
    
    def predict_hate_img(self, img):
        extracted_text = self.text_extractor.recognize_text(img, True)
        return self.hate_predictor.predict(extracted_text)

if __name__ == "__main__":
    hr = HateRecognizer()
    print(hr.predict_hate_img('hate_examples/hate_example2.jpeg'))