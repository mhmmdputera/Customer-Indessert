//import global API
import Api from '../../api/Api'

const cart = {

    //set namespace true
    namespaced: true,

    //state
    state: {
    
        //cart
        cart: [],

        //total cart
        cartTotal: 0,

        //cart weight
        cartWeight: 0,
        
        quantity: 0

    },

    //mutations
    mutations: {

        //get data cart
        GET_CART(state, product) {
            state.cart = product
        },

        //get total cart
        TOTAL_CART(state, total) {
            state.cartTotal = total
        },

        //get cart weight
        CART_WEIGHT(state, weight) {
            state.cartWeight = weight
        },

        //get cart weight
        CART_QUANTITY(state, quantity) {
            state.cartQuantity = quantity
        },

        //clear all cart
        CLEAR_CART(state) {
            state.cart       = []
            state.cartTotal  = 0
            state.cartWeight = 0
            state.cartQuantity = 0
        },

    },

    //actions
    actions: {

        //action addToCart
        addToCart({ commit }, { product_id, price, quantity, weight }) {

            //get data token dan user
            const token = localStorage.getItem('token')
            const user  = JSON.parse(localStorage.getItem('user'))

            //set axios header dengan type Authorization + Bearer token
            Api.defaults.headers.common['Authorization'] = "Bearer " +token
            
            //send data cart ke server
            Api.post('/cart', {
                product_id: product_id,
                price: price,
                quantity: quantity,
                weight: weight,
                customer_id: user.id
            })
            .then(() => {

                //get dat cart
                Api.get('/cart/quantity')
                .then(response => {
                    
                    //commit mutation GET_CART
                    commit('CART_QUANTITY', response.data.quantity)

                })

                //get total cart
                Api.get('/cart/total')
                .then(response => {
                    
                    //commit mutation TOTAL_CART
                    commit('TOTAL_CART', response.data.total)

                })

            })
        },

        //cart count
        cartCount({ commit }) {

            //get data token dan user
            const token = localStorage.getItem('token')

            //set axios header dengan type Authorization + Bearer token
            Api.defaults.headers.common['Authorization'] = "Bearer " + token

            //get dat cart
            Api.get('/cart')
            .then(response => {
                
                //commit mutation GET_CART
                commit('GET_CART', response.data.cart)

            })

        },

        //cart total
        cartTotal({ commit }) {

            //get data token dan user
            const token = localStorage.getItem('token')

            //set axios header dengan type Authorization + Bearer token
            Api.defaults.headers.common['Authorization'] = "Bearer " + token

            //get dat cart
            Api.get('/cart/total')
            .then(response => {
                
                //commit mutation GET_CART
                commit('TOTAL_CART', response.data.total)

            })

        },

        //cart weight
        cartWeight({ commit }) {

            //get data token dan user
            const token = localStorage.getItem('token')

            //set axios header dengan type Authorization + Bearer token
            Api.defaults.headers.common['Authorization'] = "Bearer " + token

            Api.get('/cart/totalWeight')
            .then(response => {
                
                //commit mutation CART_WEIGHT
                commit('CART_WEIGHT', response.data.total)

            })

        },

        //cart quantity
        cartQuantity({ commit }) {

            //get data token dan user
            const token = localStorage.getItem('token')

            //set axios header dengan type Authorization + Bearer token
            Api.defaults.headers.common['Authorization'] = "Bearer " + token

            Api.get('/cart/quantity')
            .then(response => {
                
                //commit mutation CART_WEIGHT
                commit('CART_QUANTITY', response.data.quantity)

            })

        },

        //action remove cart
        removeCart({ commit }, cart_id) {

            //get data token dan user
            const token = localStorage.getItem('token')

            //set axios header dengan type Authorization + Bearer token
            Api.defaults.headers.common['Authorization'] = "Bearer " + token

            Api.post('/cart/remove', {
                cart_id: cart_id
            })
            .then(() => {
                

                //get cart
                Api.get('/cart')
                .then(response => {
                    
                    commit('GET_CART', response.data.cart)

                })

                //get total cart
                Api.get('/cart/total')
                .then(response => {
                    
                    commit('TOTAL_CART', response.data.total)

                })

                //get total cart weight
                Api.get('/cart/totalWeight')
                .then(response => {
                    
                    commit('CART_WEIGHT', response.data.total)

                })

                //get total cart weight
                Api.get('/cart/quantity')
                .then(response => {
                    
                    commit('CART_QUANTITY', response.data.quantity)

                })

            })

        },


        //checkout
        checkout({ commit }, data) {

            return new Promise((resolve, reject) => {

                Api.post('/checkout', {
                    
                    cost_ongkir:       data.courier_cost,
                    weight:     data.weight,
                    name:       data.name,
                    phone:      data.phone,
                    kabupaten:   data.kabupaten_id,
                    kecamatan:       data.kecamatan_id,
                    address:    data.address,
                    grand_total: data.grandTotal

                })
                .then(response => {

                    resolve(response.data)

                    //remove all Cart  on database
                    Api.post('/cart/removeAll')
                    .then(() => {

                        //clear  cart
                        commit('CLEAR_CART')

                    })
                    .catch(error => {
                        console.log(error)
                    })

                })
                .catch(error => {
                    reject(error)
                })

            })

        }


    },

    //getters
    getters: {

        //get cart
        getCart(state) {
            return state.cart
        },
        
        //count cart
        cartCount(state) {
            return state.cart.length
        },

        //cart total
        cartTotal(state) {
            return state.cartTotal
        },

        // cart quantity
        cartQuantity(state) {
            return state.cartQuantity
        }

    }

}

export default cart