
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
  let currentEditedProductRow = -1; // Flag to track edit mode
  let isEditModeUsers = false; // Flag to track edit mode
  let isDeleteMode = false; // Flag to track edit mode
  let statusDropdowns; // Declare statusDropdowns as a global variable
  let statusValues; // Declare statusValues as a global variable
  let userAdminEdit = []; //array for the users admin status with their id

  // Sample orders data (replace this with your actual data)
  let orders = [
    {
      user: 'Omer Cohen',
      products: ['Lakers jersey', 'Suns shoes', 'NBA basketball', 'NBA cap', 'NBA socks'],
      totalPrice: 540,
      status: 'Canceled'
    }
  ];

//saving the cookie token
let token = document.cookie.split(';').map(cookie => cookie.trim()).find(item => item.split('=')[0] == 'token').split('=')[1];

//fetching all the users from the database and displaying them in the table
function fetchUserData(){
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: '/user/users',
      async: true,
      headers: {
        "Authorization": "Bearer " + JSON.parse(token)
      },
      success: function (res) {
        if(Array.isArray(res) && res.length > 0){
          resolve(res);
        }else{
          reject(new Error("Recieved an empty array"));
        }
      },
      error: function (error) {
        reject(error);
      }
    });
  });
}

//fetching all the products from the database and displaying them in the table
function fetchProductData(){
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: '/product/products',
      async: true,
      success: function (res) {
        if(Array.isArray(res) && res.length > 0){
          resolve(res);
        }else{
          reject(new Error("Recieved an empty array"));
        }
      },
      error: function (error) {
        reject(error);
      }
    });
  });
}


// Keep track of the original status values
statusValues = orders.map((order) => order.status);

//adding rows to the table - being used in the generateTable function which activates after each change in the table
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
//-------------------------------------------------------



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
  
