from flask import Flask, jsonify
from flask import request
from flask_cors import CORS, cross_origin
from detoxify import Detoxify
from flask import make_response

app = Flask(__name__)
cors = CORS(app)

app.config['CORS_HEADERS'] = 'Content-Type'


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
            results = Detoxify('unbiased').predict(sentence)
            hate_score = results['toxicity']
            print(f'sentence: {sentence}; score: {hate_score}')
        except:
            hate_score = 0
        order = {'value': str(hate_score)}
        return _corsify_actual_response(jsonify(order))
    else:
        raise RuntimeError("Weird - don't know how to handle method {}".format(request.method))




if __name__ == '__main__':
    app.run(debug= True)