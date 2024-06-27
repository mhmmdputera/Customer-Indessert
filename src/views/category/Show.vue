<template>
    <div class="container-fluid mb-5 mt-4">
        <div class="row">
            <div v-for="product in sortedProducts" :key="product.id" class="col-md-3 col-6 mb-3">
                <div class="card h-100 border-0 shadow rounded-md position-relative" :class="{'product-closed': product.status === 'tutup'}">
                    <div class="card-img">
                        <img :src="product.image" class="w-100"
                            style="height: 15em;object-fit:cover;border-top-left-radius: .25rem;border-top-right-radius: .25rem;">
                        <div v-if="product.status === 'tutup'" class="product-overlay">
                            TUTUP
                        </div>
                    </div>
                    <div class="card-body">
                        <router-link :to="{name: 'detail_product', params:{slug: product.slug }}"
                            class="card-title font-weight-bold" style="font-size:20px">
                            {{ product.title }}
                        </router-link>

                        <div class="discount mt-2" style="color: #999"><s>Rp. {{ moneyFormat(product.price) }}</s>
                            <span style="background-color: darkorange"
                                class="badge badge-pill badge-success text-white">DISKON
                                {{ product.discount }} %</span>
                        </div>

                        <div class="price font-weight-bold mt-3" style="color: #47b04b;font-size:20px">
                            Rp. {{ moneyFormat(calculateDiscount(product)) }}</div>
                        <router-link :to="{name: 'detail_product', params:{slug: product.slug}}" class="btn btn-primary btn-md mt-3 btn-block shadow-md">LIHAT PRODUK</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, onMounted } from 'vue'   // computed dan onMounted
import { useStore } from 'vuex' // store Vuex
import { useRoute } from 'vue-router' // vue router

export default {
    name: 'CategoryShowComponent',
    setup() {
        //store vuex
        const store = useStore()
        //vue route
        const route = useRoute()

        //onMounted akan menjalankan action "getProductInCategory" di module "category" Vuex
        onMounted(() => {
            store.dispatch('category/getProductInCategory', route.params.slug)
        })

        //computed properti digunakan untuk mendapatkan data products dari state "productInCategory" di module "category" 
        const products = computed(() => {
            return store.state.category.productInCategory
        })

        //computed properti untuk mengurutkan produk berdasarkan status
        const sortedProducts = computed(() => {
            return products.value.slice().sort((a, b) => a.status === 'tutup' ? 1 : -1)
        })

        return {
            store,
            route,
            products,
            sortedProducts
        }
    }
}
</script>

<style scoped>
.product-closed img {
    filter: grayscale(100%);
}
.product-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5em;
    font-weight: bold;
}
</style>
