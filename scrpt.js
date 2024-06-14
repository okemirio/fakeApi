// Selecting elements from the HTML document
const product = document.querySelector(".product-menue");
const cartsItems = document.querySelector(".cart-items");
const cartIcon = document.querySelector("#cart-button");
const cancelButton = document.querySelector(".cancel");
const sidebar = document.querySelector(".sidebar");
const productMen = document.querySelector(".products-menu-men");
const productWomen = document.querySelector(".products-menu-women");
const productElectronics = document.querySelector(".products-menu-electronics");
const productJeweries = document.querySelector(".products-menu-jewelery");

// Fetching product data from an API
var productData = fetch("https://fakestoreapi.com/products")
  .then(function (res) {
    // Parsing the response as JSON
    return res.json();
  })
  .then(function (json) {
    // Storing the fetched product data in a variable and displaying products
    getProduct(json);
  });

// Array to store the items in the cart
const carts = [];
var cartMenuList = [];

// Array of specified categories
const specifiedCategories = [
  "men's clothing",
  "women's clothing",
  "jewelery",
  "electronics",
];

// // Event listener for the cart icon to show the sidebar when clicked
cartIcon.addEventListener("click", function () {
  sidebar.classList.remove("hide");
});

// Event listener for the cancel button to hide the sidebar when clicked
cancelButton.addEventListener("click", function () {
  sidebar.classList.add("hide");
});

// Function to display the products on the page based on categories
function getProduct(Data) {
  // Looping through each product item in the data
  for (let index = 0; index < Data.length; index++) {
    const { image, id, title, price, description, category } = Data[index];

    // Formatting the description and title for display
    const formattedDescription =
      description.length > 20
        ? `${description.substring(0, 20)}............more`
        : description;
    const protocolTitle =
      title.length > 10 ? `${title.substring(0, 10)}........more` : title;

    // Checking the category of the product and displaying it in the corresponding section
    if (Data[index].category === specifiedCategories[0]) {
      productMen.innerHTML +=`
        <div class="product" >
          <img src="${image}" alt="" id="skr">
          <h4>Title: ${protocolTitle}</h4>
          <h4>Price: ${price}</h4>
          <h5>Description: ${formattedDescription}</h5>
          <button type="submit" class="add-to-cart" id="addCartBtn" data-id="${id}">Add to cart</button>
        </div>`;
    }
    if (Data[index].category === specifiedCategories[1]) {
      productWomen.innerHTML += `<div class="product">
          <img src="${image}" alt="" id="skr">
          <h4>Title: ${protocolTitle}</h4>
          <h4>Price: ${price}</h4>
          <h5>Description: ${formattedDescription}</h5>
          <button type="submit" class="add-to-cart" id="addCartBtn" data-id="${id}">Add to cart</button>
        </div>`;
    }
    if (Data[index].category === specifiedCategories[2]) {
      productJeweries.innerHTML += `
        <div class="product">
          <img src="${image}" alt="" id="skr">
          <h4>Title: ${protocolTitle}</h4>
          <h4>Price: ${price}</h4>
          <h5>Description: ${formattedDescription}</h5>
          <button type="submit" class="add-to-cart" id="addCartBtn" data-id="${id}">Add to cart</button>
        </div>`;
    }
    if (Data[index].category === specifiedCategories[3]) {
      productElectronics.innerHTML += `
        <div class="product">
          <img src="${image}" alt="" id="skr">
          <h4>Title: ${protocolTitle}</h4>
          <h4>Price: ${price}</h4>
          <h5>Description: ${formattedDescription}</h5>
          <button type="submit" class="add-to-cart" id="addCartBtn" data-id="${id}">Add to cart</button>
        </div>`;
    }
  }
  runlistener(Data);
};
var cartImport;
var cart_Prod;

let cartItem;

// Function to add event listener to the product menu
function runlistener(arraypocket) {
  // Add an event listener to the product menu
  product.addEventListener("click", function (addToCart) {
    let addTocartBTN = addToCart.target.id;

    if (addTocartBTN === "addCartBtn") {
      const productId = parseInt(addToCart.target.getAttribute("data-id"));
      sidebar.classList.remove("hide");

      for (let index = 0; index < arraypocket.length; index++) {
        cartImport = arraypocket[index];
        
        if (cartImport.id === productId) {
          cartItem = cartImport;
        }
      }

      cart_Prod = {
        cart_id: cartItem.id,
        cart_img: cartItem.image,
        cart_title: cartItem.title,
        cart_price: cartItem.price
      }
      cartMenuList.push(cart_Prod);
      console.log(cartMenuList)

      addToCartList(cartMenuList);
    }
  });
}


function addToCartList(array) {
  let cartHTMLCase = "";
  for (let index = 0; index < array.length; index++) {
    var { cart_id, cart_img, cart_title, cart_price } = array[index];
    cartHTMLCase += `<div class="cartProduct">
      <img src="${cart_img}" alt="">
      <div class="cart-details">
        <h5>${cart_title}</h5>
        <h4>$${cart_price}</h4>
      </div>
    </div>`
  }
  cartsItems.innerHTML = cartHTMLCase;

}



// Event listener for adding items to the cart when the add to cart button is clicked
// product.addEventListener("click", function (event) {
//   if (event.target.classList.contains("add-to-cart")) {
//     const productId = parseInt(event.target.getAttribute("data-id"));

//     // Finding the selected item from the product data
//     const selectedItem = productData.find(function (item) {
//       return item.id === productId;
//     });

//     // Checking if the item is already in the cart
//     const cartItemExists = carts.some(function (item) {
//       return item.cart_id === selectedItem.id;
//     });

//     // If item is not already in the cart, add it to the cart array and update the cart display
//     if (!cartItemExists) {
//       carts.push(selectedItem);
//       addToCart(selectedItem);
//       sidebar.classList.remove("hide");
//     } else {
//       // If item is already in the cart, show an alert
//       alert("Item already added to cart");
//     }
//   }
// });

// Function to add an item to the cart display
// function addToCart(item) {
//   const { image, title, price } = item;
//   cartsItems.innerHTML += `
//     <div class="cart-item">
//       <img src="${image}" alt="">
//       <h4>Title: ${title}</h4>
//       <h4>Price: ${price}</h4>
//     </div>
//   `;
// }
