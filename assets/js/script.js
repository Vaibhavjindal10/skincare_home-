'use strict';

/**
 * Add event on element 
 */
const addEventOnElem = (elem, type, callback) => {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}

/**
 * Navbar toggle
 */
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = () => {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
}

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = () => {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
}

addEventOnElem(navbarLinks, "click", closeNavbar);

/**
 * Header sticky & back top btn active
 */
const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const headerActive = () => {
  if (window.scrollY > 150) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
}

addEventOnElem(window, "scroll", headerActive);

let lastScrolledPos = 0;

const headerSticky = () => {
  if (lastScrolledPos >= window.scrollY) {
    header.classList.remove("header-hide");
  } else {
    header.classList.add("header-hide");
  }

  lastScrolledPos = window.scrollY;
}

addEventOnElem(window, "scroll", headerSticky);

/**
 * Scroll reveal effect
 */
const sections = document.querySelectorAll("[data-section]");

const scrollReveal = () => {
  for (let i = 0; i < sections.length; i++) {
    if (sections[i].getBoundingClientRect().top < window.innerHeight / 2) {
      sections[i].classList.add("active");
    }
  }
}

scrollReveal();

addEventOnElem(window, "scroll", scrollReveal);

/**
 * Hero section JS
 */
let slideIndex = 0;
let startX = 0;
let endX = 0;

const showSlides = (n) => {
  let slides = document.getElementsByClassName("slide");
  if (n >= slides.length) {
    slideIndex = 0;
  } 
  if (n < 0) {
    slideIndex = slides.length - 1;
  }
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none"; 
  }
  slides[slideIndex].style.display = "block";
}

const plusSlides = (n) => {
  showSlides(slideIndex += n);
}

// Initial display
showSlides(slideIndex);

// Auto slide every 5 seconds
setInterval(() => {
  showSlides(slideIndex += 1);
}, 5000);

// Touch event listeners
const slideshowContainer = document.getElementById('slideshow');

const handleTouchStart = (event) => {
  startX = event.touches[0].clientX;
}

const handleTouchMove = (event) => {
  endX = event.touches[0].clientX;
}

const handleTouchEnd = () => {
  if (startX > endX + 50) {
    plusSlides(1); // Swipe left
  } else if (startX < endX - 50) {
    plusSlides(-1); // Swipe right
  }
  startX = 0;
  endX = 0;
}

slideshowContainer.addEventListener('touchstart', handleTouchStart, false);
slideshowContainer.addEventListener('touchmove', handleTouchMove, false);
slideshowContainer.addEventListener('touchend', handleTouchEnd, false);

/**
 * Fetch and display trending products
 */
// const getTrendingProducts = async () => {
//   try {
//     let response = await fetch('json/product.json');
//     let products = await response.json();
//     displayTrendingProducts(products);
//   } catch (error) {
//     console.error('Error fetching the products:', error);
//   }
// }

// const displayTrendingProducts = (products) => {
//   let content = ''
//   for (let product of products) {
//     content += `
//       <div class="product-card" data-id="${product.id}">
//         <div class="card-img">
//           <img src="${product.image[0]}" onclick="displayDetails(${product.id});" alt="${product.name}">
//           <a href="#" class="addToCart">
//             <ion-icon name="cart-outline" class="Cart"></ion-icon>
//           </a>
//         </div>
//         <div class="card-info">
//           <h4 class="product-name" onclick="displayDetails(${product.id});">${product.name}</h4>
//           <h5 class="product-price">${product.newprice}</h5>
//         </div>
//       </div>`;
//   }
//   console.log('Generated HTML content:', content);
//   document.querySelector(".section.shop .container .products").innerHTML = content;
// }

// // Call the function to fetch and display trending products
// getTrendingProducts();



// document.addEventListener('DOMContentLoaded', () => {
//   const getTrendingProducts = async () => {
//     try {
//       console.log('Fetching products...');
//       let response = await fetch('json/product.json');
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       let products = await response.json();
//       console.log('Products data:', products);
//       displayTrendingProducts(products);
//     } catch (error) {
//       console.error('Error fetching the products:', error);
//     }
//   };

//   const displayTrendingProducts = (products) => {
//     let content = '';
//     for (let product of products) {
//       console.log('Processing product:', product);
//       content += `
//         <div class="product-card" data-id="${product.id}">
//           <div class="card-img">
//             <img src="${product.image[0]}" onclick="displayDetails(${product.id});" alt="${product.name}">
//             <a href="#" class="addToCart">
//               <ion-icon name="cart-outline" class="Cart"></ion-icon>
//             </a>
//           </div>
//           <div class="card-info">
//             <h4 class="product-name" onclick="displayDetails(${product.id});">${product.name}</h4>
//             <h5 class="product-price">${product.newprice}</h5>
//           </div>
//         </div>`;
//     }
//     console.log('Generated HTML content:', content);
//     document.querySelector(".section.shop .container .products").innerHTML = content;
//   };

//   getTrendingProducts();
// });

// // Dummy displayDetails function to prevent errors
// function displayDetails(id) {
//   console.log(`Displaying details for product ID: ${id}`);
// }


async function getTrendingProducts() {
  try {
    const response = await fetch('./assets/product.json');
    const products = await response.json();
    console.log("Fetched Products:", products); // Check if data is fetched correctly
    displayTrendingProducts(products);
  } catch (error) {
    console.error("Error fetching or parsing product data:", error);
    // Handle errors (display an error message, etc.)
  }
}

function displayTrendingProducts(products) {
  // Use setTimeout to ensure the DOM is fully loaded
  setTimeout(() => {
    const productContainer = document.querySelector(".section.shop .container .products"); 
    
    if (!productContainer) {
      console.error("Product container element not found. Verify your selector.");
      return; // Exit the function if the element is not found
    }

    const content = products.map(product => `
      <div class="product-card" data-id="${product.id}">
        <div class="card-img">
          <img src="${product.image[0]}" onclick="displayDetails(${product.id})">
          <a href="#" class="addToCart"> 
            <ion-icon name="cart-outline" class="Cart"></ion-icon>
          </a>
        </div>
        <div class="card-info">
          <h4 class="product-name" onclick="displayDetails(${product.id})">${product.name}</h4>
          <h5 class="product-price">${product.newprice}</h5>
        </div>
      </div>
    `).join('');

    productContainer.innerHTML = content;
  }, 0); // Execute immediately after the current call stack
}

// (rest of your code for displayDetails)

document.addEventListener("DOMContentLoaded", getTrendingProducts);