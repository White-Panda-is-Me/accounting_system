<template>
  <div class="box">
    <p class="email-text">Email</p>
    <input ref="emailInput" type="text" class="email" placeholder="Email">
    <p class="pass-text">Password</p>
    <input ref="passwordInput" type="password" class="password" placeholder="Password">
    <button class="signup" @click="signup()">Sign up</button>
    <p class="login-text">Already have an account?</p>
    <a class="login" href="http://localhost:5173/signin">Sign in</a>
  </div>
</template>

<script>
  export default {
    methods: {
      signup() {
        const email = this.$refs.emailInput.value;
        const password = this.$refs.passwordInput.value;
        if (!email || !password) {
          alert("Fill the forms please!");
          return;
        }
        var xmlHttp = new XMLHttpRequest();
        var dto = {"email": email, "password": password};
        var json = JSON.stringify(dto);
        xmlHttp.open("POST", "http://localhost:3000/auth/signup", false);
        xmlHttp.setRequestHeader("Content-Type", "application/json");
        xmlHttp.send(json);
        const id = xmlHttp.responseText;
        localStorage.setItem("User_id", id);
        if(xmlHttp.status == 200) {
          this.$router.push("/signup/verify");
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
body {
  background-image: url("@/assets/nord-bg.png");
  background-size: cover;
  background-repeat: no-repeat;
}

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

.signup {
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

.signup:hover {
  box-shadow: 0 0 5px;
}

.login-text {
  position: absolute;
  color: rgb(31, 41, 50);
  top: 64.5%;
  left: 15%;
  font-size: medium;
  font-weight: 200;
  font-family: Arial, Helvetica, sans-serif;
}

.login {
  position: absolute;
  color: rgb(2, 78, 144);
  top: 64.75%;
  left: 70%;
  font-size: medium;
  font-weight: 200;
  font-family: Arial, Helvetica, sans-serif;
}
</style>