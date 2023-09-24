// const data = [
//   {
//     id: 1,
//     name: "Lakers",
//     img: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,b_rgb:f5f5f5/9acdb733-1ae2-4e49-8268-399c0cc4b46e/los-angeles-lakers-icon-edition-2022-23-dri-fit-nba-swingman-jersey-h7dqgF.png",
//     // <!-- team: "Lakers",-->
//     price: 30,
//     catagory: "Shirt",
//     size: "S",
//     color: "Yellow",
//   },
// ];

// //vars ----

// const sizeSelect = document.querySelector("#sizeSelect");
// const priceSortSelect = document.querySelector("#priceSort");
// const teamFilterSelect = document.querySelector("#teamFilter");
// const productsContainer = document.querySelector(".products");
// const categoryList = document.querySelector(".category-list");
// const priceRange = document.querySelector("#priceRange");
// const priceValue = document.querySelector(".priceValue");
// const resetFiltersButton = document.querySelector("#resetFiltersButton");


// //on size filter change
// sizeSelect.addEventListener("change", () => {
//   const selectedSize = sizeSelect.value;
//   if (selectedSize === "All") {
//     displayProducts(data);
//   } else {
//     displayProducts(data.filter((product) => product.size === selectedSize));
//   }
// });


// //on price filter change
// priceSortSelect.addEventListener("change", () => {
//   const selectedSort = priceSortSelect.value;
//   if (selectedSort === "lowToHigh") {
//     displayProducts(data.sort((a, b) => a.price - b.price));
//   } else if (selectedSort === "highToLow") {
//     displayProducts(data.sort((a, b) => b.price - a.price));
//   } else {
//     displayProducts(data); // Default sorting (as per your original code)
//   }
// });

// //on team filter change
// teamFilterSelect.addEventListener("change", () => {
//   const selectedTeam = teamFilterSelect.value;
//   if (selectedTeam === "All") {
//     displayProducts(data);
//   } else {
//     displayProducts(data.filter((product) => product.name.toLowerCase() === selectedTeam.toLowerCase()));
//   }
// });


// //setting the price slider with max price
// function setPrices() {
//   const priceList = data.map((product) => product.price);
//   const minPrice = Math.min(...priceList);
//   const maxPrice = Math.max(...priceList);
//   priceRange.min = minPrice;
//   priceRange.max = maxPrice;
//   priceValue.textContent = maxPrice + "$";

//   priceRange.addEventListener("input", (e) => {
//     priceValue.textContent = e.target.value + "$";
//     displayProducts(data.filter((product) => product.price <= e.target.value));
//   });
// }

// const txtSearch = document.querySelector("#txtSearch");
// txtSearch.addEventListener("keyup", (e) => {
//   const value = e.target.value.toLowerCase().trim();
//   if (value) {
//     displayProducts(data.filter((product) => product.name.toLowerCase().indexOf(value) !== -1));
//   } else {
//     displayProducts(data);
//   }
// });


// setPrices();



// //Default values for the filters
// const selectedFilters = {
//   size: "All",
//   priceSort: "default",
//   teamFilter: "All",
//   category: "All",
//   price: 1000, // Set an initial high value
// };

// sizeSelect.addEventListener("change", () => {
//   selectedFilters.size = sizeSelect.value;
//   updateDisplayedProducts();
// });

// priceSortSelect.addEventListener("change", () => {
//   selectedFilters.priceSort = priceSortSelect.value;
//   updateDisplayedProducts();
// });

// teamFilterSelect.addEventListener("change", () => {
//   selectedFilters.teamFilter = teamFilterSelect.value;
//   updateDisplayedProducts();
// });

// categoryList.addEventListener("click", (e) => {
//   selectedFilters.category = e.target.textContent;
//   updateDisplayedProducts();
// });

// priceRange.addEventListener("input", (e) => {
//   selectedFilters.price = parseInt(e.target.value);
//   updateDisplayedProducts();
// });


// function updateDisplayedProducts() {
//   let filteredProducts = data;

//   if (selectedFilters.size !== "All") {
//     filteredProducts = filteredProducts.filter(product => product.size === selectedFilters.size);
//   }

//   if (selectedFilters.teamFilter !== "All") {
//     filteredProducts = filteredProducts.filter(product => product.name.toLowerCase() === selectedFilters.teamFilter.toLowerCase());
//   }

//   if (selectedFilters.category !== "All") {
//     filteredProducts = filteredProducts.filter(product => product.catagory === selectedFilters.category);
//   }

//   if (selectedFilters.priceSort === "lowToHigh") {
//     filteredProducts = filteredProducts.sort((a, b) => a.amt - b.amt);
//   } else if (selectedFilters.priceSort === "highToLow") {
//     filteredProducts = filteredProducts.sort((a, b) => b.amt - a.amt);
//   }

//   filteredProducts = filteredProducts.filter(product => product.amt <= selectedFilters.price);

// }

// selectedFilters.size = "All";
// selectedFilters.priceSort = "default";
// selectedFilters.teamFilter = "All";
// selectedFilters.category = "All";
// selectedFilters.price = 9999;

// updateDisplayedProducts();


// resetFiltersButton.addEventListener("click", () => {
//   selectedFilters.size = "All";
//   selectedFilters.priceSort = "default";
//   selectedFilters.teamFilter = "All";
//   selectedFilters.category = "All";
//   selectedFilters.price = 9999;

//   // Reset the filter and sort select elements to their default values
//   sizeSelect.value = "All";
//   priceSortSelect.value = "default";
//   teamFilterSelect.value = "All";

//   // Reset the price range input to its default value
//   priceRange.value = selectedFilters.price;

//   // Update displayed products with reset filters
//   updateDisplayedProducts();
// });







