<template>
  <div class="box">
    <p class="email-text">Email</p>
    <input ref="emailInput" type="text" class="email" placeholder="Email">
    <p class="pass-text">Password</p>
    <input ref="passwordInput" type="text" class="password" placeholder="Password">
    <button class="signin" @click="signin()">Sign in</button>
    <p class="signin-text">Have no account?</p>
    <a class="signup-link" href="http://localhost:5173/signup">Sign up</a>
  </div>
</template>

<script>
  export default {
    methods: {
      signin() {
        var xmlHttp = new XMLHttpRequest();
        const email = this.$refs.emailInput.value;
        const password = this.$refs.passwordInput.value;
        if (!email || !password) {
          alert("Fill the forms please!");
          return;
        }
        var dto = {"email": email, "password": password};
        var json = JSON.stringify(dto);
        xmlHttp.open("POST", "http://127.0.0.1:3000/auth/signin", false);
        xmlHttp.setRequestHeader("Content-Type", "application/json");
        xmlHttp.send(json);
        if(xmlHttp.status == 200) {
            localStorage.setItem("User_token", JSON.parse(xmlHttp.responseText).jwt);
            this.$router.push("/home");
        } else if (xmlHttp.status == 401) {
            alert("User exists!");
        } else {
            alert("Unhandled error code: " + xmlHttp.status);
        }
      }
    }
  };
</script>

<style>
  .box {
    width: 350px;
    height: 400px;
    display: flex;
    background-color: rgba(109, 109, 109, 0.818);
    justify-content: center;
    position: absolute;
    top: 35%;
    left: 23%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    box-shadow: 0 0 10px rgb(99, 99, 99);
  }

  .email {
    position: absolute;
    border-radius: 5px;
    border-style: none;
    top: 16%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 240px;
    padding-left: 5px;
    height: 40px;
    background-color: rgba(255, 255, 255, 0.886);
  }

  .password {
    position: absolute;
    border-radius: 5px;
    border-style: none;
    top: 35%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 240px;
    padding-left: 5px;
    height: 40px;
    background-color: rgba(255, 255, 255, 0.886);
  }

  .email-text {
    position: absolute;
    top: 5%;
    left: 15%;
    font-size: large;
    font-weight: 200;
    font-family: Arial, Helvetica, sans-serif;
  }

  .pass-text {
    position: absolute;
    top: 24%;
    left: 15%;
    font-size: large;
    font-weight: 200;
    font-family: Arial, Helvetica, sans-serif;
  }

  .signin {
    background-color: rgba(45, 50, 62, 0.852);
    position: absolute;
    border-radius: 5px;
    border-style: none;
    width: 80px;
    height: 45px;
    font-size: large;
    font-weight: 200;
    font-family: Arial, Helvetica, sans-serif;
    cursor: pointer;
    top: 55%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: box-shadow 200ms;
  }

  .signin:hover {
    box-shadow: 0 0 5px;
  }

  .signin-text {
    position: absolute;
    color: rgb(31, 41, 50);
    top: 64.5%;
    left: 15%;
    font-size: medium;
    font-weight: 200;
    font-family: Arial, Helvetica, sans-serif;
  }

  .signup-link {
    position: absolute;
    color: rgb(2, 78, 144);
    top: 64.75%;
    left: 55%;
    font-size: medium;
    font-weight: 200;
    font-family: Arial, Helvetica, sans-serif;
  }
</style>