function validate() {
    var username = document.getElementById("accountInput").value;
    var password = document.getElementById("passwordInput").value;

    if (username === "admin" && password === "123456") {
        window.location = "dashBoard";
        return true;
    }
}

function logout() {
    window.location = "/login";
}