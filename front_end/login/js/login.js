const check_input = () => {
  const email = document.querySelector("#email-input").value.trim();
  const password = document.querySelector("#password-input").value.trim();
  const errorMessage = document.querySelector(".error-message");

  errorMessage.style.display = "none";
  errorMessage.textContent = "";
  //check data form
  if (!email || !password) {
    showError("Please fill in all the fields");
    return;
  }

  if (!email.includes("@")) {
    showError("Invalid email address format");
    return;
  }
  if (password.length < 3 || password.length > 50) {
    showError("The password should be between 3 and 50 characters");
    return;
  }
  loginUser(email, password);
};

//ّfunction shoe error message in 10 second
function showError(message) {
  const errorMessage = document.querySelector(".error-message");
  errorMessage.textContent = message;
  errorMessage.style.display = "block";

  setTimeout(() => {
    errorMessage.style.display = "none";
  }, 10000);
}
// function message login
function welcomeMessage(message) {
  const errorMessage = document.querySelector(".error-message");
  errorMessage.textContent = message;
  errorMessage.style.display = "block";
  errorMessage.style.color = "green";
}

async function loginUser(email, password) {
  try {
    const res = await fetch("http://localhost:5500/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Invalid email or password");
    
    }else if (res.ok) {
      welcomeMessage(data.message || "Welcome!");
      console.log(data);

      localStorage.setItem("token" , data.token)
      localStorage.setItem("role" , data.role);

      setTimeout(() => {
       window.location.href = `../${data.role}/dashboard.html`;
      }, 1000);
    }
  } catch (err) {
    showError(err.message);
  }
}
