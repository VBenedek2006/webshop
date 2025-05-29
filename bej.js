function showLogin() {
    document.getElementById("login-form").style.display = "block";
    document.getElementById("registration-form").style.display = "none";
    document.getElementById("result").innerText = "";
  }
  
  function showRegister() {
    document.getElementById("registration-form").style.display = "block";
    document.getElementById("login-form").style.display = "none";
    document.getElementById("result").innerText = "";
  }
  
  function register() {
    const regUsername = document.getElementById('reg-username').value.trim();
    const regEmail = document.getElementById('reg-email').value.trim();
    const regPassword = document.getElementById('reg-password').value;
  
    if (!regUsername || !regEmail || !regPassword) {
      alert('Kérlek, tölts ki minden mezőt!');
      return;
    }
  
    const storedData = JSON.parse(localStorage.getItem('userData')) || [];
  
    const isTaken = storedData.some(user =>
      user.username === regUsername || user.email === regEmail
    );
  
    if (isTaken) {
      alert('Ez a felhasználónév vagy email már foglalt!');
      return;
    }
  
    storedData.push({
      username: regUsername,
      email: regEmail,
      password: regPassword
    });
  
    localStorage.setItem('userData', JSON.stringify(storedData));
  
    // Üzenet megjelenítése, majd váltás bejelentkezésre
    alert('Regisztráció sikeres! Most jelentkezz be.');
    showLogin();
  
    // Eredmény szöveg mutatása
    const result = document.getElementById("result");
    result.innerText = "Sikeres regisztráció! Jelentkezz be.";
    result.style.color = "green";
  }
  
  function checkCredentials() {
    const inputUsername = document.getElementById('login-username').value.trim();
    const inputPassword = document.getElementById('login-password').value;
  
    const storedData = JSON.parse(localStorage.getItem('userData')) || [];
  
    const userMatch = storedData.find(user =>
      (user.username === inputUsername || user.email === inputUsername) &&
      user.password === inputPassword
    );
  
    const result = document.getElementById("result");
  
    if (userMatch) {
      result.innerText = "Sikeres belépés! Átirányítás...";
      result.style.color = "green";
  
      setTimeout(() => {
        window.location.href = "index.html";
      }, 1000);
    } else {
      result.innerText =
        "Hibás adatok. Kérlek, ellenőrizd a felhasználónév/email és jelszó mezőket.";
      result.style.color = "red";
    }
  }
  
  window.onload = function () {
    // Ellenőrzés, hogy volt-e regisztráció utáni üzenet
    showLogin();
  };
  