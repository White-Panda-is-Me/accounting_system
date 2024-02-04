function verify() {
    var xmlHttp = new XMLHttpRequest();
    var fname = document.getElementsByClassName("FName")[0].value;
    var lname = document.getElementsByClassName("LName")[0].value;
    var ver_code = document.getElementsByClassName("Code")[0].value;
    const id = localStorage.getItem("User_id");
    alert(id);
    var dto = {"id": id, "code": ver_code, "firstName": fname, "lastName": lname};
    var json = JSON.stringify(dto);
    xmlHttp.open("POST", "http://127.0.0.1:3000/auth/verify", false);
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.send(json);
    if (xmlHttp.status == 200) {
        localStorage.setItem(`${id}_jwt`, xmlHttp.responseText);
        window.location.href = "http://localhost:5173";
    } else if (xmlHttp.status == 402) {
        window.location.href = "http://127.0.0.1:5500/frontend/signin/signin.html";
    } else if (xmlHttp.status == 403) {
        alert("Wrong verification code!");
    } else if (xmlHttp.status == 404) {
        alert("Verification code expired!");
    } else {
        alert("Unhandled error!");
    }
}