const table = document.getElementById("mytable");
const tbody = table.getElementsByTagName("tbody")[0];
const rowsPerPage = 10;
let currentPage = 1;
let tabledata = [];

const token = localStorage.getItem("jwtToken");

if (token) {
  fetchData();
} else {
  window.location.href = "login.html";
}

function fetchData() {
  fetch("https://myshiftpro.com.au/api/Users", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
      "Other-Header": "header-value",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      tabledata = data.reverse();

      insertData(tabledata);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

function insertData(data) {
  tbody.innerHTML = "";

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, data.length);

  for (let index = 0; index < endIndex - startIndex; index++) {
    const item = data[startIndex + index];

    let row = tbody.insertRow();
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    let cell5 = row.insertCell(4);
    let cell6 = row.insertCell(5);
    cell1.textContent = item.id;
    cell2.textContent = item.username;
    cell3.textContent = item.firstName;
    cell4.textContent = item.lastName;
    cell5.textContent = item.phoneNo;

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("btn", "btn-primary");
    editButton.addEventListener("click", () => handleEditClick(item));

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("btn", "btn-danger");
    deleteButton.addEventListener("click", () => handleDeleteClick(item));

    cell6.appendChild(editButton);
    cell6.appendChild(deleteButton);
  }

  if (data.length < 10) {
    document.getElementById("nextPage").style.display = "none";
  }
}
function handleEditClick(item) {
  localStorage.setItem("editObject", JSON.stringify(item));
  
  window.location.href = "createemployee.html";
}

function handleDeleteClick(item) {
  const confirmation = window.confirm("Are you sure you want to delete?");
  
  if (confirmation) {
    fetch(`https://myshiftpro.com.au/api/Users/${item.id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
        "Content-type": "application/json; charset=UTF-8",
      },
      
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log("Delete confirmed for ID: " + item.id);
     let Tabledata= tabledata.filter(function(element){
        return item.id !== element.id;
      })
      
      insertData(Tabledata);
    })
    .catch(error => {
      console.error('Error during delete:', error);
    });
  }
}

const createEmployeeButton = document.getElementById("createEmployeeButton");

if (createEmployeeButton) {
  createEmployeeButton.addEventListener("click", () => {
    window.location.href = "createemployee.html";
  });
}

const updatePagination = () => {
  const totalPages = Math.ceil(tabledata.length / rowsPerPage);
  document.getElementById("prevPage").disabled = currentPage === 1;
  document.getElementById("nextPage").disabled = currentPage === totalPages;
};

const filterTable = (searchTerm) => {
  const filteredData = tabledata.filter((item) => {
    return (
      item.username.toLowerCase().includes(searchTerm) ||
      item.firstName.toLowerCase().includes(searchTerm) ||
      item.lastName.toLowerCase().includes(searchTerm) ||
      item.phoneNo.toLowerCase().includes(searchTerm)
    );
  });
  insertData(filteredData);
};

document.getElementById("search-btn").onclick = function (e) {
  e.preventDefault();
  const searchInput = document.getElementById("search-input");
  const searchTerm = searchInput.value.trim().toLowerCase();
  filterTable(searchTerm);
};

function handleUpdateClick() {
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const phone = document.getElementById("phone").value;

  const updatedData = {
    firstName: firstName,
    lastName: lastName,
    phoneNo: phone,
    gpsLocation: "27.1356875,129.7510625",
    city: "",
    state: "South Australia",
    country: "Australia",
    address:
      "5Q4FVQ72+PC Anangu Pitjantjatjara Yankunytjatjara, SA 0872, Australia South Australia 0872, Australia",
    currentGpsLocationRadius: 0,
    jobStatusId: 2,
    subcontractorId: 4,
    securityLicenceNumber: "",
    guardStartDate: "2023-11-13T00:00:00",
    dateofBirth: "2000-05-09T00:00:00",
    supervisorHourlyRate: 0,
    hourlyRate: 0,
    role: "Guard",
    email: email,
    isVerified: true,
    isDummy: true,
    isActive: true,
  };

  fetch(`https://myshiftpro.com.au/api/Users/${selectedEmployeeId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(updatedData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })

    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

fetchData();

document.getElementById("prevPage").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    insertData(tabledata);
    updatePagination();
  }
});

document.getElementById("nextPage").addEventListener("click", () => {
  const totalPages = Math.ceil(tabledata.length / rowsPerPage);

  if (currentPage < totalPages) {
    currentPage++;
    insertData(tabledata);
    updatePagination();
  }
});

const logoutButton = document.getElementById("logoutButton");

if (logoutButton) {
  logoutButton.addEventListener("click", () => {
    localStorage.removeItem("jwtToken");

    window.location.href = "login.html";
  });
}
