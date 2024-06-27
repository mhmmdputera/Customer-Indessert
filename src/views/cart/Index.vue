<template>
    <div class="container-fluid mb-5 mt-4">
          <div class="row">
              <div class="col-md-6">
                  <div class="card border-0 shadow rounded">
                      <div class="card-body">
                          <h5><i class="fa fa-shopping-cart"></i> DETAIL PESENAN</h5>
                          <hr>
                          <table class="table"
                              style="border-style: solid !important;border-color: rgb(198, 206, 214) !important;">
                              <tbody>
                                  <tr v-for="cart in carts" :key="cart.id" style="background: #edf2f7;">
                                      <td class="b-none" width="25%">
                                          <div class="wrapper-image-cart">
                                              <img :src="cart.product.image" style="width: 100%;border-radius: .5rem">
                                          </div>
                                      </td>
                                      <td class="b-none" width="50%">
                                          <h5><b>{{ cart.product.title }}</b></h5>
                                          <table class="table-borderless" style="font-size: 14px">
                                              <tr>
                                                  <td style="padding: .20rem">QTY</td>
                                                  <td style="padding: .20rem">:</td>
                                                  <td style="padding: .20rem"><b>{{ cart.quantity }}</b></td>
                                              </tr>
                                          </table>
  
                                      </td>
                                      <td class="b-none text-right">
                                          <p class="m-0 font-weight-bold">Rp. {{ moneyFormat(cart.price) }}
                                          </p>
  
                                          <p class="m-0">
                                              <s style="text-decoration-color:red">Rp.
                                                  {{ moneyFormat(cart.product.price * cart.quantity) }}</s>
                                          </p>
  
                                          <br>
                                          <div class="text-right">
                                              <button @click.prevent="removeCart(cart.id)" class="btn btn-sm btn-danger">
                                                  <i class="fa fa-trash"></i>
                                              </button>
                                          </div>
                                      </td>
                                  </tr>
                              </tbody>
                          </table>
  
                          <table class="table table-default">
                              <tbody>
                                  <tr>
                                      <td class="set-td text-left" width="60%">
                                          <p class="m-0">JUMLAH </p>
                                      </td>
                                      <td class="set-td  text-right" width="30%">&nbsp; : Rp.</td>
                                      <td class="text-right set-td ">
                                          <p class="m-0" id="subtotal"> {{ moneyFormat(cartTotal) }}
                                          </p>
                                      </td>
                                  </tr>
                                  <tr>
                                      <td class="set-td text-left border-0">
                                          <p class="m-0">ONGKOS KIRIM (<strong>{{ cartWeight }}</strong> gram)</p>
                                      </td>
                                      <td class="set-td border-0 text-right">&nbsp; : Rp.</td>
                                      <td class="set-td border-0 text-right">
                                          <p class="m-0" id="ongkir-cart"> {{ moneyFormat(state.courier_cost) }}</p>
                                      </td>
                                  </tr>
                                  <tr>
                                      <td class=" text-left border-0">
                                          <p class="font-weight-bold m-0 h5 text-uppercase">Grand Total </p>
                                      </td>
                                      <td class=" border-0 text-right">&nbsp; : Rp.</td>
                                      <td class=" border-0 text-right">
                                          <p class="font-weight-bold m-0 h5" align="right">
                                            {{ moneyFormat(state.grandTotal) }} </p>
                                      </td>
                                  </tr>
                              </tbody>
                          </table>
  
                      </div>
                  </div>
              </div>
              <div class="col-md-6">
                  <div class="card border-0 shadow rounded">
                      
                      <!-- start ongkos kirim -->
  
                      <div class="card-body">
                          <h5><i class="fa fa-user-circle"></i> RINCIAN PENGIRIMAN</h5>
                          <hr>

                          <div class="row">

                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="font-weight-bold">NAMA LENGKAP</label>
                                    <input type="text" class="form-control" id="nama_lengkap" placeholder="Nama Lengkap"
                                        v-model="state.name">
                                    <div v-if="validation.name" class="mt-2 alert alert-danger">
                                        Masukkan Nama Lengkap
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="font-weight-bold">NO. HP / WHATSAPP</label>
                                    <input type="number" class="form-control" id="phone" placeholder="No. HP / WhatsApp"
                                        v-model="state.phone">
                                    <div v-if="validation.phone" class="mt-2 alert alert-danger">
                                        Masukkan No. Telp
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-12">
                                <div class="form-group">
                                    <label class="font-weight-bold">KABUPATEN</label>
                                    <select class="form-control" v-model="state.kabupaten_id" @change="getKecamatans">
                                            <option value="">-- pilih kabupaten --</option>
                                            <option v-for="kabupaten in state.kabupatens" :key="kabupaten.id" :value="kabupaten.id">
                                                    {{ kabupaten.name }}</option>
                                    </select>
                                </div>
                            </div>

                            <!-- <div class="col-md-12">
                                <div class="form-group">
                                    <label class="font-weight-bold">KECAMATAN</label>
                                    <select class="form-control" v-model="state.kecamatan_id" @change="totalHarga">
                                        <option value="">-- pilih kecamatan --</option>
                                        <option v-for="kecamatan in state.kecamatans" :key="kecamatan.id" :value="kecamatan.id">{{ kecamatan.title }} &{{ kecamatan.ongkir }} 
                                        </option>
                                    </select>
                                </div>
                            </div> -->

                            <div class="col-md-12">
                                <div class="form-group" v-if="state.cost">
                                    <hr>
                                    <label class="font-weight-bold">KECAMATAN & ONGKIR</label>
                                    <br>
                                    <div v-for="kecamatan in state.kecamatans" :key="kecamatan.id" class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="ongkir" :id="kecamatan.id"
                                            :value="kecamatan.ongkir+ '|' +kecamatan.id" v-model="state.costService"
                                            @change="getTotalBayar">
                                        <label class="form-check-label font-weight-normal mr-5" :for="kecamatan.id">
                                            {{ kecamatan.title}} - Rp. {{ moneyFormat(kecamatan.ongkir) }} </label>
                                    </div>
                                </div>
                            </div>

                            
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label class="font-weight-bold">ALAMAT LENGKAP</label>
                                    <textarea class="form-control" id="alamat" rows="3"
                                        placeholder="Alamat Lengkap&#10;&#10;Contoh: Jl. Tanayung, Desa Pandulangan, RT.03/RW.04, Kec. Padang Batung, Hulu Sungai Selatan"
                                        v-model="state.address"></textarea>
                                    <div v-if="validation.address" class="mt-2 alert alert-danger">
                                        Masukkan Alamat Lengkap
                                    </div>
                                </div>
                            </div>

                            <div v-if="state.buttonCheckout" class="col-md-12">
                                <button @click.prevent="checkout" class="btn btn-primary btn-lg btn-block">CHECKOUT</button>
                            </div>
                            
                          </div>
                          
                      </div>
  
                      <!-- end ongkos kirim -->
  
                  </div>
              </div>
          </div>
          
          

      </div>
  </template>
  
  <script>
      import { onMounted, computed, reactive } from 'vue'
      import { useStore } from 'vuex' // <-- vuex
      import Api from '../../api/Api' // <-- global API endpoint
      import { useRouter } from 'vue-router' // vue router
      import Swal from 'sweetalert2'
      
  
      export default {
  
          name: 'CartComponent',
  
          setup() {
  
              //store vuex
              const store = useStore()

              //vue router
              const router = useRouter()
  
              //mounted cart
              onMounted(() => {
              
                  //menjalankan beberapa actions di module cart
                      store.dispatch('cart/cartCount')  // <-- untuk memanggil action "cartCount" di module "cart"
                      store.dispatch('cart/cartTotal')  // <-- untuk memanggil action "cartTotal" di module "cart"
                      store.dispatch('cart/cartWeight') // <-- untuk memanggil action "cartWeight" di module "cart"
                      fetchCustomerData();
              })
  
              //get data cart dari getters cart di module cart
              const carts = computed(() => {
                  return store.getters['cart/getCart']
              })
  
              //get total cart dari state cartTotal di module cart
              const cartTotal = computed(() => {
                  return store.state.cart.cartTotal
              })
  
              //get cart weight dari state cartWeight di module cart
              const cartWeight = computed(() => {
                  return store.state.cart.cartWeight
              })
  
              /**
               * remove cart
               */
              function removeCart(cart_id) {
                  //panggil actions "removeCart" di module "cart" dengan parameter "cart_id"
                  store.dispatch('cart/removeCart', cart_id)
              }
  
    
              /**
              * ongkos kirim
              */

                //define state form
                const state = reactive({
                    name:           '',     // <-- state name
                    phone:          '',     // <-- state phone  
                    address:        '',     // <-- state address
                    kabupaten_id: '',
                    kabupatens:      [],     // <-- state kabupatens
                    kecamatans:         [],     // <-- state kecamatamns
                    kecamatan_id: '',
                    selectedKabupaten: '',
                    selectedKecamatan: '',
                    cost:           false,  // <-- state cost kurir
                    costs:          '',     // <-- state costs kurir
                    costService:    '',     // <-- state get data cost dan service pengiriman
                    ongkir: 0,
                    courier_cost:   0,      // <-- state untuk menyimpan cost kurir
                    courier_service:'',     // <- state untuk menyimpan service kurir        
                    buttonCheckout: false,  // <-- state button checkout 
                    grandTotal:     0       // <-- state untuk grand total 
                })

                //define state validation
                const validation = reactive({
                    name:       false, // <-- validation name
                    phone:      false, // <-- validation phone
                    address:    false  // <-- validation address 
                })

                //mounted data provinces
                const kabupatens = onMounted(() => {

                Api.get('/kabupatens')

                    .then(response => {

                        state.kabupatens = response.data.kabupatens // <-- assign state kabupatens dengan data hasil response

                    }).catch(error => {
                        console.log(error)
                    }) 

                })

                function getKecamatans() {
                    
                        Api.get(`/kecamatans`, {
                            params: {
                                kabupaten_id: state.kabupaten_id,
                                ongkir: state.costService
                                
                            }
                        })
                            
                            .then(response => {

                                // set state cost menjadi true, untuk menampilkan pilihan cost pengiriman
                                state.cost = true

                                state.kecamatans = response.data.kecamatans;
                            })
                            .catch(error => {
                                console.error('Error fetching kecamatans:', error);
                            });
                }

                //fungsi untuk mengambil biaya ongkos kirim dan service kurir
                function getTotalBayar() {
                    
                    //split value dengan menghapus string -> | 
                    let shipping = state.costService.split("|")


                    //set state cost dan service
                    state.courier_cost    = shipping[0]
                    state.kecamatan_id = shipping[1]

                    //hitung grandrotal
                    const token = store.state.auth.token

                    Api.defaults.headers.common['Authorization'] = "Bearer" +token
                    Api.get('cart/total')
                    .then(response => {

                        //jumlahkan total cart dan cost pengiriman
                        state.grandTotal = parseInt(response.data.total) + parseInt(state.courier_cost)

                    })

                    //show button checkout
                    state.buttonCheckout = true
                }

                //method/function checkout
                function checkout() {
                    // check if any product in cart has zero stock
                    const hasZeroStock = carts.value.some(cart => cart.product.stock === 0);
                    
                    if (hasZeroStock) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Stok Kosong',
                            text: 'Mohon maaf stok produk sedang kosong. Silakan diorder lain waktu.',
                            confirmButtonColor: '#d33',
                            confirmButtonText: 'OK'
                        });
                        return;
                    }


                    // check if any product in cart has quantity over the stock
                    const quantityOveredProducts = carts.value.filter(cart => cart.product.stock < cart.quantity);

                    if (quantityOveredProducts.length > 0) {
                        const errorMessage = quantityOveredProducts.map(cart => {
                            return `Stok tidak mencukupi untuk produk ${cart.product.title}. Stok tersedia: ${cart.product.stock}, Jumlah yang diminta: ${cart.quantity}.`;
                        }).join('<br>');
                        Swal.fire({
                            icon: 'warning',
                            title: 'Stok Tidak Cukup',
                            html: errorMessage,
                            confirmButtonColor: '#d33',
                            confirmButtonText: 'OK'
                        });
                        return;
                    }

                    // check if there is name, phone, address, and product weight
                    if (state.name && state.phone && state.address && cartWeight.value) {
                        
                        // define variable
                        let data = {
                            name: state.name,
                            phone: state.phone,
                            kabupaten_id: state.kabupaten_id,
                            kecamatan_id: state.kecamatan_id,
                            courier_cost: state.courier_cost,
                            weight: cartWeight.value,
                            address: state.address,
                            grandTotal: state.grandTotal
                        }

                        store.dispatch('cart/checkout', data)
                            .then(response => {
                                // if successful, redirect to order detail with midtrans snap_token parameter
                                router.push({
                                    name: 'detail_order',
                                    params: {
                                        snap_token: response[0].snap_token
                                    }
                                })
                            }).catch(error => {
                                console.log(error)
                            })

                    }

                    // check name validation
                    if (!state.name) {
                        validation.name = true
                    }

                    // check phone validation
                    if (!state.phone) {
                        validation.phone = true
                    }

                    // check address validation
                    if (!state.address) {
                        validation.address = true
                    }
                }

                function fetchCustomerData() {
            Api.get('/customer')
                .then(response => {
                    if (response.data && response.data.customer) {
                        const customer = response.data.customer;
                        state.name = customer.name || '';
                    }
                })
                .catch(error => {
                    console.error('Error fetching customer data:', error);
                });
        }


                

                return {
                    carts,              // <-- state carts
                    cartTotal,          // <-- state cartTotal
                    cartWeight,         // <-- state cartWeight
                    removeCart,         // <-- method removeCart
                    state,              // <-- state form
                    validation,         // <-- state validation
                    kabupatens,
                    getKecamatans,
                    getTotalBayar,
                   
                    checkout,  
                    fetchCustomerData     
                    
                }
  
          }
  
      }
  </script>