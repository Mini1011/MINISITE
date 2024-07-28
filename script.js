const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
    bar.addEventListener('click',() => {
   nav.classList.add('active');
    } )
}

if (close){
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    })
}


document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default anchor behavior
        
        const productId = this.dataset.productId;
        const productName = this.dataset.productName;
        const productPrice = this.dataset.productPrice;

        fetch('/add-to-cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': 'your-csrf-token' // Include CSRF token if needed
            },
            body: JSON.stringify({
                product_id: productId,
                name: productName,
                price: productPrice
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Product added to cart') {
                updateCartUI(data.cart);
                alert('Product added to cart!');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});

function updateCartUI(cart) {
    const cartContainer = document.querySelector('#cart-container');
    cartContainer.innerHTML = ''; // Clear the current cart contents

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.textContent = `${item.name} - Rs ${item.price}`;
        cartContainer.appendChild(cartItem);
    });
}
