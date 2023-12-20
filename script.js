document.addEventListener('DOMContentLoaded', function () {
    // Header behavior on scroll
    const header = document.querySelector('.header');
    const headerTexts = document.querySelectorAll('.primary-color');
    const triggerHeight = 70;

    window.addEventListener('scroll', function () {
        const scrollPosition = window.scrollY;

        if (scrollPosition > triggerHeight) {
            // Change header background and text color when scrolled
            header.style.background = 'white';
            header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)'; // Add box-shadow on scroll
            headerTexts.forEach(text => {
                text.style.color = '#333';
            });
        } else {
            // Restore header background and text color when not scrolled
            header.style.background = 'transparent';
            header.style.boxShadow = 'none'; // Remove box-shadow when not scrolled
            headerTexts.forEach(text => {
                text.style.color = '#fff';
            });
        }
    });

    // Toggle navigation menu
    const navbar = document.querySelector(".navigation");
    const menuIcon = document.querySelector("#menu-icon");

    menuIcon.onclick = () => {
        navbar.classList.toggle('active');
        cart.classList.remove('active');
        searchBar.classList.remove('active');
    }

    // Toggle cart display
    const cartIcon = document.querySelector('#cart-icon');
    const cart = document.querySelector('.cart');

    cartIcon.onclick = () => {
        cart.classList.toggle('active');
        navbar.classList.remove('active');
        searchBar.classList.remove('active');
    }

    // Toggle search bar
    const searchBar = document.querySelector('.search-bar');
    document.querySelector('#search-icon').onclick = () => {
        searchBar.classList.toggle('active');
        cart.classList.remove('active');
        navbar.classList.remove('active');
    }

    // go to sign up page
    document.querySelector('#sign-in-icon').addEventListener('click', function(){
      window.location.href = 'signIn.html'

    });

  
    // Close menus on scroll
    window.onscroll = () => {
        navbar.classList.remove('active');
        searchBar.classList.remove('active');
        cart.classList.remove('active');
    }

    // Automatic home background change
    const images = document.querySelectorAll('.home');
    let currentIndex = 0;

    function showImage(index, homeAnimations, randomAnimation) {
        // Show/hide images based on index and apply animations
        images.forEach((image, i) => {
            const targetElement = image.querySelector('.content');

            if (i === index) {
                // Apply animations to the selected image
                targetElement.style.opacity = 1;
                targetElement.classList.add(randomAnimation);
                image.style.opacity = 1;
                image.classList.add(homeAnimations);
            } else {
                // Hide non-selected images
                image.style.opacity = 0;
                targetElement.style.opacity = 0;
                targetElement.classList.remove(randomAnimation);
                image.classList.remove(homeAnimations);
            }
        });

        // Image hover and click behavior
        const homeItemOne = document.querySelector('.btn-item-one');
        const homeItemTwo = document.querySelector('.btn-item-two');

        homeItemOne.addEventListener('mouseover', () => toggleImageClass(homeItemOne, homeItemTwo));
        homeItemTwo.addEventListener('mouseover', () => toggleImageClass(homeItemTwo, homeItemOne));
        homeItemOne.addEventListener('mouseout', () => removeImageClass(homeItemOne));
        homeItemTwo.addEventListener('mouseout', () => removeImageClass(homeItemTwo));
        homeItemOne.addEventListener('click', () => showImage(1));
        homeItemTwo.addEventListener('click', () => showImage(0));
    }

    function toggleImageClass(activeItem, inactiveItem) {
        // Toggle class for image hover effect
        activeItem.parentElement.querySelector('img').classList.add('show-img');
        inactiveItem.parentElement.querySelector('img').classList.remove('show-img');
    }

    function removeImageClass(item) {
        // Remove class for image hover effect
        item.parentElement.querySelector('img').classList.remove('show-img');
    }

    // Function to change the current image
    function changeImage() {
        currentIndex = (currentIndex + 1) % images.length;
        const homeAnimations = ['fade-in-image'];
        const textAnimations = ['slideInFromBotoom', 'slideInFromTop'];
        const randomAnimation = textAnimations[Math.floor(Math.random() * textAnimations.length)];
        showImage(currentIndex, homeAnimations, randomAnimation);
    }

    // Initial image display
    showImage(currentIndex);

    // Image change interval (commented out for manual testing)
    setInterval(changeImage, 10000);

    // Menu links behavior
    const cakeLink = document.querySelector('.show-cakeMenu');
    const cakeMenu = document.querySelector('.cakeMenu');

    cakeLink.addEventListener('click', function (event) {
        // Show cake menu, hide coffee menu
        coffeeMenu.classList.remove('showMenu');
        cakeMenu.classList.remove('hideMenu');
        cakeMenu.classList.add('showMenu');
        event.preventDefault();
    });

    const coffeeLink = document.querySelector('.show-coffeeMenu');
    const coffeeMenu = document.querySelector('.coffeeMenu');

    coffeeLink.addEventListener('click', function (event) {
        // Show coffee menu, hide cake menu
        cakeMenu.classList.remove('showMenu');
        coffeeMenu.classList.remove('hideMenu');
        coffeeMenu.classList.add('showMenu');
        event.preventDefault();
    });

    // Show all items in the menu
    const showAllProducts = document.querySelector('.show-allProducts');
    showAllProducts.addEventListener('click', function (event) {
        cakeMenu.classList.add('showMenu');
        coffeeMenu.classList.add('showMenu');
        event.preventDefault();
    });

    // Slider scripts
   
const slideContainer = document.querySelector('.slider .container');
const slide = document.querySelector('.slides');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const interval = 3000;

let slides = document.querySelectorAll('.slide');
let index = 1;
let slideId;

const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

firstClone.id = 'first-clone';
lastClone.id = 'last-clone';

slide.append(firstClone);
slide.prepend(lastClone);

const slideWidth = slides[index].clientWidth;

slide.style.transform = `translateX(${-slideWidth * index}px)`;

console.log(slides);

const startSlide = () => {
  slideId = setInterval(() => {
    moveToNextSlide();
  }, interval);
};

const getSlides = () => document.querySelectorAll('.slide');

// Slide transition end event
slide.addEventListener('transitionend', () => {
  slides = getSlides();
  if (slides[index].id === firstClone.id) {
    // Reset position when reaching cloned slides
    slide.style.transition = 'none';
    index = 1;
    slide.style.transform = `translateX(${-slideWidth * index}px)`;
  }

  if (slides[index].id === lastClone.id) {
    slide.style.transition = 'none';
    index = slides.length - 2;
    slide.style.transform = `translateX(${-slideWidth * index}px)`;
  }
});
// Move to the next slide
const moveToNextSlide = () => {
  slides = getSlides();
  if (index >= slides.length - 1) return;
  index++;
  slide.style.transition = '.7s ease-out';
  slide.style.transform = `translateX(${-slideWidth * index}px)`;
};
// Move to the previous slide
const moveToPreviousSlide = () => {
  if (index <= 0) return;
  index--;
  slide.style.transition = '.7s ease-out';
  slide.style.transform = `translateX(${-slideWidth * index}px)`;
};
// Pause slider on mouseenter
slideContainer.addEventListener('mouseenter', () => {
  clearInterval(slideId);
});

slideContainer.addEventListener('mouseleave', startSlide);
nextBtn.addEventListener('click', moveToNextSlide);
prevBtn.addEventListener('click', moveToPreviousSlide);

startSlide();



// show diynamicaly popular items

  // Sample product data (replace this with your actual product data)
  const popularProducts1 = [
    { name: 'Cupcake', price: 3, type: 'cupcake', image: './images/img\ \(49\).jpg' },
    { name: 'Cupcake ', price: 4, type: 'cupcake', image: './images/img\ \(15\).jpg' },
    { name: 'coffee ', price: 5, type: 'coffee', image: './images/img\ \(84\).jpg' }
];

const popularProducts = popularProducts1.map((product, index) => ({ ...product, index }));


 // Function to display products on the page with background images
 function displayProducts(products) {
    const productsContainer = document.getElementById('Product-container');
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
                    <span class="prev-price">$20</span>
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

  displayProducts(popularProducts);



// show diynamicaly coffee/cake/all items


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
  document.querySelector('.show-allProducts').onclick = () => {
      filtersApplied = false;
      displayAllProducts(productsData);
      this.onclick.preventDefault();

  };


// Function to get the filtered products based on the applied type
  document.querySelector('.show-cakeMenu').onclick = () => {
    filtersApplied = true;
    const typeFilters = ['cupcake'];
     // Filter products based on selected criteria
     const filteredProducts = productsData.filter(product => {
      const typeCondition = typeFilters.length === 0 || typeFilters.includes('all') || typeFilters.includes(product.type);    
      return  typeCondition;
  });
  displayAllProducts(filteredProducts);
  this.onclick.preventDefault();

};
 
// Function to get the filtered products based on the applied type
document.querySelector('.show-coffeeMenu').onclick = () => {
    filtersApplied = true;
    const typeFilters = ['coffee'];
     // Filter products based on selected criteria
     const filteredProducts = productsData.filter(product => {
      const typeCondition = typeFilters.length === 0 || typeFilters.includes('all') || typeFilters.includes(product.type);    
      return  typeCondition;
  });
  displayAllProducts(filteredProducts);
  this.onclick.preventDefault();

};


  // Function to display products on the page with background images
 function displayAllProducts(products) {
    const productsContainer = document.getElementById('Products-items');
    productsContainer.innerHTML = '';

    products.forEach((product) => {
        const productCard = createProductCard(product);
        productsContainer.appendChild(productCard);
    });
  }




// Array to store items in the cart
const cartItems = [];

// Add a click event listener for adding to the cart
const popularproducts = document.getElementById('Product-container');
popularproducts.addEventListener('click', (event) => {
  event.preventDefault();
  const addToCartIcon = event.target.closest('.add-to-cart-icon');
  if (addToCartIcon) {
    const productIndex = parseInt(addToCartIcon.dataset.index);
    addToCart(productIndex);
  }
});

// Add a click event listener for adding to the cart
const productsContainer = document.getElementById('Products-items');
productsContainer.addEventListener('click', (event) => {
  event.preventDefault();
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



  


 
  







});

   
