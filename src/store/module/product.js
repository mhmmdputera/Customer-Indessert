//import global API
import Api from '../../api/Api'
import Swal from 'sweetalert2';


const product = {

    //set namespace true
    namespaced: true,

    //state
    state: {
    
        //index products
        products: [],

        //detail product
        product: {}

    },

    //mutations
    mutations: {

        //set state products dengan data dari response 
        GET_PRODUCTS(state, products) {
            state.products = products
        },

        //set state product dengan data dari response
        DETAIL_PRODUCT(state, product) {
            state.product = product
        }

    },

    //actions
    actions: {

        //action getProducts
        getProducts({ commit }) {

            //get data sliders ke server
            Api.get('/products')
            .then(response => {

                //commit ke mutation GET_PRODUCTS dengan response data
                commit('GET_PRODUCTS', response.data.products)

            }).catch(error => {

                //show error log dari response
                console.log(error)

            })
        },

        //action getDetailProducts
        getDetailProduct({ commit }, slug) {

            //get data sliders ke server
            Api.get(`/product/${slug}`)
            .then(response => {

                //commit ke mutation GET_PRODUCTS dengan response data
                commit('DETAIL_PRODUCT', response.data.product)

            }).catch(error => {

                 //menangani jika produk tidak ditemukan atau status tutup
            if (error.response && error.response.status === 404) {
                Swal.fire({
                    icon: 'error',
                    title: 'Produk tidak tersedia',
                    text: 'Produk ini sedang kosong atau sudah ditutup.',
                    confirmButtonText: 'OK'
                }).then(() => {
                    // Redirect pengguna ke halaman utama atau halaman lain
                    this.$router.push({ name: 'home' });
                });
            } else {
                console.log(error);
            }

            })
        }

    },

    //getters
    getters: {

    }

}

export default product