async function getProducts() {
    const products = localStorage.getItem("products");
  
    if (products) {
      return JSON.parse(products);
    }
  
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    const fetchedProducts = data.products;
    localStorage.setItem("products", JSON.stringify(fetchedProducts));
  
    return fetchedProducts;
  }
  
  const root = document.getElementById("root");
  
  function renderProducts(products) {
    const productsContainer = document.getElementById("root");
  
    products.forEach(product => {
      const productElement = document.createElement("div");
      productElement.classList.add("product");
  
      const productName = document.createElement("h3");
      productName.innerText = product.title;
    
      const productImage = document.createElement("img");
      productImage.src = product.thumbnail;
    
      const productDescription = document.createElement("p");
      productDescription.innerText = product.description;
  
      const productPrice = document.createElement("p");
      productPrice.innerHTML = `Price: <span>${product.price} USD</span>`;
  
      const addToCartButton = document.createElement("button");
      addToCartButton.innerText = "Add to Cart";
      addToCartButton.addEventListener("click", () => {
        console.log(product);
        addToCart(product);
        updateCartCount(); 
      });
  
      productElement.appendChild(productName);
      productElement.appendChild(productImage);
      productElement.appendChild(productDescription);
      productElement.appendChild(productPrice);
      productElement.appendChild(addToCartButton);
  
      productsContainer.appendChild(productElement);
    });
  }
  
  function addToCart(product) {
    let data = new FormData();
    for (const key in product) {
      if (key == 'images') {
        continue;
      }
      let value = product[key];
      data.append(key, value);
    }
 

    fetch("api.php?action_name=create&from_javascript", {
      method: 'post',
      body: data
    })
      .then(function (response) {return response.json()})
      .then(function (result) {
        console.log(result);
      }) 
    // let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  
    // const existingItem = cartItems.find(item => item.id === product.id);
    // if (existingItem) {
    //   if (isNaN(existingItem.count)) {
    //     existingItem.count = 1;
    //   } else {
    //     existingItem.count += 1;
    //   }
    // } else {
    //   product.count = 1;
    //   cartItems.push(product);
    // }
  
    // localStorage.setItem('cartItems', JSON.stringify(cartItems));
    // updateCartCount();
  }
  
  
  function updateCartCount() {
    const cartCountElement = document.getElementById("cart-count");
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    let totalCount = 0;
  
    cartItems.forEach(item => {
      if (item.count) {
        totalCount += item.count;
      }
    });
  
    cartCountElement.innerText = totalCount;
  }
  
  async function init() {
    const products = await getProducts();
    renderProducts(products);
    updateCartCount();
  }
  
  init();
  