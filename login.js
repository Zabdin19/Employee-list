document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();

  let userName = document.getElementById("Email").value;
  let password = document.getElementById("password").value;

  const formData = new FormData();
  formData.append("username", userName);
  formData.append("password", password);

  fetch("https://myshiftpro.com.au/api/Accounts/authenticate", {
    method: "POST",
    body: formData,
    headers: {},
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data && data.jwtToken) {
        localStorage.setItem("jwtToken", data.jwtToken);

        window.location.href = "index.html";
      }else {
        document.getElementById('error-message').innerHTML = data.message;
      }
    })

    .catch((error) => {
      console.error(error);
    });
});

    



