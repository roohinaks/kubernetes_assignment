from flask import Flask, request, jsonify

app=Flask(__name__)

stored_data=[]

@app.route('/api/submit', methods=['POST'])
def submit():
    data=request.json
    name=data.get('name')
    phno=data.get('phno')
    address=data.get('address')
    stored_data.append({
        'name': name,
        'phno': phno,
        'address': address
    })
    print(f"Received data : {name}, {phno}, {address}")

    return jsonify({"message" : f"Hello {name}, Payment received successfully....ORDER PLACED!!!"})

@app.route('/data', methods=['GET'])
def form_data():

    return jsonify(stored_data)

if __name__=='__main__':
    app.run(debug=True, host='0.0.0.0', port=8000)
