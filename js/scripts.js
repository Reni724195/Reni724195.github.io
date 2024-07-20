
document.addEventListener("DOMContentLoaded", function() {
    // Ejemplo: Código para enviar formulario
    const form = document.querySelector("form");
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        alert("Formulario enviado!");
    });
});
document.addEventListener("DOMContentLoaded", function() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    function renderCart() {
        const cartItemsContainer = document.getElementById("cart-items");
        const cartTotal = document.getElementById("cart-total");
        cartItemsContainer.innerHTML = "";

        let total = 0;

        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.name}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>${item.quantity}</td>
                <td>$${itemTotal.toFixed(2)}</td>
                <td><button class="btn btn-danger btn-sm remove-from-cart" data-id="${item.id}">Eliminar</button></td>
            `;
            cartItemsContainer.appendChild(row);
        });

        cartTotal.textContent = total.toFixed(2);
    }

    function addToCart(id, name, price) {
        const item = cart.find(item => item.id === id);
        if (item) {
            item.quantity += 1;
        } else {
            cart.push({ id, name, price, quantity: 1 });
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
    }

    function removeFromCart(id) {
        const itemIndex = cart.findIndex(item => item.id === id);
        if (itemIndex > -1) {
            cart.splice(itemIndex, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            renderCart();
        }
    }

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function() {
            const id = this.getAttribute("data-id");
            const name = this.getAttribute("data-name");
            const price = parseFloat(this.getAttribute("data-price"));
            addToCart(id, name, price);
        });
    });

    document.getElementById("cart-items").addEventListener("click", function(e) {
        if (e.target.classList.contains("remove-from-cart")) {
            const id = e.target.getAttribute("data-id");
            removeFromCart(id);
        }
    });

    document.getElementById("checkout").addEventListener("click", function() {
        alert("Procediendo al pago...");
    });

    renderCart();
});