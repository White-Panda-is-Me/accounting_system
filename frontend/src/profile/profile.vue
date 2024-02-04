<script lang="ts" setup>
  import { ref } from "vue";
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const req = new XMLHttpRequest();
  req.open("GET", "http://localhost:3000/users/me", false);
  req.setRequestHeader("Authorization", `Bearer ${localStorage.getItem("User_token")}`);
  req.send();
  const info = JSON.parse(req.responseText);
  
  function goHome() {
    router.push("/home");
  }
  function logOut() {
    localStorage.removeItem("User_token");
    router.push("/signin");
  }
  function showInfo() {
    router.push("/profile");
  }
  function goIntroduceProduct() {
    router.push("/introduce/product");
  }
</script>

<template>
  <div class="info">
    <img class="user-photo" src="@/assets/user.png" alt="user">
    <p class="info-text" dir="rtl">ایمیل: {{ info.email }}</p>
    <p class="info-text" dir="rtl">نام خانوادگی: {{ info.lastName }}</p>
    <p class="info-text" dir="rtl">نام: {{ info.firstName }}</p>
  </div>
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
      <div class="sub-menu"><p class="menu-texts" @click="goIntroduceProduct()">کالا</p></div>
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
</template>

<style>
.home:hover {
  background-color: rgb(11, 13, 35);
}

.info {
  position: absolute;
  left: 2%;
  top: 5%;
  width: 94%;
  height: 11%;
  border-radius: 10px;
  background-color: rgba(65, 65, 65, 0.835);
  text-align: right;
  padding-top: 15px;
}

.info-text {
  position: relative;
  font-size: large;
  display: inline-flex;
  right: 10%;
  margin-right: 75px;
  color: rgb(89, 127, 176);
}

.user-photo {
  width: 80px;
  border-radius: 100%;
  position: absolute;
  right: 2%;
  top: 5%;
}
</style>