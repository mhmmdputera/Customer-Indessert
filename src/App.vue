<template>
  <div>
    <HeaderComponent />
        <router-view />
    <FooterComponent />
    <WhatsAppButton />
  </div>
</template>

<script>

  import HeaderComponent from './components/Header.vue'
  import FooterComponent from './components/Footer.vue'
  import WhatsAppButton from './components/WhatsAppButton.vue'

  export default {

    name: 'AppComponent',

    components: {
      HeaderComponent,
      FooterComponent,
      WhatsAppButton
    }

  }
</script>