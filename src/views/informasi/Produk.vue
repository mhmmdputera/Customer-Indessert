<template>
    <div class="product-info py-5">
      <div class="container">
        <div class="row">
          <!-- Kategori Produk (Aside) -->
          <div class="col-md-3 mb-4">
            <div class="card shadow-sm border">
              <div class="card-header bg-white">
                <h4 class="text-center mb-0">Kategori Produk</h4>
              </div>
              <ul class="list-group list-group-flush">
                <li v-for="category in categories" :key="category.id" class="list-group-item" @click="selectCategory(category)">
                  <img :src="category.image" :alt="category.name" class="img-fluid me-2" style="width: 30px;">
                  {{ category.name }}
                </li>
              </ul>
            </div>
          </div>
  
          <!-- Konten Produk -->
          <div class="col-md-9">
            <div v-if="products.length" class="row">
              <div v-for="product in products" :key="product.id" class="col-md-6 mb-4">
                <div class="card shadow-sm border">
                  <img :src="product.image" :alt="product.title" class="card-img-top">
                  <div class="card-body">
                    <h5 class="card-title">{{ product.title }}</h5>
                    <p class="card-text" >{{ stripHtmlTags(product.content) }}</p>
                    <ul class="list-unstyled">
                      <li><strong>Berat:</strong> {{ product.weight }} gram</li>
                      <li><strong>Harga:</strong> Rp {{ formatPrice(product.price) }}</li>
                      <li><strong>Bahan:</strong> <span :style="{ color: '#c69a41' }">{{ product.bahan }}</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
  
            <!-- Produk Kosong -->
            <div v-else>
              <div class="alert alert-warning text-center">
                Tidak ada produk di kategori ini.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapState, mapActions } from 'vuex';
  
  export default {
    name: 'ProductInformationComponent',
    computed: {
      ...mapState('category', ['categories', 'productInCategory']),
      products() {
        return this.productInCategory;
      }
    },
    methods: {
      ...mapActions('category', ['getCategories', 'getProductInCategory']),
      selectCategory(category) {
        this.getProductInCategory(category.slug);
      },
      formatPrice(price) {
        return price.toLocaleString('id-ID');
      },
      stripHtmlTags(html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  }
    },
    mounted() {
      // Ambil kategori saat komponen dipasang
      this.getCategories().then(() => {
        // Pilih kategori default (Juice)
        const defaultCategory = this.categories.find(cat => cat.name.toLowerCase() === 'juice');
        this.selectCategory(defaultCategory || this.categories[0]);
      });
    }
  };
  </script>
  
  <style scoped>
  
  .card-header {
    border-bottom: 1px solid #dee2e6;
  }
  
  .card-title {
    color: #c69a41;
  }
  
  .card {
    border-radius: 0.75rem;
  }
  
  .card-body {
    padding: 1.5rem;
  }
  
  .list-group-item {
    cursor: pointer;
  }
  
  .list-group-item:hover {
    background-color: #f8f9fa;
  }
  
  .img-fluid {
    max-width: 100%;
    height: auto;
  }
  </style>
  