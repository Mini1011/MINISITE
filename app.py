from flask import Flask, request, jsonify, session

app = Flask(__name__)
app.secret_key = 'your_secret_key'

@app.route('/add-to-cart', methods=['POST'])
def add_to_cart():
    product_id = request.json.get('product_id')
    product_name = request.json.get('name')
    product_price = request.json.get('price')

    if 'cart' not in session:
        session['cart'] = []

    session['cart'].append({
        'product_id': product_id,
        'name': product_name,
        'price': product_price
    })

    return jsonify({'message': 'Product added to cart', 'cart': session['cart']})

if __name__ == '__main__':
    app.run(debug=True)
