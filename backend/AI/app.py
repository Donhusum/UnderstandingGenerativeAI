from flask import Flask, request, jsonify
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
# Example AI function
def run_ai(input_data):
   
    output_data = '"' + input_data + '"' + "- Ptoughneigh Iellouwghswyrth"
    return output_data

@app.route('/process', methods=['POST'])
def process_data():
    data = request.get_json()
    input_data = data['prompt']
    output = run_ai(input_data)
    return jsonify({'output': output})

if __name__ == '__main__':
    
    app.run(debug = True)