document.addEventListener('DOMContentLoaded', function () {
  const tableBodyOrders = document.getElementById('orders-tBody');
  const editButtonOrders = document.getElementById('edit-button-orders');
  const saveButtonOrders = document.getElementById('save-button-orders');
  const discardButtonOrders = document.getElementById('discard-button-orders');
  
  const tableBodyProducts = document.getElementById('products-tBody');  
  const editButtonProducts = document.getElementById('edit-button-products');
  const deleteButtonProducts = document.getElementById('delete-button-products');
  const saveButtonProducts = document.getElementById('save-button-products');
  const discardButtonProducts = document.getElementById('discard-button-products');

  const productForm = document.getElementById('productForm');

  const tableBodyUsers = document.getElementById('users-tBody');
  const editButtonUsers = document.getElementById('edit-button-users');
  const saveButtonUsers = document.getElementById('save-button-users');
  const discardButtonUsers = document.getElementById('discard-button-users');

  let isEditModeOrders = false; // Flag to track edit mode
  let isEditModeProducts = false; // Flag to track edit mode
  let isEditModeUsers = false; // Flag to track edit mode
  let isDeleteMode = false; // Flag to track edit mode
  let statusDropdowns; // Declare statusDropdowns as a global variable
  let statusValues; // Declare statusValues as a global variable

  // Sample orders data (replace this with your actual data)
  let orders = [
    {
      user: 'Omer Cohen',
      products: ['Lakers jersey', 'Suns shoes', 'NBA basketball', 'NBA cap', 'NBA socks'],
      totalPrice: 540,
      status: 'Canceled'
    },
    {
      user: 'Lior Levi',
      products: ['Warriors jersey', 'Clippers shoes', 'NBA basketball', 'NBA cap'],
      totalPrice: 370,
      status: 'Completed'
    },
    {
      user: 'Maya Ben-David',
      products: ['Celtics jersey', 'Knicks shoes'],
      totalPrice: 120,
      status: 'Pending'
    },
    {
      user: 'Avi Cohen',
      products: ['Raptors jersey', 'Bulls shoes', 'NBA socks'],
      totalPrice: 30,
      status: 'Canceled'
    },
    {
      user: 'Tali Shapira',
      products: ['Heat jersey', 'Spurs shoes', 'NBA basketball', 'NBA cap'],
      totalPrice: 450,
      status: 'Pending'
    },
    {
      user: 'David Moshe',
      products: ['Mavericks jersey', 'Nets shoes', 'NBA socks'],
      totalPrice: 180,
      status: 'Canceled'
    },
    {
      user: 'Yael Cohen',
      products: ['Magic jersey', 'Jazz shoes', 'NBA basketball', 'NBA cap', 'NBA socks'],
      totalPrice: 620,
      status: 'Canceled'
    },
    {
      user: 'Ronen Avraham',
      products: ['Wizards jersey', 'Rockets shoes', 'NBA cap'],
      totalPrice: 270,
      status: 'Completed'
    },
    {
      user: 'Shira Levy',
      products: ['Pelicans jersey', 'Grizzlies shoes'],
      totalPrice: 140,
      status: 'Canceled'
    },
    {
      user: 'Eitan Cohen',
      products: ['Hornets jersey', 'Timberwolves shoes', 'NBA socks'],
      totalPrice: 70,
      status: 'Completed'
    },
    {
      user: 'Noa Ben-David',
      products: ['76ers jersey', 'Kings shoes', 'NBA basketball', 'NBA cap'],
      totalPrice: 490,
      status: 'Canceled'
    },
    {
      user: 'Yossi Levi',
      products: ['Bucks jersey', 'Pacers shoes', 'NBA socks'],
      totalPrice: 90,
      status: 'Completed'
    },
    {
      user: 'Inbar Cohen',
      products: ['Nuggets jersey', 'Hawks shoes', 'NBA basketball', 'NBA cap'],
      totalPrice: 410,
      status: 'Canceled'
    },
    {
      user: 'Neta Shapira',
      products: ['Thunder jersey', 'Suns shoes', 'NBA cap'],
      totalPrice: 290,
      status: 'Canceled'
    },
    {
      user: 'Dorit Moshe',
      products: ['Warriors jersey', 'Clippers shoes', 'NBA socks'],
      totalPrice: 60,
      status: 'Completed'
    },
    {
      user: 'Eli Cohen',
      products: ['Celtics jersey', 'Knicks shoes'],
      totalPrice: 160,
      status: 'Pending'
    },
    {
      user: 'Mia Avraham',
      products: ['Raptors jersey', 'Bulls shoes', 'NBA basketball', 'NBA cap', 'NBA socks'],
      totalPrice: 580,
      status: 'Pending'
    },
    {
      user: 'Yotam Levy',
      products: ['Heat jersey', 'Spurs shoes', 'NBA cap'],
      totalPrice: 240,
      status: 'Completed'
    },
    {
      user: 'Lina Cohen',
      products: ['Mavericks jersey', 'Nets shoes', 'NBA socks'],
      totalPrice: 110,
      status: 'Canceled'
    },
    {
      user: 'Shimon Shapira',
      products: ['Magic jersey', 'Jazz shoes', 'NBA basketball', 'NBA cap'],
      totalPrice: 330,
      status: 'Completed'
    }
  ];

  let products = [
    {
      Name: 'Lakers Jersey',
      Price: 540,
      Description: 'Official Lakers team jersey with player name and number.',
      Size: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
      Color: 'Yellow',
      Quantity: 1000,
      Category: ['Lakers', 'Jerseys'],
      Image: '../../includes/images/LakersJersey.png'
    },
    {
      Name: 'Suns Shoes',
      Price: 370,
      Description: 'High-performance basketball shoes endorsed by the Phoenix Suns.',
      Size: ['S', 'M', 'L', 'XL'],
      Color: 'Orange',
      Quantity: 800,
      Category: ['Suns', 'Shoes'],
      Image: '../../includes/images/SunsShoes.png'
    },
    {
      Name: 'Celtics Jersey',
      Price: 280,
      Description: 'Official Celtics team jersey with player name and number.',
      Size: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
      Color: 'Green',
      Quantity: 1200,
      Category: ['Celtics', 'Jerseys'],
      Image: '../../includes/images/CelticsJersey.png'
    },
    {
      Name: 'Warriors Cap',
      Price: 30,
      Description: 'Golden State Warriors team cap with embroidered logo.',
      Size: ['S', 'M', 'L', 'XL'],
      Color: 'Blue',
      Quantity: 1500,
      Category: ['Warriors', 'Caps'],
      Image: '../../includes/images/WarriorsCap.png'
    },
    {
      Name: 'Bulls Socks',
      Price: 15,
      Description: 'Chicago Bulls-themed socks for basketball enthusiasts.',
      Size: ['S', 'M', 'L', 'XL'],
      Color: 'Red',
      Quantity: 1200,
      Category: ['Bulls', 'Socks'],
      Image: '../../includes/images/BullsSocks.png'
    },
    {
      Name: 'Raptors Jersey',
      Price: 290,
      Description: 'Official Raptors team jersey with player name and number.',
      Size: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
      Color: 'Red',
      Quantity: 800,
      Category: ['Raptors', 'Jerseys'],
      Image: '../../includes/images/RaptorsJersey.png'
    },
    {
      Name: 'Spurs Shoes',
      Price: 340,
      Description: 'San Antonio Spurs-themed high-performance basketball shoes.',
      Size: ['S', 'M', 'L', 'XL'],
      Color: 'Black',
      Quantity: 700,
      Category: ['Spurs', 'Shoes'],
      Image: '../../includes/images/SpursShoes.png'
    },
    {
      Name: 'Heat Cap',
      Price: 25,
      Description: 'Miami Heat team cap with embroidered logo.',
      Size: ['S', 'M', 'L', 'XL'],
      Color: 'Red',
      Quantity: 900,
      Category: ['Heat', 'Caps'],
      Image: '../../includes/images/HeatCap.png'
    },
    {
      Name: 'Nuggets Socks',
      Price: 15,
      Description: 'Denver Nuggets-themed socks for basketball enthusiasts.',
      Size: ['S', 'M', 'L', 'XL'],
      Color: 'Navy Blue',
      Quantity: 1000,
      Category: ['Nuggets', 'Socks'],
      Image: '../../includes/images/NuggetsSocks.png'
    },
    {
      Name: 'Hawks Jersey',
      Price: 280,
      Description: 'Official Hawks team jersey with player name and number.',
      Size: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
      Color: 'Red',
      Quantity: 800,
      Category: ['Hawks', 'Jerseys'],
      Image: '../../includes/images/HawksJersey.png'
    },
    {
      Name: 'Mavericks Shoes',
      Price: 370,
      Description: 'Dallas Mavericks-themed high-performance basketball shoes.',
      Size: ['S', 'M', 'L', 'XL'],
      Color: 'Royal Blue',
      Quantity: 600,
      Category: ['Mavericks', 'Shoes'],
      Image: '../../includes/images/MavericksShoes.png'
    },
    {
      Name: 'Pelicans Cap',
      Price: 30,
      Description: 'New Orleans Pelicans team cap with embroidered logo.',
      Size: ['S', 'M', 'L', 'XL'],
      Color: 'Navy Blue',
      Quantity: 1200,
      Category: ['Pelicans', 'Caps'],
      Image: '../../includes/images/PelicansCap.png'
    },
    {
      Name: 'Knicks Socks',
      Price: 15,
      Description: 'New York Knicks-themed socks for basketball enthusiasts.',
      Size: ['S', 'M', 'L', 'XL'],
      Color: 'Orange',
      Quantity: 1000,
      Category: ['Knicks', 'Socks'],
      Image: '../../includes/images/KnicksSocks.png'
    },
    {
      Name: 'Thunder Jersey',
      Price: 320,
      Description: 'Official Thunder team jersey with player name and number.',
      Size: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
      Color: 'Blue',
      Quantity: 800,
      Category: ['Thunder', 'Jerseys'],
      Image: '../../includes/images/ThunderJersey.png'
    },
    {
      Name: 'Timberwolves Shoes',
      Price: 360,
      Description: 'Minnesota Timberwolves-themed high-performance basketball shoes.',
      Size: ['S', 'M', 'L', 'XL'],
      Color: 'Forest Green',
      Quantity: 600,
      Category: ['Timberwolves', 'Shoes'],
      Image: '../../includes/images/TimberwolvesShoes.png'
    },
    {
      Name: 'Magic Cap',
      Price: 25,
      Description: 'Orlando Magic team cap with embroidered logo.',
      Size: ['S', 'M', 'L', 'XL'],
      Color: 'Blue',
      Quantity: 900,
      Category: ['Magic', 'Caps'],
      Image: '../../includes/images/MagicCap.png'
    },
    {
      Name: 'Jazz Socks',
      Price: 15,
      Description: 'Utah Jazz-themed socks for basketball enthusiasts.',
      Size: ['S', 'M', 'L', 'XL'],
      Color: 'Purple',
      Quantity: 1100,
      Category: ['Jazz', 'Socks'],
      Image: '../../includes/images/JazzSocks.png'
    },
    {
      Name: 'Wizards Jersey',
      Price: 310,
      Description: 'Official Wizards team jersey with player name and number.',
      Size: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
      Color: 'Red',
      Quantity: 800,
      Category: ['Wizards', 'Jerseys'],
      Image: '../../includes/images/WizardsJersey.png'
    },
    {
      Name: 'Rockets Shoes',
      Price: 360,
      Description: 'Houston Rockets-themed high-performance basketball shoes.',
      Size: ['S', 'M', 'L', 'XL'],
      Color: 'Red',
      Quantity: 700,
      Category: ['Rockets', 'Shoes'],
      Image: '../../includes/images/RocketsShoes.png'
    },
    {
      Name: 'Grizzlies Cap',
      Price: 30,
      Description: 'Memphis Grizzlies team cap with embroidered logo.',
      Size: ['S', 'M', 'L', 'XL'],
      Color: 'Navy Blue',
      Quantity: 900,
      Category: ['Grizzlies', 'Caps'],
      Image: '../../includes/images/GrizzliesCap.png'
    },
    {
      Name: '76ers Socks',
      Price: 15,
      Description: 'Philadelphia 76ers-themed socks for basketball enthusiasts.',
      Size: ['S', 'M', 'L', 'XL'],
      Color: 'Blue',
      Quantity: 1200,
      Category: ['76ers', 'Socks'],
      Image: '../../includes/images/76ersSocks.png'
    }
  ];

  let users = [
    {
        name: 'Yossi Cohen',
        email: 'yossi@example.com',
        password: 'password123',
        address: 'Keren Kayemet Leisrael 18, Rishon Lezion, 7528642',
        orderHistory: [],
        isAdmin: true,
        tokens: []
    },
    {
        name: 'David Levi',
        email: 'david@example.com',
        password: 'password123',
        address: 'Herzl 5, Tel Aviv, 6209801',
        orderHistory: [],
        isAdmin: false,
        tokens: []
    },
    {
        name: 'Sarah Goldman',
        email: 'sarah@example.com',
        password: 'password123',
        address: 'Ben Gurion 12, Jerusalem, 3300000',
        orderHistory: [],
        isAdmin: false,
        tokens: []
    },
    {
        name: 'Avraham Katz',
        email: 'avraham@example.com',
        password: 'password123',
        address: 'Dizengoff 30, Tel Aviv, 6209801',
        orderHistory: [],
        isAdmin: true,
        tokens: []
    },
    {
        name: 'Ruth Weiss',
        email: 'ruth@example.com',
        password: 'password123',
        address: 'Rabin 7, Haifa, 4810118',
        orderHistory: [],
        isAdmin: true,
        tokens: []
    },
    {
        name: 'Eli Rosenberg',
        email: 'eli@example.com',
        password: 'password123',
        address: 'Hayarkon 15, Tel Aviv, 6209801',
        orderHistory: [],
        isAdmin: false,
        tokens: []
    },
    {
        name: 'Leah Friedman',
        email: 'leah@example.com',
        password: 'password123',
        address: 'Allenby 22, Tel Aviv, 6209801',
        orderHistory: [],
        isAdmin: true,
        tokens: []
    },
    {
        name: 'Yael Segal',
        email: 'yael@example.com',
        password: 'password123',
        address: 'Keren Kayemet Leisrael 1, Jerusalem, 3300000',
        orderHistory: [],
        isAdmin: false,
        tokens: []
    },
    {
        name: 'Yair Golan',
        email: 'yair@example.com',
        password: 'password123',
        address: 'Herzl 10, Tel Aviv, 6209801',
        orderHistory: [],
        isAdmin: false,
        tokens: []
    },
    {
        name: 'Tamar Zohar',
        email: 'tamar@example.com',
        password: 'password123',
        address: 'Dizengoff 45, Tel Aviv, 6209801',
        orderHistory: [],
        isAdmin: true,
        tokens: []
    }
];

  // Keep track of the original status values
  statusValues = orders.map((order) => order.status);

  function addTableRow(order, index, table) {
    const row = table.insertRow();
    const userCell = row.insertCell(0);
    const productsCell = row.insertCell(1);
    const totalPriceCell = row.insertCell(2);
    const statusCell = row.insertCell(3);
    statusCell.classList.add('status-cell'); // Add a class for status cells

    // Swap the positions of users and orders
    userCell.textContent = order.user;
    productsCell.textContent = order.products.join(', ');
    totalPriceCell.textContent = order.totalPrice;

    // Create a container div for status cell content
    const statusContainer = document.createElement('div');
    statusContainer.classList.add('status-cell-content');

    // Create a span for displaying the current status text
    const statusText = document.createElement('span');
    statusText.classList.add('status-text');
    statusText.textContent = order.status;

    // Create a dropdown for changing status (in edit mode)
    const statusDropdown = document.createElement('select');
    statusDropdown.classList.add('status-dropdown');

    const statusOptions = ['Pending', 'Completed', 'Canceled'];

    for (const option of statusOptions) {
      const optionElement = document.createElement('option');
      optionElement.value = option;
      optionElement.textContent = option;

      // Set the selected option based on the order's status
      if (option === order.status) {
        optionElement.selected = true;
      }

      statusDropdown.appendChild(optionElement);
    }

    // Add status text and dropdown to the container
    statusContainer.appendChild(statusText);
    statusContainer.appendChild(statusDropdown);

    statusCell.appendChild(statusContainer);

    // Update status background (in non-edit mode)
    updateStatusBackground(statusCell, order.status);

    statusText.style.display = isEditModeOrders ? 'none' : 'block';
    statusDropdown.style.display = isEditModeOrders ? 'block' : 'none';

    // Add event listener to update status background (in edit mode)
    statusDropdown.addEventListener('change', function () {
      updateStatusBackground(statusCell, this.value);
      // Update the status values array
      statusValues[index] = this.value;
    });
  }

  function updateStatusBackground(cell, status) {
    if (status === 'Pending') {
      cell.style.backgroundColor = 'yellow';
    } else if (status === 'Completed') {
      cell.style.backgroundColor = 'green';
    } else if (status === 'Canceled') {
      cell.style.backgroundColor = 'red';
    } else {
      cell.style.backgroundColor = ''; // Reset to the default background color
    }
  }

  function toggleEditModeOrders() {
    isEditModeOrders = !isEditModeOrders;

    const statusCells = document.querySelectorAll('.status-cell-content');
    const statusTexts = document.querySelectorAll('.status-text');
    statusDropdowns = document.querySelectorAll('.status-dropdown'); // Update statusDropdowns

    // Toggle visibility of buttons and status cells
    editButtonOrders.style.display = isEditModeOrders ? 'none' : 'block';
    saveButtonOrders.style.display = isEditModeOrders ? 'block' : 'none';
    discardButtonOrders.style.display = isEditModeOrders ? 'block' : 'none';

    // Toggle visibility of status cells and dropdowns
    if (isEditModeOrders) {
      statusTexts.forEach((text) => {
        text.style.display = 'none';
      });
      statusDropdowns.forEach((dropdown) => {
        dropdown.style.display = 'block';
      });
    } else {
      statusTexts.forEach((text) => {
        text.style.display = 'block';
      });
      statusDropdowns.forEach((dropdown) => {
        dropdown.style.display = 'none';
      });
    }
  }
  
  function toggleEditModeProducts() {
    isEditModeProducts = !isEditModeProducts;
  
    // Toggle visibility of buttons and status cells
    editButtonProducts.style.display = isEditModeProducts ? 'none' : 'block';
    deleteButtonProducts.style.display = isEditModeProducts ? 'none' : 'block';
    saveButtonProducts.style.display = isEditModeProducts ? 'block' : 'none';
    discardButtonProducts.style.display = isEditModeProducts ? 'block' : 'none';
  
    const nameCells = document.querySelectorAll('#products-table tbody tr td:nth-child(1)'); // Select all product name cells
    const priceCells = document.querySelectorAll('#products-table tbody tr td:nth-child(2)'); // Select all product name cells
    const descCells = document.querySelectorAll('#products-table tbody tr td:nth-child(3)'); // Select all product name cells
    const sizeCells = document.querySelectorAll('#products-table tbody tr td:nth-child(4)'); // Select all product name cells
    const colorCells = document.querySelectorAll('#products-table tbody tr td:nth-child(5)'); // Select all product name cells
    const quantCells = document.querySelectorAll('#products-table tbody tr td:nth-child(6)'); // Select all product name cells
    const categCells = document.querySelectorAll('#products-table tbody tr td:nth-child(7)'); // Select all product name cells
    const imageCells = document.querySelectorAll('#products-table tbody tr td:nth-child(8)'); // Select all product name cells
  
    if (isEditModeProducts) {
      // Enter edit mode for product names
      nameCells.forEach((cell) => {
        // Create an input element and set its value to the current cell's content
        const input = document.createElement('input');
        input.value = cell.textContent.trim();
  
        // Replace the cell's content with the input element
        cell.innerHTML = '';
        cell.appendChild(input);
      });
      priceCells.forEach((cell) => {
        // Create an input element and set its value to the current cell's content
        const input = document.createElement('input');
        input.value = cell.textContent.trim();
  
        // Replace the cell's content with the input element
        cell.innerHTML = '';
        cell.appendChild(input);
      });
      descCells.forEach((cell) => {
        // Create an input element and set its value to the current cell's content
        const input = document.createElement('input');
        input.value = cell.textContent.trim();
  
        // Replace the cell's content with the input element
        cell.innerHTML = '';
        cell.appendChild(input);
      });
      sizeCells.forEach((cell) => {
        // Create an input element and set its value to the current cell's content
        const input = document.createElement('input');
        input.value = cell.textContent.trim();
  
        // Replace the cell's content with the input element
        cell.innerHTML = '';
        cell.appendChild(input);
      });
      colorCells.forEach((cell) => {
        // Create an input element and set its value to the current cell's content
        const input = document.createElement('input');
        input.value = cell.textContent.trim();
  
        // Replace the cell's content with the input element
        cell.innerHTML = '';
        cell.appendChild(input);
      });
      quantCells.forEach((cell) => {
        // Create an input element and set its value to the current cell's content
        const input = document.createElement('input');
        input.value = cell.textContent.trim();
  
        // Replace the cell's content with the input element
        cell.innerHTML = '';
        cell.appendChild(input);
      });
      categCells.forEach((cell) => {
        // Create an input element and set its value to the current cell's content
        const input = document.createElement('input');
        input.value = cell.textContent.trim();
  
        // Replace the cell's content with the input element
        cell.innerHTML = '';
        cell.appendChild(input);
      });
      imageCells.forEach((cell) => {
        const img = cell.querySelector('img');
      
        // Create an input element for editing the image source
        const input = document.createElement('input');
        input.type = 'text';
        input.value = getRelativePath(img.src); // Get the relative path initially
      
        // Replace the cell's content with the input element
        cell.innerHTML = '';
        cell.appendChild(input);
      
        // Add an event listener to update the image source when the input changes
        input.addEventListener('input', function () {
          img.src = getAbsolutePath(this.value); // Update the image's src
        });
      });     
    } else {
      saveChangesToProducts(nameCells, priceCells, descCells, sizeCells, colorCells, quantCells, categCells, imageCells);
    }
  }
  
  function toggleEditModeUsers() {
    isEditModeUsers = !isEditModeUsers;
  
    editButtonUsers.style.display = isEditModeUsers ? 'none' : 'block';
    saveButtonUsers.style.display = isEditModeUsers ? 'block' : 'none';
    discardButtonUsers.style.display = isEditModeUsers ? 'block' : 'none';
  
    const checkboxCells = document.querySelectorAll('#users-tBody td:nth-child(3)'); // Select the third column (checkboxes)
  
    if (isEditModeUsers) {
      // Enter edit mode for checkboxes
      checkboxCells.forEach((cell) => {
        // Create a checkbox element
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
  
        // Set the checkbox state based on the cell's background color
        checkbox.checked = cell.style.backgroundColor === 'green';
  
        // Replace the cell's content with the checkbox element
        cell.innerHTML = '';
        cell.appendChild(checkbox);
  
        // Add an event listener to update the background color when the checkbox is clicked
        checkbox.addEventListener('change', function () {
          if (this.checked) {
            cell.style.backgroundColor = 'green';
          } else {
            cell.style.backgroundColor = 'red';
          }
        });
      });
    } else {
      // Exit edit mode for checkboxes
      checkboxCells.forEach((cell) => {
        // Update the background color based on the checkbox state
        if (cell.querySelector('input[type="checkbox"]').checked) {
          cell.style.backgroundColor = 'green';
        } else {
          cell.style.backgroundColor = 'red';
        }
      });
    }
  }
  

  function getRelativePath(absoluteURL) {
    const currentURL = new URL(window.location.href);
    const absolutePath = new URL(absoluteURL, currentURL);
  
    const currentPath = currentURL.pathname.split('/');
    const absolutePathParts = absolutePath.pathname.split('/');
  
    // Calculate the relative path by counting the number of common path parts
    let relativePath = '';
  
    for (let i = 0; i < currentPath.length ; i++) {
      relativePath += '../';
    }
  
    for (let i = 1; i < absolutePathParts.length; i++) {
      relativePath += absolutePathParts[i];
      if (i < absolutePathParts.length - 1) {
        relativePath += '/';
      }
    }
  
    return relativePath;
  }
  
  function getAbsolutePath(relativePath) {
    const currentURL = new URL(window.location.href);
    const currentPath = currentURL.pathname.split('/');
    const relativePathParts = relativePath.split('/');
  
    // Calculate the absolute path by counting the number of ".." in the relative path
    let absolutePath = currentURL.origin + currentURL.pathname;
  
    for (let i = 0; i < relativePathParts.length; i++) {
      if (relativePathParts[i] === '..') {
        absolutePath = absolutePath.substring(0, absolutePath.lastIndexOf('/'));
      } else {
        absolutePath += '/' + relativePathParts[i];
      }
    }
  
    return absolutePath;
  }
  
  function saveChangesToProducts(nameCells, priceCells, descCells, sizeCells, colorCells, quantCells, categCells, imageCells) {
    for (let i = 0; i < products.length; i++) {
      // Update the product name
      const nameInput = nameCells[i].querySelector('input');
      products[i].Name = nameInput.value;
      nameCells[i].textContent = nameInput.value;
  
      // Update the product price
      const priceInput = priceCells[i].querySelector('input');
      products[i].Price = parseFloat(priceInput.value);
      priceCells[i].textContent = priceInput.value;
  
      // Update the product description
      const descInput = descCells[i].querySelector('input');
      products[i].Description = descInput.value;
      descCells[i].textContent = descInput.value;
  
      // Update the product size (parse it as an array)
      const sizeInput = sizeCells[i].querySelector('input');
      products[i].Size = sizeInput.value.split(',').map((size) => size.trim());
      sizeCells[i].textContent = products[i].Size.join(', ');
  
      // Update the product color
      const colorInput = colorCells[i].querySelector('input');
      products[i].Color = colorInput.value;
      colorCells[i].textContent = colorInput.value;
  
      // Update the product quantity (parse it as an integer)
      const quantInput = quantCells[i].querySelector('input');
      products[i].Quantity = parseInt(quantInput.value, 10);
      quantCells[i].textContent = products[i].Quantity;
  
      // Update the product category (parse it as an array)
      const categInput = categCells[i].querySelector('input');
      products[i].Category = categInput.value.split(',').map((category) => category.trim());
      categCells[i].textContent = products[i].Category.join(', ');
  
      // Update the product image source
      const img = imageCells[i].querySelector('img');
      const input = imageCells[i].querySelector('input');
  
      if (img) {
        img.src = getAbsolutePath(input.value);
      }
    }
  
    // Regenerate the products table
    generateProductsTable();
  }
  
  

  // Event listener for Edit button
  editButtonOrders.addEventListener('click', toggleEditModeOrders);
  editButtonProducts.addEventListener('click', toggleEditModeProducts);
  editButtonUsers.addEventListener('click', toggleEditModeUsers);

  // Event listener for Save button
  saveButtonOrders.addEventListener('click', function () {
    // Save changes and exit edit mode
    toggleEditModeOrders();

    // Update the orders array with the new status values
    statusDropdowns = document.querySelectorAll('.status-dropdown'); // Update statusDropdowns
    statusDropdowns.forEach((dropdown, index) => {
      orders[index].status = dropdown.value;
    });

    // Regenerate the table based on the updated orders array
    generateTable();
  });
  
  saveButtonProducts.addEventListener('click', function () {
    // Save changes and exit edit mode
    toggleEditModeProducts();

    // Regenerate the table based on the updated products array
    generateProductsTable();
  });

  saveButtonUsers.addEventListener('click', function () {
    if (isEditModeUsers) {
      // Exit edit mode
      toggleEditModeUsers();
  
      // Get all the rows in the user table
      const rows = tableBodyUsers.querySelectorAll('tr');
  
      // Loop through each row to update the isAdmin field
      rows.forEach((row, index) => {
        const cells = row.querySelectorAll('td'); // Select all cells in the row
        const adminCell = cells[2];
  
        // Get the updated value from the checkbox
        const isAdmin = adminCell.querySelector('input[type="checkbox"]').checked;
  
        // Update the isAdmin field in the corresponding user object in your 'users' array
        users[index].isAdmin = isAdmin;
  
        // Update the background color based on admin status
        if (isAdmin) {
          adminCell.style.backgroundColor = 'green';
        } else {
          adminCell.style.backgroundColor = 'red';
        }
      });
      generateUsersTable();
    }
  });
  
  // Event listener for Delete button
  deleteButtonProducts.addEventListener('click', function () {
    editButtonProducts.style.display = !isDeleteMode ? 'none' : 'block';
    if (!isDeleteMode) {
        // Set isDeleteMode to true
        isDeleteMode = true;

        // Change the content of the delete button to "Finish Deleting Products"
        deleteButtonProducts.textContent = 'Finish Deleting Products';

        // Show the 9th column of the table
        showNinthColumn(true);
    } else {
        // Set isDeleteMode back to false
        isDeleteMode = false;

        // Change the content of the delete button back to "Delete Products"
        deleteButtonProducts.textContent = 'Delete Products';

        // Hide the 9th column of the table
        showNinthColumn(false);
    }
});

// Function to show/hide the 9th column of the table
function showNinthColumn(show) {
  const rows = tableBodyProducts.querySelectorAll('tr');
  const deleteTh = document.getElementById('deleteTh');  

  deleteTh.style.display = show ? 'block' : 'none';

  rows.forEach(function (row) {
      const cells = row.querySelectorAll('td, th'); // Include both <td> and <th> elements
      if (cells.length > 8) {
          // Use cells[8] to access the 9th column
          cells[8].style.display = show ? 'block' : 'none';
      }
  });
  generateProductsTable();
}


  
  discardButtonOrders.addEventListener('click', function () {
    // Discard changes and exit edit mode
    toggleEditModeOrders();
    statusDropdowns = document.querySelectorAll('.status-dropdown'); // Update statusDropdowns
    
    statusDropdowns.forEach((dropdown, index) => {
      // Reset the dropdown value to the original status value
      dropdown.value = statusValues[index];
      // Reset the background color when discarding changes
      const statusCell = dropdown.closest('.status-cell');
      updateStatusBackground(statusCell, statusValues[index]);
    });
    generateTable();
  });
  
  discardButtonUsers.addEventListener('click', function () {
    toggleEditModeUsers();
    
    generateUsersTable();
  });
  
  // Function to generate the table based on the orders array
  function generateTable() {
    tableBodyOrders.innerHTML = ''; // Clear the table
    
    for (let i = 0; i < orders.length; i++) {
      addTableRow(orders[i], i, tableBodyOrders);
    }
  }
  
  function discardChangesToProducts(nameCells, priceCells, descCells, sizeCells, colorCells, quantCells, categCells, imageCells) {
    for (let i = 0; i < products.length; i++) {
      // Restore the original values in each cell
      nameCells[i].textContent = products[i].Name;
      priceCells[i].textContent = products[i].Price;
      descCells[i].textContent = products[i].Description;
      sizeCells[i].textContent = products[i].Size.join(', ');
      colorCells[i].textContent = products[i].Color;
      quantCells[i].textContent = products[i].Quantity;
      categCells[i].textContent = products[i].Category.join(', ');
  
      // If there was an image input, revert it as well
      const img = document.createElement('img');
      const input = imageCells[i].querySelector('input');
      if (input) {
        img.src = products[i].Image; // Revert the image source
        img.alt = products[i].Name;
        imageCells[i].innerHTML = ''; // Clear the cell
        imageCells[i].appendChild(img); // Append the image element
      }
    }
  }
  
  
  // Event listener for Discard button for products
  discardButtonProducts.addEventListener('click', function () {
    // Discard changes and exit edit mode
    isEditModeProducts = false;

    editButtonProducts.style.display = isEditModeProducts ? 'none' : 'block';
    deleteButtonProducts.style.display = isEditModeProducts ? 'none' : 'block';
    saveButtonProducts.style.display = isEditModeProducts ? 'block' : 'none';
    discardButtonProducts.style.display = isEditModeProducts ? 'block' : 'none';
  
    // Revert the product table to its original state
    const nameCells = document.querySelectorAll('#products-table tbody tr td:nth-child(1)');
    const priceCells = document.querySelectorAll('#products-table tbody tr td:nth-child(2)');
    const descCells = document.querySelectorAll('#products-table tbody tr td:nth-child(3)');
    const sizeCells = document.querySelectorAll('#products-table tbody tr td:nth-child(4)');
    const colorCells = document.querySelectorAll('#products-table tbody tr td:nth-child(5)');
    const quantCells = document.querySelectorAll('#products-table tbody tr td:nth-child(6)');
    const categCells = document.querySelectorAll('#products-table tbody tr td:nth-child(7)');
    const imageCells = document.querySelectorAll('#products-table tbody tr td:nth-child(8)');
  
    discardChangesToProducts(nameCells, priceCells, descCells, sizeCells, colorCells, quantCells, categCells, imageCells);
  });
  
  
  // Initial table generation
  generateTable();
  
  function generateProductsTable() {
    tableBodyProducts.innerHTML = ''; // Clear the table
    
    for (let i = 0; i < products.length; i++) {
      addProductTableRow(products[i], tableBodyProducts, i);
    }
  }
  
  function generateUsersTable() {
    tableBodyUsers.innerHTML = ''; // Clear the table
    
    for (let i = 0; i < users.length; i++) {
      addUserTableRow(users[i], tableBodyUsers);
    }
  }

  // Function to add a row to the products table
  function addProductTableRow(product, table, num) {
    const row = table.insertRow();
    const nameCell = row.insertCell(0);
    const priceCell = row.insertCell(1);
    const descriptionCell = row.insertCell(2);
    const sizeCell = row.insertCell(3);
    const colorCell = row.insertCell(4);
    const quantityCell = row.insertCell(5);
    const categoryCell = row.insertCell(6);
    const imageCell = row.insertCell(7);
    const buttonCell = row.insertCell(8); // Add a cell for the button

    nameCell.textContent = product.Name;
    priceCell.textContent = product.Price;
    descriptionCell.textContent = product.Description;
    sizeCell.textContent = product.Size.join(', ');
    colorCell.textContent = product.Color;
    quantityCell.textContent = product.Quantity;
    categoryCell.textContent = product.Category.join(', ');

    // Create an image element and set its source
    const image = document.createElement('img');
    image.src = product.Image;
    image.alt = product.Name;
    imageCell.appendChild(image);

    // Create the button element
    const button = document.createElement('button');
    button.style.backgroundColor = 'red'; // Red background
    button.style.borderRadius = '50%'; // Round edges
    button.style.color = 'white'; // White text color
    button.id = num; // Set the ID as 'num'
    button.textContent = '-';
    button.addEventListener('click', () => removeRow(num)); // Call removeRow() on click
    
    // Add the button to the button cell
    buttonCell.appendChild(button);
    if(!isDeleteMode){
      buttonCell.style.display = 'none';
    }
}
  // Function to add a row to the users table
  function addUserTableRow(user, table) {
    const row = table.insertRow();
    const nameCell = row.insertCell(0);
    const emailCell = row.insertCell(1);
    const adminCell = row.insertCell(2);

    nameCell.textContent = user.name;
    emailCell.textContent = user.email;
    adminCell.textContent = user.isAdmin;
    if(user.isAdmin){
      adminCell.style.backgroundColor = 'green';
    } else {
      adminCell.style.backgroundColor = 'red';
    }
}

// Example removeRow function
function removeRow(num) {
      products.splice(num, 1);
      generateProductsTable();
}

  // Initial products table generation
  generateProductsTable();

  productForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const productName = document.getElementById('productName').value;
    const productPrice = parseFloat(document.getElementById('productPrice').value);
    const productDescription = document.getElementById('productDescription').value;

    // Collect selected sizes from checkboxes
    const selectedSizes = [];
    document.querySelectorAll('[type="checkbox"]:checked').forEach(function (checkbox) {
        selectedSizes.push(checkbox.value);
    });

    const productColor = document.getElementById('productColor').value;
    const productQuantity = parseInt(document.getElementById('productQuantity').value);
    const productCategory = document.getElementById('productCategory').value;
    const productImage = document.getElementById('productImage').value;

    const newProduct = {
        Name: productName,
        Price: productPrice,
        Description: productDescription,
        Size: selectedSizes,
        Color: productColor,
        Quantity: productQuantity,
        Category: [productCategory],
        Image: productImage,
    };

    products.push(newProduct);
    // Optionally, you can reset the form after adding the product
    productForm.reset();

    // This function should handle updating the table with the new product data
    generateProductsTable();
    
  });
  
  // This function should handle updating the table with the new user data
  generateUsersTable();
});