const cartContainer = document.getElementById("cart-container");
const totalCountElement = document.getElementById("total-count");
const totalPriceElement = document.getElementById("total-price");

function renderCart() {
  cartContainer.innerHTML = "";
  let totalPrice = 0;
  let totalCount = 0;

  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  cartItems.forEach((item, index) => {
    const itemElement = createItemElement(item, index);
    cartContainer.appendChild(itemElement);

    totalCount += item.count;
    totalPrice += item.price * item.count;
  });

  totalCountElement.innerText = `Total Count: ${totalCount} Pcs`;
  totalPriceElement.innerText = `Total Price: ${totalPrice} USD`;
}

function createItemElement(item, index) {
  const itemElement = document.createElement("div");
  itemElement.classList.add("item");

  const itemImage = document.createElement("img");
  itemImage.src = item.thumbnail;

  const itemName = document.createElement("h4");
  itemName.innerText = item.title;

  const increaseButton = createButton("+");
  increaseButton.addEventListener("click", () => {
    changeItemCount(index, 1);
  });

  const itemCount = document.createElement("span");
  itemCount.classList.add("count");
  itemCount.innerText = item.count;

  const decreaseButton = createButton("-");
  decreaseButton.addEventListener("click", () => {
    changeItemCount(index, -1);
  });

  const itemPrice = document.createElement("span");
  itemPrice.innerText = `${item.price * item.count} USD`;

  const deleteButton = createButton("Delete");
  deleteButton.addEventListener("click", () => {
    deleteItem(index);
  });

  itemElement.appendChild(itemImage);
  itemElement.appendChild(itemName);
  itemElement.appendChild(decreaseButton);
  itemElement.appendChild(itemCount);
  itemElement.appendChild(increaseButton);
  itemElement.appendChild(itemPrice);
  itemElement.appendChild(deleteButton);

  return itemElement;
}

function createButton(text) {
  const button = document.createElement("button");
  button.innerText = text;
  return button;
}

function changeItemCount(index, amount) {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  if (cartItems[index]) {
    cartItems[index].count += amount;

    if (cartItems[index].count < 1) {
      cartItems.splice(index, 1);
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    renderCart();
  }
}

function deleteItem(index) {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  if (cartItems[index]) {
    cartItems.splice(index, 1);

    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    renderCart();
  }
}

document.addEventListener("DOMContentLoaded", renderCart);
