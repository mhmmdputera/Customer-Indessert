import Api from '../../api/Api'

const order = {
    namespaced: true,
    state: {
        orders: [],
        detailOrder: {},
        productInOrder: [],
        invoices: []
    },
    mutations: {
        GET_ORDER(state, orders) {
            state.orders = orders
        },
        DETAIL_ORDER(state, detailOrder) {
            state.detailOrder = detailOrder
        },
        PRODUCT_IN_ORDER(state, product) {
            state.productInOrder = product
        },
        SET_ORDER_RECEIVED(state) {
            state.detailOrder.order_received = true
        },
        UPDATE_INVOICE_STATUS(state, status) {
            state.detailOrder.status = status;
        },
        UPDATE_ORDER_STATUS_FAILED(state) {
            state.detailOrder.status = 'failed';
        }
    },
    actions: {
        getOrder({ commit }) {
            const token = localStorage.getItem('token')
            Api.defaults.headers.common['Authorization'] = "Bearer " + token
            Api.get('/order')
                .then(response => {
                    commit('GET_ORDER', response.data.data)
                })
        },
        detailOrder({ commit }, snap_token) {
            const token = localStorage.getItem('token')
            Api.defaults.headers.common['Authorization'] = "Bearer " + token
            Api.get(`order/${snap_token}`)
                .then(response => {
                    commit('DETAIL_ORDER', response.data.data)
                    commit('PRODUCT_IN_ORDER', response.data.product)
                })
        },
        updateOrderStatus({ commit }, id) {
            const token = localStorage.getItem('token')
            Api.defaults.headers.common['Authorization'] = "Bearer " + token
            return Api.put(`/order/${id}/status`)
                .then(response => {
                    commit('UPDATE_INVOICE_STATUS', 'success')
                    return response.data
                })
        },
        confirmOrderReceived({ commit }, orderId) {
            const token = localStorage.getItem('token')
            Api.defaults.headers.common['Authorization'] = "Bearer " + token
            return Api.put(`/order/${orderId}/confirm`)
                .then(response => {
                    commit('SET_ORDER_RECEIVED')
                    return response.data
                })
        },
        cancelOrder({ commit }, orderId) {
            const token = localStorage.getItem('token')
            Api.defaults.headers.common['Authorization'] = "Bearer " + token
            return Api.put(`/order/${orderId}/cancel`)
                .then(response => {
                    commit('UPDATE_ORDER_STATUS_FAILED')
                    return response.data
                })
        },
        exportPdf({ commit }, snap_token) {
            const token = localStorage.getItem('token');
            Api.defaults.headers.common['Authorization'] = "Bearer " + token;
            return Api.get(`/order/${snap_token}/pdf`, {
                responseType: 'blob'
            }).then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `Invoice-${snap_token}.pdf`);
                document.body.appendChild(link);
                link.click();
                link.remove();
            }).catch(error => {
                console.error('Error exporting PDF:', error);
            });
        }
    },
    getters: {
        getOrder(state) {
            return state.orders
        },
        detailOrder(state) {
            return state.detailOrder
        },
        productInOrder(state) {
            return state.productInOrder
        }
    }
}

export default order
