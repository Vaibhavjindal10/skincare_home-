
// const navbarLinks = document.querySelectorAll("[data-nav-link]");
// const overlay = document.querySelector("[data-overlay]");


const fs = require('fs');
const path = require('path');

// Path to the JSON file
const filePath = path.join(__dirname, '../json/product.json');

// Read the file
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }
  try {
    const jsonData = JSON.parse(data);
    // console.log(jsonData);
    displayproducts(jsonData);
  } catch (err) {
    console.error('Error parsing JSON:', err);
  }
});

  const displayproducts = (jsonData) => {
    let content = '';
    for (let product of jsonData) {
      console.log('Processing product:', product);
      content += `
        <div class="product-card" data-id="${product.id}">
          <div class="card-img">
            <img src="${product.image[0]}" onclick="displayDetails(${product.id});" alt="${product.name}">
            <a href="#" class="addToCart">
              <ion-icon name="cart-outline" class="Cart"></ion-icon>
            </a>
          </div>
          <div class="card-info">
            <h4 class="product-name" onclick="displayDetails(${product.id});">${product.name}</h4>
            <h5 class="product-price">${product.newprice}</h5>
          </div>
        </div>`;
    }
    console.log('Generated HTML content:', content);
    document.querySelector(".section.shop .container .products").innerHTML = content;
  };