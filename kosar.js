document.addEventListener("DOMContentLoaded", function () {
  function loadCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }

  function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function removeItem(index) {
    let cart = loadCart();
    cart.splice(index, 1);
    saveCart(cart);
    renderCart();
  }

  function updateQuantity(index, newQuantity) {
    let cart = loadCart();
    cart[index].quantity = newQuantity;
    saveCart(cart);
    renderCart();
  }

  function renderCart() {
    const cartContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");

    let cart = loadCart();
    if (cart.length === 0) {
      cartContainer.innerHTML = "<p style='color: black;'>A kosár üres.</p>";
      totalPriceElement.innerText = "Végösszeg: 0 Ft";
      return;
    }

    let html = `
      <tr>
        <th>Termék</th>
        <th>Ár</th>
        <th>Mennyiség</th>
        <th>Összeg</th>
        <th></th>
      </tr>
    `;

    let totalPrice = 0;

    cart.forEach((item, index) => {
      let itemTotal = item.price * item.quantity;
      totalPrice += itemTotal;

      html += `
        <tr>
          <td>
            <div style="display: flex; align-items: center;">
              <img src="${item.image}" alt="${item.name}">
              <span style="color: black;">${item.name}</span>
            </div>
          </td>
          <td style="color: black;">${item.price} Ft</td>
          <td><input type="number" class="item-quantity" data-index="${index}" value="${item.quantity}" min="1"></td>
          <td style="color: black;">${itemTotal} Ft</td>
          <td><button class="remove-item" data-index="${index}" style="background: none; border: none; color: red; font-size: 18px; cursor: pointer;">❌</button></td>
        </tr>
      `;
    });

    cartContainer.innerHTML = html;
    totalPriceElement.innerText = `Végösszeg: ${totalPrice} Ft`;

    document.querySelectorAll(".remove-item").forEach(button => {
      button.addEventListener("click", function () {
        let index = parseInt(this.getAttribute("data-index"));
        removeItem(index);
      });
    });

    document.querySelectorAll(".item-quantity").forEach(input => {
      input.addEventListener("change", function () {
        let newQuantity = parseInt(this.value);
        if (isNaN(newQuantity) || newQuantity < 1) {
          newQuantity = 1;
          this.value = newQuantity;
        }
        let index = parseInt(this.getAttribute("data-index"));
        updateQuantity(index, newQuantity);
      });
    });

    document.getElementById("clear-cart").addEventListener("click", function () {
      localStorage.removeItem("cart");
      renderCart();
    });

    document.getElementById("continue-payment").addEventListener("click", function () {
      document.getElementById("payment-section").style.display = "block";
    });

    document.getElementById("payment-method").addEventListener("change", function () {
      if (this.value === "Bankkártya") {
        document.getElementById("card-details").style.display = "block";
      } else {
        document.getElementById("card-details").style.display = "none";
      }
    });

    document.getElementById("finalize-order").addEventListener("click", function () {
      alert("Rendelés leadva!");
      localStorage.removeItem("cart");
      renderCart();
    });
  }

  renderCart();
});
