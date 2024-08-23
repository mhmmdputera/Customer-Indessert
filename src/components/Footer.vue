<template>
    <footer style="background: #ffffff;border-top: 5px solid #c69a41;" class="pt-5">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-3 mb-4">
                    <h4 class="font-weight-bold">QUICK LINKS</h4>
                    <hr style="border-top: 3px solid rgb(226 232 240);border-radius:.5rem">
                    <ul style="list-style: none; padding-left: 0;">
                        <li><router-link to="/tentang" style="color: #000000;">Tentang</router-link></li>
                        <li><router-link to="/info-produk" style="color: #000000;">Informasi Produk</router-link></li>
                    </ul>
                </div>
                <div class="col-md-5 mb-4">
                    <h4 class="font-weight-bold">PEMBAYARAAN</h4>
                    <hr style="border-top: 3px solid rgb(226 232 240);border-radius:.5rem">
                    <div class="row">
                        <div class="col-md-4 col-4 mb-3">
                            <div class="card h-100 border-0 rounded shadow">
                                <div class="card-body p-2 text-center">
                                    <img src="../assets/payment/mandiri.png" style="width: 50px;">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 col-4 mb-3">
                            <div class="card h-100 border-0 rounded shadow">
                                <div class="card-body p-2 text-center">
                                    <img src="../assets/payment/atm-bersama.jpg" style="width: 40px;">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 col-4 mb-3">
                            <div class="card h-100 border-0 rounded shadow">
                                <div class="card-body p-2 text-center">
                                    <img src="../assets/payment/BRI.png" style="width: 60px;">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 col-4 mb-3">
                            <div class="card h-100 border-0 rounded shadow">
                                <div class="card-body p-2 text-center">
                                    <img src="../assets/payment/GOPAY.png" style="width: 60px;">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 col-4 mb-3">
                            <div class="card h-100 border-0 rounded shadow">
                                <div class="card-body p-2 text-center">
                                    <img src="../assets/payment/indomaret-logo.png" style="width: 60px;">
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div class="col-md-4 mb-4">
                    <h4 class="font-weight-bold">KONTAK</h4>
                    <hr style="border-top: 3px solid rgb(226 232 240);border-radius:.5rem">
                    <p>
                        <i class="fa fa-clock"></i> Toko Buka Setiap Open Pre-Order :
                        <br>
                        WA  : 087824132010
                        <br>
                        IG  : @indessert
                    </p>
                    <p>
                        <i class="fa fa-map-marker"></i>Jl. Tanayung, Desa Pandulangan, RT.03/RW.04, Kec. Padang Batung, Hulu Sungai Selatan
                    </p>
                </div>
            </div>
            <div class="row text-center mt-3 pb-3">
                <div class="col-md-12">
                    <hr>
                    © <strong>Online Shop</strong> 2024 • Indessert
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
    export default {
        name: 'FooterComponent',
    }
</script>