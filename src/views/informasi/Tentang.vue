<template>
    <div class="about-us py-5">
      <div class="container">
        <div class="card shadow-sm border-0">
          <div class="card-body p-5">
            <h1 class="text-center mb-4">Tentang Kami</h1>
            <p class="text-center mb-5">
              Selamat datang di <strong>Indessert</strong>, tempat terbaik untuk menemukan berbagai macam dessert berkualitas tinggi dengan harga terjangkau. Kami berkomitmen untuk memberikan pengalaman berbelanja yang menyenangkan dan memuaskan bagi setiap pelanggan kami.
            </p>
  
            <div class="section mb-5">
              <h2 class="section-title">Misi Kami</h2>
              <p>
                Misi kami adalah menyediakan dessert terbaik yang dibuat dengan bahan-bahan berkualitas tinggi dan cinta. Kami berusaha untuk selalu menghadirkan inovasi baru dalam setiap produk kami dan memastikan kepuasan pelanggan melalui pelayanan yang ramah dan profesional.
              </p>
            </div>
  
            <div class="section mb-5">
              <h2 class="section-title">Sejarah Kami</h2>
              <p>
                Indessert didirikan pada tahun 2020 dengan tujuan untuk membawa kebahagiaan melalui setiap gigitan manis. Berawal dari dapur kecil di Kandangan, kami telah berkembang menjadi toko online yang melayani pelanggan di seluruh Indonesia, selalu menjaga kualitas dan rasa autentik dalam setiap produk kami.
              </p>
            </div>
  
            <div class="section mb-5">
              <h2 class="section-title">Tim Kami</h2>
              <p>
                Tim kami terdiri dari para profesional yang berdedikasi dan berpengalaman di bidang kuliner dan pelayanan pelanggan. Kami bekerja sama untuk memastikan setiap produk yang kami hasilkan memenuhi standar kualitas tinggi dan setiap pengalaman belanja Anda menjadi istimewa.
              </p>
            </div>
  
            <div class="section mb-5">
              <h2 class="section-title">Nilai-Nilai Kami</h2>
              <ul class="list-unstyled">
                <li class="mb-2">
                  <strong>Keaslian:</strong> Kami menjaga resep tradisional dan rasa autentik dalam setiap produk kami.
                </li>
                <li class="mb-2">
                  <strong>Kualitas:</strong> Kami hanya menggunakan bahan-bahan terbaik untuk memastikan kualitas produk yang tinggi.
                </li>
                <li class="mb-2">
                  <strong>Inovasi:</strong> Kami terus berkreasi dan menghadirkan varian dessert baru untuk memenuhi selera Anda.
                </li>
                <li class="mb-2">
                  <strong>Pelayanan:</strong> Kepuasan pelanggan adalah prioritas utama kami, dan kami berkomitmen untuk memberikan pelayanan terbaik.
                </li>
              </ul>
            </div>
  
            <div class="section">
              <h2 class="section-title">Hubungi Kami</h2>
              <p>
                Jika Anda memiliki pertanyaan, saran, atau ingin mengetahui lebih lanjut tentang kami, jangan ragu untuk menghubungi kami melalui:
              </p>
              <ul class="list-unstyled">
                <li>
                  <strong>Email:</strong> <a href="mailto:contact@indessert.com" class="text-decoration-none text-dark">contact@indessert.com</a>
                </li>
                <li>
                  <strong>Telepon:</strong> 0878-2413-2010
                </li>
                <li>
                  <strong>Alamat:</strong> Jl. Tanayung, Desa Pandulangan, RT.03/RW.04, Kec. Padang Batung, Hulu Sungai Selatan
                </li>
              </ul>
              <div class="mt-3">
                <a href="https://www.instagram.com/in.dessert_/" target="_blank" class="text-dark me-3">
                  <i class="fab fa-instagram fa-2x"></i>
                </a>
              </div>
            </div>
  
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'TentangShowComponent',
  }
  </script>
  
  <style scoped>
  
  .section-title {
    font-size: 1.5rem;
    color: #c69a41;
    margin-bottom: 1rem;
    position: relative;
    padding-bottom: 0.5rem;
  }
  
  .section-title::after {
    content: '';
    position: absolute;
    width: 60px;
    height: 3px;
    background-color: #c69a41;
    bottom: 0;
    left: 0;
  }
  
  .card {
    border-radius: 0.75rem;
  }
  
  .card-body {
    padding: 3rem;
  }
  
  @media (max-width: 576px) {
    .card-body {
      padding: 1.5rem;
    }
  
    .section-title {
      font-size: 1.25rem;
    }
  }
  </style>
  

