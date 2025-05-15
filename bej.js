// Ellenőrzi, hogy van-e már adat localStorage-ban
const storedData = JSON.parse(localStorage.getItem('userData')) || [];

function register() {
    const regUsername = document.getElementById('reg-username').value;
    const regPassword = document.getElementById('reg-password').value;

    // Ellenőrzi, hogy a felhasználónév foglalt-e
    if (storedData.some(user => user.username === regUsername)) {
        alert('Ez a felhasználónév már foglalt!');
        return;
    }

    // Hozzáadja az új felhasználót a listához
    storedData.push({ username: regUsername, password: regPassword });

    // Frissíti a localStorage-t
    localStorage.setItem('userData', JSON.stringify(storedData));

    alert('Regisztráció sikeres!');
}

function checkCredentials() {
    // A felhasználó által megadott adatok lekérdezése
    const inputUsername = document.getElementById('login-username').value;
    const inputPassword = document.getElementById('login-password').value;

    // Ellenőrzés
    if (storedData.some(user => user.username === inputUsername && user.password === inputPassword)) {
        document.getElementById('result').innerText = 'Sikeres belépés!';
    } else {
        document.getElementById('result').innerText = 'Hibás adatok. Kérlek, ellenőrizd a felhasználónév/email és jelszó mezőket.';
    }
}
