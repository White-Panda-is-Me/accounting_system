function signup() {
    var xmlHttp = new XMLHttpRequest();
    var email = document.getElementsByClassName("email")[0].value;
    var passwd = document.getElementsByClassName("password")[0].value;
    var dto = {"email": email, "password": passwd};
    var json = JSON.stringify(dto);
    xmlHttp.open("POST", "http://127.0.0.1:3000/auth/signup", false);
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.send(json);
    const id = xmlHttp.responseText;
    localStorage.setItem("User_id", id);
    if(xmlHttp.status == 200) {
        alert(`id: ${localStorage.getItem("User_id")}`);
        window.location.href = "http://127.0.0.1:5500/frontend/signup/verify/verify.html";
    } else if (xmlHttp.status == 401) {
        alert("User exists!");
    } else {
        alert("Unhandled error code: " + xmlHttp.status);
    }
}