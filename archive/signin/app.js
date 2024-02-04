function signup() {
    var xmlHttp = new XMLHttpRequest();
    var email = document.getElementsByClassName("email")[0].value;
    var passwd = document.getElementsByClassName("password")[0].value;
    var dto = {"email": email, "password": passwd};
    var json = JSON.stringify(dto);
    xmlHttp.open("POST", "http://127.0.0.1:3000/auth/signin", false);
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.send(json);
    if(xmlHttp.status == 200) {
        localStorage.setItem("User_id", xmlHttp.responseText);
        window.location.href = "http://127.0.0.1:5500/frontend/home/home.html";
    } else if (xmlHttp.status == 401) {
        alert("User exists!");
    } else {
        alert("Unhandled error code: " + xmlHttp.status);
    }
}