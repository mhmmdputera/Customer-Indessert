<template>
    <div class="container-fluid mt-3">
        <div class="row">
            <div class="col-md-3 mb-4">
                <Category /> <!-- component Category -->
            </div>
            <div class="col-md-9 mb-4">
                <Slider /> <!-- component Slider -->
            </div>
        </div>
    </div>

    <div class="container-fluid mb-5 mt-4">
        <!-- data product -->
        <div class="row">
            <div class="col-md-12">
                <h4 class="font-weight-bold"><i class="fa fa-shopping-bag"></i> OPEN PRE-ORDER</h4>
                <hr style="border-top: 5px solid rgb(154 155 156);border-radius:.5rem">
            </div>
        </div>

        <div class="row">
            <div v-for="product in sortedProducts" :key="product.id" class="col-md-3 col-6 mb-3">
                <div class="card h-100 border-0 shadow rounded-md position-relative" :class="{'product-closed': product.status === 'tutup'}">
                    <div class="card-img">
                        <img :src="product.image"
                            class="w-100"
                            style="height: 15em;object-fit:cover;border-top-left-radius: .25rem;border-top-right-radius: .25rem;">
                        <div v-if="product.status === 'tutup'" class="product-overlay">
                            KOSONG
                        </div>
                    </div>
                    <div class="card-body">
                        <router-link :to="{name: 'detail_product', params:{slug: product.slug }}" class="card-title font-weight-bold" style="font-size:20px">
                            {{ product.title }}
                        </router-link>

                        <div v-if="product.discount > 0" class="discount mt-2" style="color: #999"><s>Rp. {{ moneyFormat(product.price) }}</s> <span
                                style="background-color: darkorange" class="badge badge-pill badge-success text-white">DISKON
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
import Category from '../../components/Category.vue' // <-- component Category
import Slider from '../../components/Slider.vue' // <-- component Slider
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'

export default {
    components: {
        Category,       // <-- register component Category
        Slider          // <-- register component slider
    },
    setup() {
        //store vuex
        const store = useStore()
        //onMounted akan menjalankan action "getProducts" di module "product"
        onMounted(() => {
            store.dispatch('product/getProducts')
        })
        //computed properti digunakan untuk get data products dari state di module product 
        const products = computed(() => {
            return store.state.product.products
        })

        //computed properti untuk mengurutkan produk berdasarkan status
        const sortedProducts = computed(() => {
            return products.value.slice().sort((a, b) => a.status === 'tutup' ? 1 : -1)
        })

        return {
            store,
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
