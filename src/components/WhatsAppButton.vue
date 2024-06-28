<template>
    <a href="https://api.whatsapp.com/send?phone=6287846810664&text=Halo%20admin,%20saya%20ingin%20bertanya."
       class="float" target="_blank">
      <i class="fab fa-whatsapp my-float"></i>
    </a>
  </template>
  
  <script>
  export default {
    name: 'WhatsAppButton'
  }
  </script>
  
  <style scoped>
  
  .float {
    position: fixed;
    width: 60px;
    height: 60px;
    bottom: 40px;
    right: 40px;
    background-color: #25d366;
    color: #FFF;
    border-radius: 50px;
    text-align: center;
    font-size: 30px;
    box-shadow: 2px 2px 3px #999;
    z-index: 100;
  }
  
  .my-float {
    margin-top: 16px;
  }
  </style>
  