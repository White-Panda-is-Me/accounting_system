<template>
  <div class="box">
    <p class="fName">First Name</p>
    <input ref="FNameInput" type="text" class="FName" placeholder="First Name">
    <p class="lName">Last Name</p>
    <input ref="LNameInput" type="text" class="LName" placeholder="Last Name">
    <p class="code">Verification code</p>
    <input ref="CodeInput" type="text" class="Code" placeholder="Verification code">
    <button class="button" @click="verify()">Verify</button>
  </div>
</template>

<script>
  export default {
    methods: {
      verify() {
        var xmlHttp = new XMLHttpRequest();
        var fname = this.$refs.FNameInput.value;
        var lname = this.$refs.LNameInput.value;
        var ver_code = this.$refs.CodeInput.value;
        if (!fname || !lname || !ver_code) {
          alert("Fill the forms please!");
          return;
        }
        const id = localStorage.getItem("User_id");
        var dto = {"id": id, "code": ver_code, "firstName": fname, "lastName": lname};
        var json = JSON.stringify(dto);
        xmlHttp.open("POST", "http://127.0.0.1:3000/auth/verify", false);
        xmlHttp.setRequestHeader("Content-Type", "application/json");
        xmlHttp.send(json);
        if (xmlHttp.status == 200) {
            localStorage.setItem(`User_token`, JSON.parse(xmlHttp.responseText).jwt);
            this.$router.push("/home");
        } else if (xmlHttp.status == 402) {
          this.$router.push("/signin");
        } else if (xmlHttp.status == 403) {
            alert("Wrong verification code!");
        } else if (xmlHttp.status == 404) {
            alert("Verification code expired!");
        } else {
            alert("Unhandled error!");
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

  .FName {
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

  .LName {
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

  .fName {
    position: absolute;
    top: 5%;
    left: 15%;
    font-size: large;
    font-weight: 200;
    font-family: Arial, Helvetica, sans-serif;
  }

  .lName {
    position: absolute;
    top: 24%;
    left: 15%;
    font-size: large;
    font-weight: 200;
    font-family: Arial, Helvetica, sans-serif;
  }

  .code {
    position: absolute;
    left: 15%;
    top: 43%;
    font-size: large;
    font-weight: 200;
    font-family: Arial, Helvetica, sans-serif;
  }

  .Code {
    position: absolute;
    border-radius: 5px;
    border-style: none;
    top: 54%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 240px;
    padding-left: 5px;
    height: 40px;
    background-color: rgba(255, 255, 255, 0.886);
  }

  .button {
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
    top: 76%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: box-shadow 200ms;
  }

  .button:hover {
    box-shadow: 0 0 5px;
  }

</style>