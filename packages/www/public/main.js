function onSignup(evt) {
  evt.preventDefault();
  const { email } = evt.target;
  const text = email.value;
  debugger;

  var form = new FormData(document.getElementById("signup"));
  fetch("http://localhost:8080/signup", {
    method: "POST",
    body: JSON.stringify({
      email: text
    }),
    headers: {
      "content-type": "application/json"
    }
  })
    .then(response => {
      if (response.ok) {
        console.log("seems ok");
        return response.text();
      }
    })
    .then(text => {
      if (text) {
        console.log("got text", text);
      }
    });
  return false;
}

const signupForm = document.querySelector("#signup");
signupForm.addEventListener("submit", onSignup);
