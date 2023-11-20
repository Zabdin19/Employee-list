const object = localStorage.getItem("editObject");
const obj = JSON.parse(object);
const token = localStorage.getItem("jwtToken");
let username = document.getElementById("username");
let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let phone = document.getElementById("phone");
let email = document.getElementById("Email");
let password = document.getElementById("password");
let confirmPassword = document.getElementById("confirm-password");
if (obj) {
  username.value = obj.username;
  firstName.value = obj.firstName;
  lastName.value = obj.lastName;
  phone.value = obj.phoneNo;
  email.value = obj.email;
  document.getElementById("pass1").style.display = "none";
  document.getElementById("pass2").style.display = "none";
  document.getElementById("button1").style.display = "none";
  const updateButton = document.getElementById("update");
  updateButton.style.display = "block";
  if (updateButton) {
    updateButton.addEventListener("click", function () {
      const updatedEmployee = {
        firstName: firstName.value,
        lastName: lastName.value,
        phoneNo: phone.value,
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
        email: email.value,
      };

      updateEmployee(obj.id, updatedEmployee);
    });
  }

  function updateEmployee(employeeId, updatedEmployeeData) {
    fetch(`https://myshiftpro.com.au/api/Users/${employeeId}`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(updatedEmployeeData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data, "zain");
        localStorage.removeItem("editObject");
        window.location.href = "index.html";
      })
      .catch((error) => console.error(error));

  }

  document.getElementById("employeeForm").addEventListener("submit", function (event) {
      event.preventDefault();

      const updatedEmployee = {
        username: document.getElementById("username").value,
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        phoneNo: document.getElementById("phone").value,
      };

      updatedEmployee;
    });
} else {
  document.getElementById("employeeForm").addEventListener("submit", function (event) {
      event.preventDefault();

      const newEmployee = {
        username: username.value,
        firstName: firstName.value,
        lastName: lastName.value,
        phoneNo: phone.value,
        gpsLocation: "27.1356875,129.7510625",
        city: "",
        state: "South Australia",
        country: "Australia",
        address:
          "5Q4FVQ72+PC Anangu Pitjantjatjara Yankunytjatjara, SA 0872, Australia South Australia 0872, Australia",
        jobStatusId: 2,
        subcontractorId: 4,
        securityLicenceNumber: "",
        guardStartDate: "2023-11-13T00:00:00.000Z",
        isDummy: true,
        dateofBirth: "2000-05-09T00:00:00.000Z",
        isAdmin: false,
        isSuperAdmin: false,
        isAdminReadOnly: false,
        email: email.value,
        password: password.value,
        confirmPassword: confirmPassword.value,
        isActive: true,
      };
      // console.log(password.value, "zain");

      fetch("https://myshiftpro.com.au/api/Users", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(newEmployee),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);

          window.location.href = "index.html";
        })
        .catch((error) => {
          document.getElementById("error").innerHTML = error.message;
        });

    });

  function updateTable(newEmployeeData) {
    const table = document.getElementById("mytable");

    const newRow = table.insertRow();
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    const cell4 = newRow.insertCell(3);

    cell1.innerHTML = newEmployeeData.username;
    cell2.innerHTML = newEmployeeData.firstName;
    cell3.innerHTML = newEmployeeData.lastName;
    cell4.innerHTML = newEmployeeData.phone;
  }
}
