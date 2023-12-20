document.addEventListener('DOMContentLoaded', function() {

  
    //  product data 
    const productsData1 = [
        { name: 'Cupcake', price: 3, type: 'cupcake', image: './images/img\ \(49\).jpg' },
        { name: 'Cupcake ', price: 4, type: 'cupcake', image: './images/img\ \(15\).jpg' },
        { name: 'Cupcake ', price: 5, type: 'cupcake', image: './images/img\ \(51\).jpg' },
        { name: 'Cupcake ', price: 2, type: 'cupcake', image: './images/img\ \(52\).jpg' },
        { name: 'Coffee ', price: 8, type: 'coffee', image: './images/img\ \(40\).jpg' },
        { name: 'Coffee', price: 6, type: 'coffee', image: './images/img\ \(24\).jpg' },
        { name: 'Coffee', price: 4, type: 'coffee', image: './images/img\ \(67\).jpg' },
        { name: 'coffee', price: 3, type: 'coffee', image: './images/img\ \(68\).jpg' },
        { name: 'coffee ', price: 5, type: 'coffee', image: './images/img\ \(84\).jpg' }
    ];

    const productsData = productsData1.map((product, index) => ({ ...product, index }));




      
  let filtersApplied = false;
  document.querySelector('.Remove-filters').onclick = () => {

     // Uncheck all checkboxes related to filters
     const filterCheckboxes = document.querySelectorAll('.filter-checkbox');
     filterCheckboxes.forEach(checkbox => {
       checkbox.checked = false;
     });


      filtersApplied = false;
      const totalProducts = productsData.length;
      const totalPages = Math.ceil(totalProducts / itemsPerPage);
      createPaginationButtons(totalPages);
      const initialProductsToDisplay = getProductsToDisplay();
      displayPaginatedProducts(initialProductsToDisplay, currentPage);
  };
  
  document.querySelector('.Apply-filters').onclick = () => {
      filtersApplied = true;
      const filteredProducts = getFilteredProducts();
      /*displayProducts(filteredProducts);*/
      currentPage = 1;
      const totalProducts = filtersApplied ? getFilteredProducts().length : productsData.length;
      const totalPages = Math.ceil(totalProducts / itemsPerPage);
      createPaginationButtons(totalPages);
      const productsToDisplay = getProductsToDisplay();
      displayPaginatedProducts(productsToDisplay, currentPage);
  };
  
      
  /* open sort options and number of displayed item in page */
  const sortSection = document.querySelector(".sort");
  const sortOptions = document.querySelector(".sort-options");


  // Variable to keep track of the current page
let currentPage = 1;

// Number of items to display per page
let itemsPerPage = 3;
  
  sortSection.addEventListener("click", function () {
      sortOptions.classList.toggle("active");
      sortOptions.style.display = sortOptions.classList.contains("active") ? "block" : "none";
  });
  
    
   // Function to display products on the page with background images
  function displayProducts(products) {
    const productsContainer = document.getElementById('cont-product');
    productsContainer.innerHTML = '';

    products.forEach((product) => {
        const productCard = createProductCard(product);
        productsContainer.appendChild(productCard);
    });
  }

  // Function to create a product card with background images
function createProductCard(product) {
  const productCard = document.createElement('div');
  productCard.classList.add('item');

  // Set the background image using CSS
  productCard.style.background = `url('${product.image}')`;
  productCard.style.backgroundPosition = `center`;
  productCard.style.backgroundSize = `cover`;

  // Customize the product card structure
  productCard.innerHTML = `
      <!-- Add more elements as needed for your design -->
      <div class="item">
          <div class="icons">
              <a href="#" class="fas fa-shopping-cart add-to-cart-icon" data-index="${product.index}"></a>
              <a href="#" class="fas fa-heart"></a>
              <a href="#" class="fas fa-eye"></a>
          </div>
          
          <div class="item-content" id="msn">
              <h3>${product.name}</h3>
              <div class="stars">
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star-half-alt"></i>
              </div>
              <div class="price"> 
                  <span class="now-price">$${product.price}</span> 
                  <span>$20</span>
              </div>
          </div>
      </div>
  `;

  // Add event listener to calculate the initial price when the add-to-cart icon is clicked
  productCard.querySelector('.add-to-cart-icon').addEventListener('click', () => {
    product.quantity = 1; // Set the default quantity to 1
    updateCartSection(); // Update the cart section after adding an item
  });

  // Append the product content to the product card
  return productCard;
}




    // Variable to keep track of the sort order
  let sortOrder = 'none'; // 'none' means no sorting initially

   // Function to sort products based on the specified order ('asc' for ascending, 'desc' for descending)
   function sortProducts(products, order) {
    if (order === 'none') {
      return products.slice(); // Return a copy of the original array
    }
    return products.slice().sort((a, b) => (order === 'asc' ? a.price - b.price : b.price - a.price));
  }

  // Function to display paginated products
function displayPaginatedProducts(products, page) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedProducts = products.slice(startIndex, endIndex);
    displayProducts(paginatedProducts);

  // Display the range of products being shown
  const totalProducts = filtersApplied ? getFilteredProducts().length : productsData.length;
  const startProduct = startIndex + 1;
  const endProduct = Math.min(startIndex + itemsPerPage, totalProducts);
  const rangeText = `Showing ${startProduct}-${endProduct} of ${totalProducts} Results`;
  document.querySelector('.results-info').textContent = rangeText;
  }

// Function to create pagination buttons
function createPaginationButtons(totalPages) {
    const paginationContainer = document.getElementById('pagination-container');
    paginationContainer.innerHTML = '';
  
    for (let i = 1; i <= totalPages; i++) {
      const button = document.createElement('div');
      button.classList.add('pagination-button');
      button.textContent = i;
      button.addEventListener('click', () => {
        currentPage = i;
        const productsToDisplay = getProductsToDisplay();
        displayPaginatedProducts(productsToDisplay, currentPage);
        updatePaginationButtonsStyle(); // Call the function to update pagination button style
      });
      paginationContainer.appendChild(button);
    }
  
    // Set initial style for pagination buttons
    updatePaginationButtonsStyle();
  }

  
  // Function to update pagination button style
  function updatePaginationButtonsStyle() {
    const paginationButtons = document.querySelectorAll('.pagination-button');
    paginationButtons.forEach((button, index) => {
      if (index + 1 === currentPage) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    });
  }
  

  // Function to get the filtered products based on the applied filters
  function getFilteredProducts() {
    const priceFilter = document.getElementById('price-filter').value;
    const typeFilters = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(checkbox => checkbox.value);

    // Filter products based on selected criteria
    const filteredProducts = productsData.filter(product => {
        const priceRange = priceFilter.split('-');
        const minPrice = parseInt(priceRange[0]);
        const maxPrice = parseInt(priceRange[1]);
        const priceCondition = priceFilter === 'all' || (priceFilter !== 'all' && (product.price >= minPrice && product.price <= maxPrice));
        const typeCondition = typeFilters.length === 0 || typeFilters.includes('all') || typeFilters.includes(product.type);    
        return priceCondition && typeCondition;
    });

    return filteredProducts;
}


// Function to get the products to sort based on the current page
function getProductsToDisplay() {
    const productsToSort = filtersApplied ? getFilteredProducts() : productsData;
    return sortProducts(productsToSort, sortOrder);
  }

  // Update sort button click events
document.querySelector('.asc').onclick = () => {
    currentPage = 1; // Reset current page to 1
    updatePaginationButtonsStyle();
    sortOrder = 'asc';
    const productsToDisplay = getProductsToDisplay();
    displayPaginatedProducts(productsToDisplay, currentPage);
  };
  
  document.querySelector('.desc').onclick = () => {
    currentPage = 1; // Reset current page to 1
    updatePaginationButtonsStyle();
    sortOrder = 'desc';
    const productsToDisplay = getProductsToDisplay();
    displayPaginatedProducts(productsToDisplay, currentPage);
  };
  
  // Update items per page select event
  const itemsPerPageSelect = document.getElementById('items-per-page-select');
  itemsPerPageSelect.addEventListener('change', () => {
    itemsPerPage = parseInt(itemsPerPageSelect.value);
    currentPage = 1;
    const totalProducts = filtersApplied ? getFilteredProducts().length : productsData.length;
    const totalPages = Math.ceil(totalProducts / itemsPerPage);
    createPaginationButtons(totalPages);
    const productsToDisplay = getProductsToDisplay();
    displayPaginatedProducts(productsToDisplay, currentPage);
  });
  
  // Initial display of paginated products
  const totalProducts = filtersApplied ? getFilteredProducts().length : productsData.length;
  const totalPages = Math.ceil(totalProducts / itemsPerPage);
  createPaginationButtons(totalPages);
  const initialProductsToDisplay = getProductsToDisplay();
  displayPaginatedProducts(initialProductsToDisplay, currentPage);
  

// Array to store items in the cart
const cartItems = [];

// Add a click event listener for adding to the cart
const productsContainer = document.getElementById('cont-product');
productsContainer.addEventListener('click', (event) => {
  const addToCartIcon = event.target.closest('.add-to-cart-icon');
  if (addToCartIcon) {
    const productIndex = parseInt(addToCartIcon.dataset.index);
    addToCart(productIndex);
  }
});


// Function to add a product to the cart
function addToCart(productIndex) {

  const selectedProduct = productsData.find(product => product.index === productIndex);

  // Check if the product is already in the cart
  const isInCart = cartItems.some(item => item === selectedProduct);

  if (!isInCart) {
    cartItems.push(selectedProduct);
    updateCartCount(); // Update the cart count in the header
    updateCartSection(); // Update the cart section after adding an item
  } else {
    // Optionally, you can provide some feedback to the user that the item is already in the cart
    console.log(`${selectedProduct.name} is already in the cart.`);
  }
}

// Function to update the cart count in the header
function updateCartCount() {
  const cartCountElement = document.querySelector('#cart-count');
  cartCountElement.textContent = cartItems.length;
}


// Function to update the cart section with the current cart items
function updateCartSection() {
  const cartSection = document.getElementById('cart-section');
  const cartCountElement = document.getElementById('cart-count');
  const cartItemsList = document.querySelector('.cart-items-list');
  const totalAmountElement = document.getElementById('total-amount');

  // Clear previous items
  cartItemsList.innerHTML = '';

  // Update cart count
  cartCountElement.textContent = cartItems.length;

  // Iterate through cart items and create elements
  cartItems.forEach(product => {
    const cartItemElement = document.createElement('div');
    cartItemElement.classList.add('cart-item');

    const itemNameElement = document.createElement('h4');
    itemNameElement.classList.add('itemName');
    itemNameElement.textContent = product.name;

    const itemImageElement = document.createElement('img');
    itemImageElement.classList.add('itemImg');
    itemImageElement.src = product.image;
    itemImageElement.alt = product.name;

    const itemDetailsElement = document.createElement('div');
    itemDetailsElement.classList.add('cart-item-name');
    itemDetailsElement.appendChild(itemNameElement);
    itemDetailsElement.appendChild(itemImageElement);

    const quantityInput = document.createElement('input');
    quantityInput.setAttribute('type', 'number');
    quantityInput.classList.add('numberselected');
    quantityInput.value = product.quantity; // Set the quantity to the product's current quantity

    quantityInput.addEventListener('input', (event) => {
      const newQuantity = parseInt(event.target.value, 10);

      // Check if the new quantity is a valid positive number
      if (!isNaN(newQuantity) && newQuantity >= 0) {
        product.quantity = newQuantity;
        updateCartSection(); // Update the cart section after changing the quantity
      } else {
        // Reset the input value if an invalid quantity is entered
        event.target.value = product.quantity;
      }
    });

    const priceElement = document.createElement('span');
    priceElement.classList.add('price');
    priceElement.textContent = `$${product.price * product.quantity}`; // Update the price based on quantity

    const removeButton = document.createElement('button');
    removeButton.classList.add('btn-remove');
    removeButton.textContent = 'Remove';

    // Add event listener to remove the item when the button is clicked
    removeButton.addEventListener('click', () => {
      removeFromCart(product);
      updateCartSection(); // Update the cart section after removing an item
    });

    // Append created elements to the cart item
    cartItemElement.appendChild(itemDetailsElement);
    cartItemElement.appendChild(quantityInput);
    cartItemElement.appendChild(priceElement);
    cartItemElement.appendChild(removeButton);

    // Append the cart item to the cart items list
    cartItemsList.appendChild(cartItemElement);
  });

  // Calculate and display the total amount
  const totalAmount = calculateTotalCost();
  totalAmountElement.textContent = `Total: $${totalAmount}`;
}

// Function to calculate the total cost of the cart
function calculateTotalCost() {
  let totalCost = 0;

  cartItems.forEach(item => {
    totalCost += item.price * item.quantity;
  });

  return totalCost;
}



// Function to remove a product from the cart
function removeFromCart(product) {
  const productIndex = cartItems.findIndex(item => item === product);

  if (productIndex !== -1) {
    cartItems.splice(productIndex, 1);
  }
}




// Add this function to filter products based on the search query
function filterProductsBySearch(products, query) {
  return products.filter(product => product.name.toLowerCase().includes(query.toLowerCase()));
}

// Update the display with the filtered products
function displayFilteredProducts(filteredProducts) {
  // Reset current page to 1 when applying filters
  currentPage = 1;
  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / itemsPerPage);
  createPaginationButtons(totalPages);
  const productsToDisplay = getSearchedProductsToDisplay(filteredProducts);
  // Display the first page of filtered products
  displayPaginatedProducts(productsToDisplay, currentPage);
}

// Function to get the products to display based on the current page
function getSearchedProductsToDisplay(filteredProducts) {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return filteredProducts.slice(startIndex, endIndex);
}

// Add an event listener for the search button
const searchButton = document.querySelector('.fa-search');
searchButton.addEventListener('click', () => {
  const searchInput = document.getElementById('search-input');
  const searchQuery = searchInput.value.trim(); // Trim removes leading and trailing whitespaces

  // Get filtered products based on the search query
  const filteredProducts = filterProductsBySearch(productsData, searchQuery);

  // Update the display with the filtered products
  displayFilteredProducts(filteredProducts);
});

// Alternatively, you can also trigger the search when the user presses Enter in the search input
const searchInput = document.getElementById('search-input');
searchInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    const searchQuery = searchInput.value.trim();
    const filteredProducts = filterProductsBySearch(productsData, searchQuery);
    displayFilteredProducts(filteredProducts);
  }
});











    

    });