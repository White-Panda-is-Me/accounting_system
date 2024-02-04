<template>
  <div class="bg">
    <div class="sidebar">
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
  </div>
</template>

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
  // introduce
  function goIntroduceProduct() {
    router.push("/introduce/product");
  }
</script>

<style>
.bg {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgb(125, 125, 125);
  background-image: none;
}

.sidebar {
  width: 25px;
  height: 99%;
  top: 50%;
  transform: translate(0, -50%);
  background-color: rgb(26, 41, 60);
  position: absolute;
  right: 4px;
  transition: width 500ms;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 0 5px rgb(10, 28, 51);
}

.sidebar:hover {
  width: 180px;
}

.shit {
  position: absolute;
  height: 130px;
  width: 4px;
  right: 33px;
  background-color: white;
  border-radius: 10px;
  top: 50%;
  transform: translate(0, -50%);
  transition: right 500ms;
}

.sidebar:hover + .shit {
  right: 187px;
}

.icon {
  position: relative;
  height: 40px;
  width: 180px;
  top: 0px;
  right: 0px;
}

.menus {
  color: rgb(197, 197, 197);
  background-color: unset;
  text-align: right;
  position: relative;
  cursor: pointer;
  width: 180px;
  height: 40px;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 5px rgba(10, 28, 51, 0.574);
  transition: height 200ms;
}

.sale:hover {
  height: 120px;
}

.know:hover {
  height: 160px;
}

.account:hover {
  height: 120px;
}

.buy:hover {
  background-color: rgb(11, 13, 35);
}

.payment:hover {
  background-color: rgb(11, 13, 35);
}

.receipt:hover {
  background-color: rgb(11, 13, 35);
}

.costs:hover {
  background-color: rgb(11, 13, 35);
}

.arrow {
  position: absolute;
  width: 15px;
  height: 15px;
  left: 22px;
  top: 15px;
  transform: rotate(90deg);
  transition: transform 200ms, top 200ms;
}

.sale:hover .arrow {
  transform: rotate(0deg);
  top: 15px;
}

.know:hover .arrow {
  transform: rotate(0deg);
  top: 15px;
}

.account:hover .arrow {
  transform: rotate(0deg);
  top: 15px;
}

.sub-menu {
  position: relative;
  width: 180px;
  height: 40px;
  text-align: right;
  cursor: pointer;
  transition: background-color 200ms;
}

.sub-menu:hover {
  background-color: rgb(11, 13, 35);
}

.sub-menu {
  position: relative;
  width: 180px;
  height: 40px;
  text-align: right;
  transition: background-color 200ms;
  cursor: pointer;
}

.sub-menu:hover {
  background-color: rgb(11, 13, 35);
}

.menu-texts {
  position: relative;
  font-family: sahel;
  font-size: 17px;
  top: 50%;
  transform: translate(0, -50%);
  right: 30px;
}
</style>