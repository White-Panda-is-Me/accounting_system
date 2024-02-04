<script setup>
  import { useRouter } from 'vue-router';

  const router = useRouter();

  // Account menu
  function logOut() {
    localStorage.removeItem("User_token");
    router.push("/signin");
  }
  function showInfo() {
    router.push("/profile");
  }
  function goHome() {
    router.push("/");
  }
  // Css
  function changeState (choice) {
    document.getElementsByClassName("choice")[choice].style.backgroundColor = "white";
    document.getElementsByClassName("choice")[choice].style.color = "rgb(26,41,60)";
    document.getElementsByClassName("choice")[choice].style.width = "220px";
    document.getElementsByClassName("choice")[~choice & 1].style.backgroundColor = "rgb(26, 41, 60)";
    document.getElementsByClassName("choice")[~choice & 1].style.color = "white";
    document.getElementsByClassName("choice")[~choice & 1].style.width = "170px";
  }
  // Requests
  function MakeCategory () {
    let request = new XMLHttpRequest();
    const accountId = localStorage.getItem("accountId");
    const name = document.getElementsByClassName("code")[0].value;
    const code = document.getElementsByClassName("code")[1].value;
    if (!name || !code) {
      alert("فرم را پرکنید!");
      return;
    }
    let dto = { "accountId": accountId, "name": name, "code": code };
    let json = JSON.stringify(dto);
    xmlHttp.open("POST", "http://127.0.0.1:3000/account/product/addproductcateg", false);
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.setRequestHeader("Authorization", localStorage.getItem("User_token"));
    xmlHttp.send(json);
  }
</script>

<template>
<div class="main_bg">
  <div class="sidebar">
    <div class="menus home" @click="goHome()"><p class="menu-texts">خانه</p></div>
    <div class="menus sale">
      <div class="icon">
        <p class="menu-texts">فروش</p>
        <img class="arrow" src="@/assets/output-onlinepngtools.png" alt="arrow">
      </div>
      <div class="sub-menu"><p class="menu-texts">فاکتور</p></div>
      <div class="sub-menu"><p class="menu-texts">پیش فاکتور</p></div>
    </div>
    <div class="menus buy"><p class="menu-texts">خرید</p></div>
    <div class="menus payment"><p class="menu-texts">پرداخت</p></div>
    <div class="menus receipt"><p class="menu-texts">دریافت</p></div>
    <div class="menus costs"><p class="menu-texts">هزینه</p></div>
    <div class="menus know">
      <div class="icon">
        <p class="menu-texts">معرفی</p>
        <img class="arrow" src="@/assets/output-onlinepngtools.png" alt="arrow">
      </div>
      <div class="sub-menu"><p class="menu-texts">کالا</p></div>
      <div class="sub-menu"><p class="menu-texts">اشخاص</p></div>
      <div class="sub-menu"><p class="menu-texts">حساب های بانکی</p></div>
    </div>
    <div class="menus account">
      <div class="icon">
        <p class="menu-texts">حساب کاربری</p>
        <img class="arrow" src="@/assets/output-onlinepngtools.png" alt="arrow">
      </div>
      <div class="sub-menu" @click="showInfo()"><p class="menu-texts">پروفایل</p></div>
      <div class="sub-menu" @click="logOut()"><p class="menu-texts">خروج</p></div>
    </div>
  </div>
  <div class="shit"></div>
  <!-- Introduce Product Main Box-->
  <div class="ip_main_box">
    <div class="button_container">
      <button class="choice category" @click="changeState(0)">گروه کالا</button>
      <button class="choice product" @click="changeState(1)">کالا</button>
    </div>
    <p class="text" dir="rtl">نام:</p>
    <input class="inputs" placeholder="Name">
    <p class="text" dir="rtl">کد:</p>
    <input class="inputs" placeholder="Code">
    <button class="sign" @click="">ثبت</button>
  </div>
</div>
</template>

<style>
.main_bg {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url("@/assets/11356502.png");
  background-size: cover;
}

.ip_main_box {
  top: 5%;
  left: 4%;
  position: absolute;
  width: 90%;
  height: 90%;
  background-color: rgba(71, 71, 71, 0.661);
  border-radius: 20px;
  text-align: center;
  transition: 0.5s;
}

.inputs {
  width: 300px;
  height: 60px;
  border-radius: 10px;
  border-style: none;
  padding-left: 5px;
  transition: box-shadow 0.2s;
}

.text {
  margin-top: 40px;
  font-size: x-large;
  font-family: sahel;
}

.sign {
  position: absolute;
  width: 200px;
  height: 50px;
  top: 350px;
  left: 50%;
  transform: translate(-50%, 0);
  background-color: rgb(26, 41, 60);
  border-style: none;
  border-radius: 10px;
  color: white;
  font-size: large;
  cursor: pointer;
  transition: box-shadow 0.2s;
}

.choice {
  right: 0;
  margin-top: 10px;
  width: 200px;
  height: 70px;
  border-style: none;
  border-radius: 10px;
  background-color: rgb(26, 41, 60);
  color: white;
  cursor: pointer;
  font-size: large;
  transition: 0.2s;
}

.button_container {
  width: 240px;
  text-align: center;
  height: 170px;
  position: absolute;
  top: 25px;
  right: 25px;
  border-radius: 10px;
  background-color: rgba(57, 57, 57, 0.747);
}

.category {
  background-color: white;
  color: rgb(26, 41, 60);
  width: 220px;
}

.choice:hover {
  box-shadow: 0 0 10px rgba(26, 41, 60, 0.78);
}

.sign:hover {
  box-shadow: 0 0 15px rgba(26, 41, 60, 0.78);
}

.inputs:hover {
  box-shadow: 0 0 5px rgba(187, 187, 187, 0.78);
}

.sidebar:hover ~ .ip_main_box {
  width: 79%;
}
</style>