function toggleEditModeProducts(rowNum) {
  isEditModeProducts = !isEditModeProducts;
  currentEditedProductRow = rowNum;

  // Toggle visibility of buttons and status cells
  // editButtonProducts.style.display = isEditModeProducts ? 'none' : 'block';
  deleteButtonProducts.style.display = isEditModeProducts ? 'none' : 'block';
  saveButtonProducts.style.display = isEditModeProducts ? 'block' : 'none';
  discardButtonProducts.style.display = isEditModeProducts ? 'block' : 'none';

  const row = document.querySelectorAll(`#products-table tbody tr`)[rowNum];
  const nameCell = document.querySelectorAll(`#products-table tbody tr td:nth-child(1)`)[rowNum]; 
  const priceCell = document.querySelectorAll(`#products-table tbody tr td:nth-child(2)`)[rowNum];
  const descCell = document.querySelectorAll(`#products-table tbody tr td:nth-child(3)`)[rowNum];
  const sizeCell = document.querySelectorAll(`#products-table tbody tr td:nth-child(4)`)[rowNum];
  const colorCell = document.querySelectorAll(`#products-table tbody tr td:nth-child(5)`)[rowNum];
  const teamCell = document.querySelectorAll(`#products-table tbody tr td:nth-child(6)`)[rowNum];
  const categCell = document.querySelectorAll(`#products-table tbody tr td:nth-child(7)`)[rowNum];

  if (isEditModeProducts) {
    // Create an input element and set its value to the current cell's content
    const input1 = document.createElement('input');
    input1.classList.add('editInput');
    nameCell.style.fontSize = '0';
    input1.value = nameCell.textContent.trim();
    // Replace the cell's content with the input element
    // nameCell.innerHTML = '';
    nameCell.appendChild(input1);

    // Create an input element and set its value to the current cell's content
    const input2 = document.createElement('input');
    input2.value = priceCell.textContent.trim();
    input2.classList.add('editInput');
    
    // Replace the cell's content with the input element
    priceCell.style.fontSize = '0';
    priceCell.appendChild(input2);


    // Create an input element and set its value to the current cell's content
    const input3 = document.createElement('input');
    input3.value = descCell.textContent.trim();
    input3.classList.add('editInput');
    
    // Replace the cell's content with the input element
    descCell.style.fontSize = '0';
    descCell.appendChild(input3);


    // Create an input element and set its value to the current cell's content
    const input4 = document.createElement('input');
    input4.value = sizeCell.textContent.trim();
    input4.classList.add('editInput');
    
    // Replace the cell's content with the input element
    sizeCell.style.fontSize = '0';
    sizeCell.appendChild(input4);


    // Create an input element and set its value to the current cell's content
    const input5 = document.createElement('input');
    input5.value = colorCell.textContent.trim();
    input5.classList.add('editInput');
    
    // Replace the cell's content with the input element
    colorCell.style.fontSize = '0';
    colorCell.appendChild(input5);


    // Create an input element and set its value to the current cell's content
    const input6 = document.createElement('input');
    input6.value = teamCell.textContent.trim();
    input6.classList.add('editInput');
    
    
    // Replace the cell's content with the input element
    teamCell.style.fontSize = '0';
    teamCell.appendChild(input6);


    // Create an input element and set its value to the current cell's content
    const input7 = document.createElement('input');
    input7.value = categCell.textContent.trim();
    input7.classList.add('editInput');
    
    // Replace the cell's content with the input7 element
    categCell.style.fontSize = '0';
    categCell.appendChild(input7);


  } else {
    saveChangesToProducts(row, nameCell, priceCell, descCell, sizeCell, colorCell, teamCell, categCell);
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
        //saving the tr id of the user, and saving it in a hashmap
        //{id:asfasf, checked:true/false}
        checkbox.addEventListener('change', function () {
          let userId = cell.parentElement.getAttribute('data-id');
          if (this.checked) {
            userAdminEdit.push({id: userId, checked: true});
            cell.style.backgroundColor = 'green';
          } else {
            let res = userAdminEdit.find(edit => edit.id === userId);
            if (res) {
              res.checked = false;
            } else
              userAdminEdit.push({id: userId, checked: false});
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
  
  function saveChangesToProducts(row, nameCell, priceCell, descCell, sizeCell, colorCell, teamCell, categCell) {
    let productsData = {};

    // Update the product name
    const nameInput = nameCell.querySelector('input');
    productsData.name = nameInput.value;

    // Update the product price
    const priceInput = priceCell.querySelector('input');
    productsData.price = parseFloat(priceInput.value);

    // Update the product description
    const descInput = descCell.querySelector('input');
    productsData.description = descInput.value;

    // Update the product size (parse it as an array)
    const sizeInput = sizeCell.querySelector('input');
    productsData.size = sizeInput.value.split(',').map((size) => size.trim());

    // Update the product color
    const colorInput = colorCell.querySelector('input');
    productsData.color = colorInput.value;

    // Update the product quantity (parse it as an integer)
    const teamInput = teamCell.querySelector('input');
    productsData.team = teamInput.value;

    // Update the product category (parse it as an array)
    const categInput = categCell.querySelector('input');
    productsData.category = categInput.value;
  
    //updating the db with only the product that has been changed
    $.ajax({
      type: 'PATCH',
      url: '/product/update',
      data: { _id: row.getAttribute('data-id'), product: productsData },
      headers: {
        "Authorization": "Bearer " + JSON.parse(token)
      },
      success: function (res) {
        generateProductsTable();
      },
      error: function (error) {
        console.log(error)
      }
    });

    // Regenerate the products table
  }
  
  

  // Event listener for Edit button
  editButtonOrders.addEventListener('click', toggleEditModeOrders);
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
    toggleEditModeProducts(currentEditedProductRow);

    // Regenerate the table based on the updated products array
    // generateProductsTable();
  });

  //saving the changes to the users admin status
  saveButtonUsers.addEventListener('click', function () {
    if (isEditModeUsers) {
      // Exit edit mode
      toggleEditModeUsers();

      //updating the db with only the users that have been changed
      $.ajax({
        type: 'PATCH',
        url: '/admin/adminupdate',
        data: {userAdminEdit},
        headers: {
          "Authorization": "Bearer " + JSON.parse(token)
        },
        success: function (res) {},
        error: function (error) {
          console.log(error)
        }
      });
  
      // Get all the rows in the user table
      const rows = tableBodyUsers.querySelectorAll('tr');
  
      // Loop through each row to update the isAdmin field
      rows.forEach((row, index) => {
        // Update the background color based on admin status
        const cells = row.querySelectorAll('td'); // Select all cells in the row
        const adminCell = cells[2];

        // Get the updated value from the checkbox
        const isAdmin = adminCell.querySelector('input[type="checkbox"]').checked;

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
    // editButtonProducts.style.display = !isDeleteMode ? 'none' : 'block';
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
    //resetting the admin status of the users
    userAdminEdit = [];
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

  
  
  // Event listener for Discard button for products
  discardButtonProducts.addEventListener('click', function () {
    // Discard changes and exit edit mode
    isEditModeProducts = false;

    // editButtonProducts.style.display = isEditModeProducts ? 'none' : 'block';
    deleteButtonProducts.style.display = isEditModeProducts ? 'none' : 'block';
    saveButtonProducts.style.display = isEditModeProducts ? 'block' : 'none';
    discardButtonProducts.style.display = isEditModeProducts ? 'block' : 'none';

    const nameCell = document.querySelectorAll(`#products-table tbody tr td:nth-child(1)`)[currentEditedProductRow]; 
    const priceCell = document.querySelectorAll(`#products-table tbody tr td:nth-child(2)`)[currentEditedProductRow];
    const descCell = document.querySelectorAll(`#products-table tbody tr td:nth-child(3)`)[currentEditedProductRow];
    const sizeCell = document.querySelectorAll(`#products-table tbody tr td:nth-child(4)`)[currentEditedProductRow];
    const colorCell = document.querySelectorAll(`#products-table tbody tr td:nth-child(5)`)[currentEditedProductRow];
    const teamCell = document.querySelectorAll(`#products-table tbody tr td:nth-child(6)`)[currentEditedProductRow];
    const categCell = document.querySelectorAll(`#products-table tbody tr td:nth-child(7)`)[currentEditedProductRow];
  
    // Discarding the changes by deleting the input elements and showing the original data
    nameCell.removeChild(nameCell.querySelector('input'));
    nameCell.removeAttribute('style');

    priceCell.removeChild(priceCell.querySelector('input'));
    priceCell.removeAttribute('style');

    descCell.removeChild(descCell.querySelector('input'));
    descCell.removeAttribute('style');

    sizeCell.removeChild(sizeCell.querySelector('input'));
    sizeCell.removeAttribute('style');

    colorCell.removeChild(colorCell.querySelector('input'));
    colorCell.removeAttribute('style');

    teamCell.removeChild(teamCell.querySelector('input'));
    teamCell.removeAttribute('style');

    categCell.removeChild(categCell.querySelector('input'));
    categCell.removeAttribute('style');

    //resetting the currentEditedProductRow
    currentEditedProductRow = -1;
  });
  
  
  // Initial table generation
  generateTable();
  
  function generateProductsTable() {
    tableBodyProducts.innerHTML = ''; // Clear the table

    fetchProductData()
      .then((productsData) => {
        for (let i = 0; i < productsData.length; i++) {
          addProductTableRow(productsData[i], tableBodyProducts, i);
        }
      }).catch((error) => {
        console.log(error);
      });
    
  }
  
  function generateUsersTable() {
    tableBodyUsers.innerHTML = ''; // Clear the table
    
    fetchUserData()
      .then((usersData) => {
        for (let i = 0; i < usersData.length; i++) {
          addUserTableRow(usersData[i], tableBodyUsers);
        }
      }).catch((error) => {
        console.log(error);
      });
  }

  // Function to add a row to the products table
  function addProductTableRow(product, table, num) {
    const row = table.insertRow();
    row.setAttribute('data-id', product._id); // Set the row's data-id attribute to the user's ID
    row.setAttribute('class', 'product-row'); 
    row.addEventListener('click', () => {
      if(!isEditModeProducts) {
        toggleEditModeProducts(num);
      }
    });
    //adding event listener for editing a single row
    const nameCell = row.insertCell(0);
    const priceCell = row.insertCell(1);
    const descriptionCell = row.insertCell(2);
    const sizeCell = row.insertCell(3);
    const colorCell = row.insertCell(4);
    const teamCell = row.insertCell(5);
    const categoryCell = row.insertCell(6);
    const imageCell = row.insertCell(7);
    const buttonCell = row.insertCell(8); // Add a cell for the button

    nameCell.textContent = product.name;
    priceCell.textContent = product.price;
    descriptionCell.textContent = product.description;
    sizeCell.textContent = product.size.join(', ');
    colorCell.textContent = product.color;
    categoryCell.textContent = product.category;
    teamCell.textContent = product.team;

    // Create an image element and set its source
    const image = document.createElement('img');

    // Convert ArrayBuffer to a Uint8Array
    const uint8Array = new Uint8Array(product.image.data);

    // Convert Uint8Array to a binary string
    let binaryString = '';
    uint8Array.forEach(byte => {
      binaryString += String.fromCharCode(byte);
    });

    // Encode the binary string to Base64
    const base64String = btoa(binaryString);

    image.src = `data:image/jpg;base64,${base64String}`;
    image.alt = product.name;
    imageCell.appendChild(image);

    // Create the button element
    const button = document.createElement('button');
    button.style.backgroundColor = 'red'; // Red background
    button.style.borderRadius = '50%'; // Round edges
    button.style.color = 'white'; // White text color
    button.id = num; // Set the ID as 'num'
    button.textContent = '-';
    button.addEventListener('click', () => removeRow(product._id)); // Call removeRow() on click
    
    // Add the button to the button cell
    buttonCell.appendChild(button);
    if(!isDeleteMode){
      buttonCell.style.display = 'none';
    }
}
  // Function to add a row to the users table
  function addUserTableRow(user, table) {
    const row = table.insertRow();
    row.setAttribute('data-id', user._id); // Set the row's data-id attribute to the user's ID
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
  function removeRow(productId) {
    $.ajax({
      type: 'DELETE',
      url: '/product/delete',
      data: { id: productId },
      headers: {
        "Authorization": "Bearer " + JSON.parse(token)
      },
      success: function (res) {
        generateProductsTable();
      },
      error: function (error) {}
    });
  }

  // Initial products table generation
  generateProductsTable();

  // Click event Listener for the RESET form button
  $('.rstBtn').click(function() {
    //resetting the error msg
    $('#errorMsg').html('')
    $('.alert-danger').css("display", "none");

    $('#productName').val('');
    $('#productPrice').val('');
    $('#productDescription').val('');
    $('#productColor').val('');
    $('#productCategory').val('');
    $('#productTeam').val('');
    
    //shirt sizes
    $('#sizeXS').prop("checked", false);
    $('#sizeS').prop("checked", false);
    $('#sizeM').prop("checked", false);
    $('#sizeL').prop("checked", false);
    $('#sizeXL').prop("checked", false);
    $('#sizeXXL').prop("checked", false);

    $('#productImage').val('');
  });

  productForm.addEventListener('submit', function (e) {
    e.preventDefault();

    let fileExtension = document.getElementById("productImage").files[0].name.split('.').pop();

    if(!validateName($('#productName').val()) || $('#productName').val().length < 3) {
      $('#errorMsg').html('Please enter a valid product name.')
      $('.alert-danger').css("display", "block");
      return;
    }else if(!validatePrice(parseInt($('#productPrice').val()))) {
      $('#errorMsg').html('Please enter a valid price number.')
      $('.alert-danger').css("display", "block");
      return;
    }else if($('#productDescription').val().length < 10) {
      $('#errorMsg').html('Please enter a description.');
      $('.alert-danger').css("display", "block");
      return;
    }else if($('#productColor').val().length < 2) {
      $('#errorMsg').html('Please enter a color.');
      $('.alert-danger').css("display", "block");
      return;
    }else if($('#productCategory').val().length < 2) {
      $('#errorMsg').html('Please enter a category.');
      $('.alert-danger').css("display", "block");
      return;
    }else if($('#productTeam').val().length < 2) {
      $('#errorMsg').html('Please enter a category.');
      $('.alert-danger').css("display", "block");
      return;
    }else if(document.getElementById("productImage").files.length == 0) {
      $('#errorMsg').html('Please choose an image.');
      $('.alert-danger').css("display", "block");
      return;
    }else if(fileExtension != "jpg" && fileExtension != "png" && fileExtension != "jpeg") {
      $('#errorMsg').html('Please choose jpg jpeg or png as the file format.');
      $('.alert-danger').css("display", "block");
      return;
    }

    let formData = new FormData($('#productForm')[0]);
    //sending the ajax request
    $.ajax({
      type: 'POST',
      url: '/admin/newproduct',
      data: formData,
      headers: {
        "Authorization": "Bearer " + JSON.parse(token)
      },
      contentType: false,
      processData: false,
      success: function (res) {
        
      },
      error: function (error) {
        
      }
    });
    
    // Optionally, you can reset the form after adding the product
    productForm.reset();
    //resetting the error msg
    $('#errorMsg').html('')
    $('.alert-danger').css("display", "none");

    // This function should handle updating the table with the new product data
    generateProductsTable();
    
  });
  
  // This function should handle updating the table with the new user data
  generateUsersTable();
});

// --- Helper Functions -----

//check if is email - returns bool
function validateName($name) {
  var name = /^[a-zA-Z]{2,}(?: [a-zA-Z]+){0,9}$/;
  return name.test($name);
}

function validatePrice($price) {
  var price = /[+-]?([0-9]*[.])?[0-9]+/;
  return price.test($price);
}