<!-- <template>
    <div class="about-us">
      <div class="container">
        <h1 class="title">Tentang Kami</h1>
        <p class="intro">Selamat datang di [Nama Toko], tempat terbaik untuk menemukan [deskripsi produk utama Anda] berkualitas tinggi dengan harga terbaik.</p>
  
        <section class="mission">
          <h2>Misi Kami</h2>
          <p>Misi kami adalah menyediakan produk berkualitas tinggi kepada pelanggan kami dengan layanan yang luar biasa. Kami berusaha untuk selalu menawarkan yang terbaik, mulai dari pemilihan produk hingga pengiriman cepat dan layanan pelanggan yang responsif.</p>
        </section>
  
        <section class="history">
          <h2>Sejarah Kami</h2>
          <p>[Nama Toko] didirikan pada [tahun didirikan] dengan tujuan menyediakan [deskripsi produk atau layanan] kepada masyarakat. Sejak saat itu, kami terus berkembang dan melayani ribuan pelanggan di seluruh [lokasi geografis] dengan komitmen yang sama terhadap kualitas dan kepuasan pelanggan.</p>
        </section>
  
        <section class="team">
          <h2>Tim Kami</h2>
          <p>Tim kami terdiri dari individu-individu yang berpengalaman dan berdedikasi dalam industri ini. Kami bekerja sama untuk memastikan setiap aspek bisnis kami berjalan lancar, dari pengadaan produk hingga pengiriman akhir kepada pelanggan.</p>
        </section>
  
        <section class="values">
          <h2>Nilai-Nilai Kami</h2>
          <ul>
            <li><strong>Integritas:</strong> Kami selalu menjaga kejujuran dan transparansi dalam semua yang kami lakukan.</li>
            <li><strong>Kualitas:</strong> Kami hanya menawarkan produk yang memenuhi standar kualitas tinggi.</li>
            <li><strong>Layanan Pelanggan:</strong> Kepuasan pelanggan adalah prioritas utama kami.</li>
            <li><strong>Inovasi:</strong> Kami terus berinovasi untuk meningkatkan pengalaman berbelanja Anda.</li>
          </ul>
        </section>
  
        <section class="contact">
          <h2>Hubungi Kami</h2>
          <p>Jika Anda memiliki pertanyaan, saran, atau ingin mengetahui lebih lanjut tentang kami, jangan ragu untuk menghubungi kami melalui:</p>
          <ul>
            <li>Email: <a href="mailto:contact@yourstore.com">contact@yourstore.com</a></li>
            <li>Telepon: [Nomor Telepon]</li>
            <li>Alamat: [Alamat Lengkap]</li>
          </ul>
        </section>
      </div>
    </div>
  </template>
  
  <script>
export default {
    name: 'TentangShowComponent',
}
</script>
  
  <style scoped>
  .about-us {
    padding: 50px 0;
  }
  
  .container {
    max-width: 800px;
    margin: 0 auto;
  }
  
  .title {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 30px;
  }
  
  .intro {
    font-size: 1.2rem;
    text-align: center;
    margin-bottom: 50px;
  }
  
  section {
    margin-bottom: 40px;
  }
  
  h2 {
    font-size: 1.8rem;
    margin-bottom: 20px;
    color: #c69a41;
  }
  
  ul {
    list-style: none;
    padding: 0;
  }
  
  li {
    margin-bottom: 10px;
  }
  
  a {
    color: #c69a41;
    text-decoration: none;
  }
  
  a:hover {
    text-decoration: underline;
  }
  </style>
  
 -->
