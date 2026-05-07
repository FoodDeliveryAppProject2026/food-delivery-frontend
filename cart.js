function updateTotals() {
    let subtotal = 0;
    document.querySelectorAll('.cart-item').forEach(item => {
        const price = parseFloat(item.getAttribute('data-price'));
        const qty = parseInt(item.querySelector('.qty').innerText);
        const itemTotal = price * qty;
        item.querySelector('.item-price').innerText = `$${itemTotal.toFixed(2)}`;
        subtotal += itemTotal;
    });

    const tax = subtotal * 0.08; 
    const total = subtotal + tax;

    document.getElementById('subtotal').innerText = `$${subtotal.toFixed(2)}`;
    document.getElementById('tax').innerText = `$${tax.toFixed(2)}`;
    document.getElementById('total').innerText = `$${total.toFixed(2)}`;
}

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('plus')) {
        const qtyElement = e.target.parentElement.querySelector('.qty');
        qtyElement.innerText = parseInt(qtyElement.innerText) + 1;
        updateTotals();
    }
    
    if (e.target.classList.contains('minus')) {
        const qtyElement = e.target.parentElement.querySelector('.qty');
        let currentQty = parseInt(qtyElement.innerText);
        if (currentQty > 1) {
            qtyElement.innerText = currentQty - 1;
            updateTotals();
        }
    }

    if (e.target.classList.contains('remove-btn')) {
        e.target.closest('.cart-item').remove();
        updateTotals();
    }
});

function openReviewPopup() {
    document.getElementById('review-popup').style.display = 'flex';
}

function closeReviewPopup() {
    document.getElementById('review-popup').style.display = 'none';
    alert("Order Placed Successfully!");
}