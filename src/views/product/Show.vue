<template>
    <div class="container mt-5 mb-5">
          <div class="row">
              <div class="col-md-4">
                  <div class="card border-0 rounded shadow">
                      <div class="card-body p-2">
                          <img :src="product.image" class="w-100 border">
                      </div>
                  </div>
              </div>
              <div class="col-md-8">
                  <div class="card border-0 rounded shadow">
                      <div class="card-body">
                          <label class="font-weight-bold" style="font-size: 20px;"> {{ product.title }} </label>
                          <hr>
                          <div class="price-product" id="price-product" style="font-size: 1.35rem">
                            <span class="font-weight-bold mr-4" style="color: green">Rp. {{ moneyFormat(calculateDiscount(product)) }}</span>
                            <s v-if="product.discount > 0" class="font-weight-bold" style="text-decoration-color:red">Rp. {{ moneyFormat(product.price) }}</s>
                          </div>
                          <table class="table table-borderless mt-3">
                              <tbody>
                                <tr v-if="product.discount > 0">
                                    <td class="font-weight-bold">DISKON</td>
                                    <td>:</td>
                                    <td>
                                        <button class="btn btn-sm" style="color: #ff2f00;border-color: #ff2f00;">
                                            DISKON {{ product.discount }} %
                                        </button>
                                    </td>
                                </tr>
                                  <tr>
                                      <td class="font-weight-bold">BERAT</td>
                                      <td>:</td>
                                      <td>
                                          <span class="badge badge-pill badge-success"
                                              style="font-size: 14px;border-radius: .3rem;padding: .25em .5em .2em;"> {{ product.weight }}
                                              gram</span>
                                      </td>
                                  </tr>
                                  <tr>
                                    <td class="font-weight-bold">STOK</td>
                                    <td>:</td>
                                    <td>
                                        <span class="badge badge-pill badge-info"
                                            style="font-size: 14px;border-radius: .3rem;padding: .25em .5em .2em;">{{ product.stock }}</span>
                                    </td>
                                </tr>
                                <tr v-if="product.bahan" >
                                    <td class="font-weight-bold">BAHAN</td>
                                    <td>:</td>
                                    <td>
                                        <span v-for="(bahan, index) in product.bahan.split(',')" :key="index" class="badge badge-pill badge-info"
                                            style="font-size: 14px;border-radius: .3rem;padding: .25em .5em .2em;margin-right: 5px; background-color: #c69a41; color: white;">
                                            {{ bahan.trim() }}
                                        </span>
                                    </td>
                                </tr>

                              </tbody>
                          </table>
                          <button @click.prevent="checkStockAndAddToCart(product.id, calculateDiscount(product), product.weight)" 
                                
                                class="btn btn-primary btn-lg btn-block">
                            <i class="fa fa-shopping-cart"></i> TAMBAH KE KERANJANG
                        </button>
                          <br>
                          <p>*Klik 2 Kali Atau lebih Tombol Tambah Keranjang Untuk Menambah Jumlah Order</p>
                      </div>
                  </div>
              </div>
          </div>
          <div class="row mt-5">
              <div class="col-md-12">
                  <div class="card border-0 rounded shadow">
                      <div class="card-body">
                          <label class="font-weight-bold" style="font-size: 20px;">KETERANGAN</label>
                          <hr>
                          <div v-html="product.content"></div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </template>
  
  <script>
      import { computed, onMounted } from 'vue'   // computed dan onMounted
      import { useStore } from 'vuex' // store Vuex
      import { useRoute, useRouter } from 'vue-router' // vue router
      import Swal from 'sweetalert2'
  
      export default {
  
          name: 'ProductShowComponent',
  
          setup() {
  
              //vue route
              const route = useRoute()
  
              //vue router
              const router = useRouter()
  
               //store vuex
              const store = useStore()
  
              //onMounted akan menjalankan action "getDetailProduct" di module "product" Vuex
              onMounted(() => {
                  store.dispatch('product/getDetailProduct', route.params.slug)
              })
  
              //computed properti digunakan untuk mendapatkan data detail product dari state "product" di module "product" Vuex
              const product = computed(() => {
                  return store.state.product.product
              })

              function checkStockAndAddToCart(product_id, price, weight) {
            if (product.value.stock === 0) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Stok Habis',
                    text: 'Produk ini sedang tidak tersedia.'
                });
                return;
            }
            addToCart(product_id, price, weight);
        }

  
              /**
               * function addToCart
               */
              function addToCart(product_id, price, weight) {
                  
                  //check token terlebih dahulu
                  const token = store.state.auth.token
  
                  if (!token) {
                        return router.push({ 
                            name: 'login', 
                            query: { redirect: route.fullPath } 
                        });
                    }
  
                  //panggil action addToCart di module cart
                  store.dispatch('cart/addToCart', {
                      product_id: product_id,
                      price: price,
                      weight: weight,
                      quantity: 1
                  }) 
  
              }
  
              return {
                  route,
                  router,
                  store,
                  product,
                  addToCart,
                  checkStockAndAddToCart
              }
  
          }
  
      }
  </script>