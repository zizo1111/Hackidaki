from flask import Flask, jsonify
from flask import request
from flask_cors import CORS, cross_origin
from backend.hate_recognizer import HateRecognizer
from flask import make_response

app = Flask(__name__)
cors = CORS(app)

app.config['CORS_HEADERS'] = 'Content-Type'
hr = HateRecognizer()

def _build_cors_preflight_response():
    response = make_response()
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "*")
    response.headers.add("Access-Control-Allow-Methods", "*")
    return response

def _corsify_actual_response(response):
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response



@app.route('/api', methods=['POST', 'OPTIONS'])
# @cross_origin(origin='*',headers=['Content- Type','Authorization'])
def hello_world():
    print('yes')

    if request.method == "OPTIONS":  # CORS preflight
        return _build_cors_preflight_response()
    elif request.method == "POST":
        try:
            request_data = request.get_json(force=True)
            sentence = request_data["sentence"]
            # print(sentence)
            skip = False
            results = []
            if sentence[0:4] == "http":

                ## filter out twitters default images
                if 'twimg' in sentence and 'default' in sentence:
                    skip = True
                    print('skipping  ' , sentence)
                
                if not skip:
                    print('predicting')
                    results = hr.predict_hate_img(sentence)
                    # print('predicted')
                    # print(results)
            else:
                if sentence == 'nigeria' or sentence == 'Nigeria':
                    # print('ignoring nigeria')
                    hate_score = 0
                else:
                    results = hr.predict_hate(sentence)

            if len(results) > 0:
                hate_score = results['toxicity']
            
            else:
                hate_score = 0
        except:
            hate_score = 0
        order = {'value': str(hate_score)}
        return _corsify_actual_response(jsonify(order))
    else:
        raise RuntimeError("Weird - don't know how to handle method {}".format(request.method))




if __name__ == '__main__':
    app.run(debug= True)