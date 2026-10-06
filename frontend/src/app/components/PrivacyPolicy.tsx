import React, { useEffect } from "react";

export default function PrivacyPolicy() {
  useEffect(() => {
    document.title = "Kebijakan Privasi | GBI Taman Mahkota";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div 
      style={{ fontFamily: "'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
      className="bg-white min-h-screen text-[#212529] selection:bg-blue-200 selection:text-black"
    >
      {/* Pembatas lebar ala Bootstrap (.container) agar teks tidak meregang ekstrem */}
      <div className="w-full max-w-[1140px] mx-auto px-5 sm:px-8 py-8 md:py-10">
        
        {/* HEADER LOGO */}
        <div className="flex items-center gap-3 mb-6">
          <img 
            src="/logo.png" 
            alt="Logo GBI" 
            className="w-[45px] h-[45px] object-contain" 
          />
          <div className="leading-tight">
            <div className="text-[15px] font-bold text-black tracking-tight">GBI</div>
            <div className="text-[15px] font-bold text-black tracking-tight">TAMAN MAHKOTA</div>
          </div>
        </div>

        {/* KONTEN (Semua dipaksa 14px, judul hanya dibedakan dengan cetak tebal) */}
        <div className="text-[14px] leading-[1.6]">
          
          <h1 className="font-bold uppercase mb-3">KEBIJAKAN PRIVASI</h1>
          
          <p className="mb-3">Kebijakan Privasi ini merupakan bagian dari syarat dan ketentuan penggunaan Lintar Mobile. Kebijakan ini menjelaskan cara kami mengumpulkan, menggunakan, mentransfer, mengungkapkan, dan melindungi Informasi Pribadi Anda yang diperoleh melalui Platform</p>
          <p className="mb-5">Silakan baca dengan cermat untuk memastikan Anda memahami praktik-praktik kebijakan privasi kami</p>

          {/* 1. DEFINISI */}
          <h2 className="font-bold uppercase mb-1">1. DEFINISI</h2>
          <p className="mb-2">Dalam Kebijakan Privasi ini:</p>
          <ol className="list-decimal pl-10 space-y-1 mb-5">
            <li><strong>Informasi Pribadi:</strong> Informasi yang dapat diidentifikasi tentang Anda yang dikumpulkan melalui Platform, seperti nama, alamat, tanggal lahir, jenis kelamin, pekerjaan, nomor telepon/HP, alamat email.</li>
            <li><strong>Layanan:</strong> Setiap transaksi yang dilakukan di atau oleh Lintam Mobile</li>
            <li><strong>Penyedia Layanan:</strong> -</li>
            <li><strong>Kami, kita, milik kami atau milik kita:</strong> GBI Taman Mahkota.</li>
            <li><strong>Platform:</strong> Situs web di -, setiap subdomainnya, platform lainnya, aplikasi perangkat seluler, tablet, dan perangkat pintar lainnya, serta program aplikasi antarmuka, dan semua layanan terkait yang dimiliki, didesain, dikembangkan, dan dipelihara oleh kami.</li>
            <li><strong>Anda:</strong> Setiap pengguna Layanan melalui Platform.</li>
          </ol>

          {/* 2. PENGUMPULAN INFORMASI PRIBADI */}
          <h2 className="font-bold uppercase mb-1">2. PENGUMPULAN INFORMASI PRIBADI</h2>
          <p className="mb-3">Informasi Pribadi dapat dikumpulkan secara otomatis dari Anda melalui berbagai cara saat Anda mengunjungi, mendaftar di Platform, atau menggunakan Layanan dan aktivitas yang tersedia di Platform. Informasi Pribadi diperlukan untuk memastikan kesepakatan antara Anda dan kami berjalan dengan baik serta memungkinkan kami memenuhi kewajiban hukum, seperti memverifikasi informasi akun, profil, dan daftar, mencegah penipuan, dan menciptakan lingkungan daring yang lebih aman. Tanpa informasi ini, kami mungkin tidak dapat menyediakan semua Layanan yang Anda minta.</p>
          <p className="mb-3">Jika Anda memberikan Informasi Pribadi milik orang lain di Platform, Anda harus memastikan bahwa orang tersebut telah membaca dan memahami Kebijakan Privasi ini serta memberikan persetujuan atas penggunaan dan pengungkapan Informasi Pribadi mereka sesuai dengan Kebijakan Privasi ini.</p>
          <p className="mb-3">Di beberapa bagian Platform, kami dapat mengumpulkan informasi yang Anda berikan secara sukarela, yang mungkin berisi Informasi Pribadi</p>
          <p className="mb-3">Jika Anda adalah pengguna Platform dan membuat atau memperbarui profil Anda, kami juga dapat mengumpulkan informasi mengenai foto Anda.</p>
          <p className="mb-5">Saat Anda mengunjungi Platform, beberapa informasi juga dapat dikumpulkan secara otomatis melalui penggunaan file log, seperti alamat IP komputer Anda, sistem operasi komputer Anda, tipe browser, alamat situs web rujukan, dan aktivitas Anda di Platform. Kami menggunakan informasi ini untuk tujuan seperti analisis tren, administrasi Platform, peningkatan layanan pelanggan, diagnosis masalah dengan server kami, melacak pergerakan pengguna, dan mengumpulkan informasi demografi secara luas untuk penggunaan keseluruhan.</p>
          <p className="mb-5">Kami juga dapat mengumpulkan dan menggunakan file log dan "cookies" untuk membantu Anda mempersonalisasi pengalaman online Anda (misalnya, jika Anda mendaftar di Platform, cookies membantu kami mengingat informasi tertentu Anda pada kunjungan berikutnya). Ini memudahkan proses pencatatan Informasi Pribadi Anda, seperti alamat penagihan dan informasi log masuk. Jika Anda kembali ke halaman situs yang sama, informasi yang Anda berikan sebelumnya dapat diperoleh kembali, sehingga Anda dapat dengan mudah menggunakan fitur-fitur Platform yang telah Anda kustomisasi. Banyak browser web menerima cookies secara otomatis, tetapi Anda biasanya dapat mengubah pengaturan browser Anda untuk menolak cookies jika Anda menginginkannya. Jika Anda memilih untuk menolak cookies, Anda mungkin tidak dapat menikmati sepenuhnya fitur interaktif Platform.</p>
          
          {/* 3. PENGGUNAAN INFORMASI PRIBADI */}
          <h2 className="font-bold uppercase mb-1">3. PENGGUNAAN INFORMASI PRIBADI</h2>
          <p className="mb-2">Kami mengumpulkan Informasi Pribadi melalui Platform untuk memudahkan penggunaan Anda, memproses permintaan atau transaksi, menyediakan informasi, produk, dan layanan yang Anda minta, serta mengelola dan mendukung operasi Platform. Informasi Pribadi juga digunakan untuk tujuan bisnis kami, seperti:</p>
          <ul className="list-disc pl-10 space-y-1 mb-3">
            <li>Mengirimkan email "selamat datang" setelah pendaftaran dan menghubungi Anda untuk tujuan administrasi atau teknis, serta menyediakan layanan pelanggan.</li>
            <li>Memverifikasi informasi atau identitas yang Anda berikan, seperti saat membuat profil.</li>
            <li>Memberikan informasi atau berita GBI Taman Mahkota melalui email, telepon, pesan, atau bentuk komunikasi lainnya.</li>
            <li>Mendeteksi dan mencegah penipuan, spam, penyalahgunaan, insiden keamanan, dan aktivitas berbahaya lainnya.</li>
            <li>Meminta saran atau kritik untuk menganalisis, mengembangkan, menyesuaikan, dan meningkatkan Platform serta layanan kami.</li>
            <li>Memenuhi tujuan khusus sesuai dengan informasi yang diberikan.</li>
          </ul>
          <p className="mb-3">Kami dapat menggunakan email, nama, nomor telepon/HP, kata sandi akun, dan informasi pribadi lainnya untuk memverifikasi kepemilikan akun Anda, berkomunikasi terkait pemesanan, dan menyediakan informasi tentang Platform. Informasi ini juga digunakan untuk mengirimkan berita, pembaruan umum atau informasi dari GBI Taman Mahkota.</p>
          <p className="mb-3">Kami tidak menjual atau meminjamkan informasi pribadi yang dikumpulkan melalui Platform, kecuali sebagaimana diungkapkan dalam Kebijakan Privasi ini. Informasi non-pribadi dapat dibagikan dengan pihak ketiga tanpa otorisasi Anda. Informasi pribadi dapat dibagikan dengan pihak ketiga jika Anda mengindikasikan keinginan untuk menerima informasi dari mereka atau memberikan persetujuan, termasuk jika diinformasikan di Platform bahwa informasi akan dibagikan dengan cara tertentu.</p>
          <p className="mb-5">Informasi pribadi yang ditampilkan di area publik Platform dapat dilihat oleh siapa saja. Menampilkan informasi di area publik merupakan persetujuan Anda untuk membagikannya secara publik</p>
          <p className="mb-5">Kami akan mengungkap informasi pribadi tanpa pemberitahuan jika diperlukan oleh hukum atau dengan itikad baik untuk mematuhi hukum, peraturan, dan persyaratan pemerintah, termasuk dalam sengketa atau proses hukum antara Anda dan kami atau pengguna lain terkait Platform, atau dalam keadaan darurat kesehatan dan/atau keamanan Anda.</p>
          
          {/* 4. TAUTAN KE SITUS LAIN */}
          <h2 className="font-bold uppercase mb-1">4. TAUTAN KE SITUS LAIN</h2>
          <p className="mb-5">Platform ini mungkin berisi tautan ke situs lain yang tidak kami operasikan. Jika Anda mengklik tautan pihak ketiga, Anda akan diarahkan ke situs tersebut. Kami sangat menyarankan Anda untuk meninjau syarat penggunaan dan kebijakan privasi setiap situs yang Anda kunjungi serta memastikan langkah-langkah keamanan dan manajemen yang aman di perangkat Anda sebelum mengaksesnya</p>

          {/* 5. KEAMANAN DAN AKSES TIDAK SAH */}
          <h2 className="font-bold uppercase mb-1">5. KEAMANAN DAN AKSES TIDAK SAH</h2>
          <p className="mb-3">Anda bertanggung jawab untuk menjaga dan mencegah akses tidak sah terhadap informasi pengguna dan kata sandi yang Anda gunakan untuk mengakses Platform. Anda setuju untuk tidak mengungkapkan kata sandi Anda kepada pihak ketiga dan bertanggung jawab atas semua aktivitas yang terjadi di akun Anda, baik Anda memberikan izin atau tidak. Anda harus segera memberi tahu kami tentang penggunaan tidak sah akun Anda. Kami berupaya mengamankan Informasi Pribadi dari akses, penggunaan, atau pengungkapan tidak sah dengan menerapkan langkah-langkah fisik, elektronik, dan prosedural untuk melindungi informasi yang kami kumpulkan melalui Platform.</p>
          <p className="mb-5">Kami tidak menjamin keamanan basis data kami dan tidak menjamin bahwa informasi yang Anda berikan tidak akan terganggu saat ditransmisikan kepada kami. Setiap transmisi informasi kepada kami adalah risiko Anda sendiri. Seperti halnya teknologi, tidak ada sistem keamanan yang sepenuhnya tidak dapat ditembus.</p>

          {/* 6. PEMBARUAN KEBIJAKAN PRIVASI */}
          <h2 className="font-bold uppercase mb-1">6. PEMBARUAN KEBIJAKAN PRIVASI</h2>
          <p className="mb-5">Kami dapat mengubah atau memperbarui Kebijakan Privasi ini dari waktu ke waktu untuk mencerminkan masukan pelanggan atau perubahan dalam praktik kami. Kami menyarankan Anda untuk secara berkala memeriksa halaman ini untuk mendapatkan informasi terbaru mengenai praktik privasi kami.</p>

          {/* 7. PERSETUJUAN ANDA */}
          <h2 className="font-bold uppercase mb-1">7. PERSETUJUAN ANDA</h2>
          <p className="mb-3">Dengan menggunakan Platform, Anda menyatakan bahwa Anda telah membaca dan memahami Kebijakan Privasi ini serta ketentuan penggunaan, dan Anda setuju serta memberikan persetujuan untuk penggunaan, praktik, pemrosesan, dan pengalihan data pribadi Anda oleh kami sebagaimana dijelaskan dalam Kebijakan Privasi ini. Anda juga menyatakan bahwa Anda memiliki hak untuk membagikan semua informasi yang Anda berikan kepada kami dan memberikan kami izin untuk menggunakan serta membagikan informasi tersebut dengan Penyedia Layanan. Anda memahami bahwa Informasi Pribadi Anda dapat dialihkan, disimpan, digunakan, dan diproses di yurisdiksi di luar Indonesia tempat server kami berada, dan Anda memberikan persetujuan atas pengalihan tersebut.</p>
          <p className="mb-5">Anda setuju dan memberikan izin kepada kami untuk mengalihkan Informasi Pribadi Anda kepada Penyedia Layanan sebagai bagian dari penyediaan Layanan. Meskipun Penyedia Layanan hanya memiliki akses ke Informasi Pribadi Anda untuk melaksanakan tugas mereka atas nama kami dan secara kontraktual terikat untuk tidak mengungkap atau menggunakannya untuk tujuan lain, Anda memahami bahwa ada kemungkinan Penyedia Layanan dapat menyimpan data Anda dalam perangkat mereka dengan cara apa pun. Kami tidak bertanggung jawab atas jenis penyimpanan data ini, dan Anda setuju untuk melindungi, mengganti rugi, dan membebaskan kami dari tanggung jawab atas penggunaan tidak sah Informasi Pribadi Anda oleh Penyedia Layanan setelah penyelesaian penyediaan Layanan.</p>

          {/* 8. HAK ANDA */}
          <h2 className="font-bold uppercase mb-1">8. HAK ANDA</h2>
          <p className="mb-2">Anda dapat mengakses dan memperbarui sebagian informasi Anda melalui pengaturan akun. Jika Anda telah menghubungkan akun Anda ke aplikasi pihak ketiga seperti Facebook atau Google, Anda dapat mengubah pengaturan dan mencabut izin aplikasi tersebut melalui pengaturan akun Anda. Anda bertanggung jawab untuk selalu memperbarui informasi pribadi Anda. Anda berhak meminta kami untuk mengoreksi informasi pribadi yang tidak akurat atau tidak lengkap tentang Anda, jika Anda tidak dapat memperbaruinya sendiri di Platform.</p>
          <p className="mb-2">Kami umumnya menyimpan informasi pribadi Anda selama diperlukan untuk menjalankan perjanjian antara Anda dan kami serta untuk memenuhi kewajiban hukum kami. Jika Anda tidak lagi ingin kami menggunakan informasi Anda untuk menyediakan Platform, Anda dapat meminta kami untuk menghapus informasi pribadi Anda dan menutup akun Anda. Harap diperhatikan bahwa jika Anda meminta penghapusan informasi pribadi Anda:</p>
          <ol className="list-decimal pl-10 space-y-1 mb-3">
            <li>Kami dapat menyimpan beberapa informasi pribadi Anda yang diperlukan untuk kepentingan bisnis kami yang sah, seperti mendeteksi dan mencegah penipuan serta meningkatkan keamanan. Misalnya, jika kami menangguhkan akun karena penipuan atau alasan keamanan, kami dapat menyimpan informasi tertentu dari akun tersebut untuk mencegah pembukaan akun baru di Platform di masa depan.</li>
            <li>Kami dapat menyimpan dan menggunakan informasi pribadi Anda sejauh yang diperlukan untuk memenuhi kewajiban hukum kami. Misalnya, kami mungkin menyimpan beberapa informasi Anda untuk keperluan pajak, pelaporan hukum, dan kewajiban lainnya.</li>
            <li>Karena kami memelihara Platform untuk melindungi dari kehilangan dan kerusakan yang tidak disengaja atau berbahaya, salinan informasi pribadi Anda mungkin tidak dapat dihapus dari sistem cadangan kami untuk jangka waktu tertentu.</li>
          </ol>

          {/* 9. BATASAN TANGGUNG JAWAB */}
          <h2 className="font-bold uppercase mb-1">9. BATASAN TANGGUNG JAWAB</h2>
          <p className="mb-3">Anda bertanggung jawab untuk menjaga dan mencegah akses tidak sah ke informasi pengguna dan kata sandi yang Anda gunakan untuk mengakses Platform. Anda setuju untuk tidak mengungkapkan kata sandi Anda kepada pihak ketiga mana pun dan bertanggung jawab atas semua aktivitas yang terjadi di akun Anda, baik Anda mengizinkannya atau tidak. Anda harus segera memberi tahu kami tentang penggunaan akun Anda yang tidak sah. Kami berusaha mengamankan Informasi Pribadi Anda dari akses, penggunaan, atau pengungkapan yang tidak sah dengan menerapkan prosedur fisik, elektronik, dan manajerial untuk melindungi informasi yang kami kumpulkan melalui Platform.</p>
          <p className="mb-3">Kami tidak menjamin keamanan basis data kami dan tidak dapat menjamin bahwa informasi yang Anda berikan tidak akan disadap saat dikirimkan kepada kami. Setiap transmisi informasi kepada kami adalah risiko Anda sendiri. Seberapa pun efektifnya suatu teknologi, tidak ada sistem keamanan yang sepenuhnya tidak dapat ditembus atau bebas dari bug, virus, akses ilegal, atau tidak sah.</p>
          <p className="mb-5">Anda mengakui dan memahami bahwa kami tidak bertanggung jawab atas kerugian tidak langsung, insidental, khusus, bersifat menghukum, atau kerugian akibat kehilangan keuntungan, pendapatan, data, atau penggunaan data. Tanggung jawab maksimum kami atas kerugian yang timbul dari atau terkait dengan Platform atau Layanan terbatas pada jumlah biaya yang Anda bayarkan kepada kami. Anda setuju untuk membebaskan kami dari klaim, permintaan, gugatan, dan kewajiban lainnya terkait kondisi tersebut.</p>

          {/* 10. HUKUM DAN BAHASA YANG BERLAKU */}
          <h2 className="font-bold uppercase mb-1">10. HUKUM DAN BAHASA YANG BERLAKU</h2>
          <p className="mb-3">Syarat dan Ketentuan ini serta semua persyaratan khusus dan tambahan lainnya yang mengatur penggunaan atau akses Anda ke Situs Web akan diatur dan ditafsirkan sesuai dengan hukum Republik Indonesia.</p>
          <p className="mb-5">Setiap perselisihan, baik kontraktual maupun non-kontraktual, yang timbul dari atau terkait dengan Syarat dan Ketentuan ini (termasuk pertanyaan mengenai keberadaan, keabsahan, atau penghentiannya) akan diselesaikan bersama melalui musyawarah dalam waktu 30 hari sejak pemberitahuan perselisihan tersebut.</p>

          {/* 11. MEMILIKI PERTANYAAN */}
          <h2 className="font-bold uppercase mb-1">11. MEMILIKI PERTANYAAN</h2>
          <p className="mb-10">Jika Anda memiliki pertanyaan apa pun tentang privasi dan keamanan informasi Anda, harap menghubungi kami <a href="mailto:sekretariat@gbitamanmahkota.org" className="text-[#007bff] hover:underline">sekretariat@gbitamanmahkota</a>.</p>

          {/* FOOTER COPYRIGHT BERGAYA RAW HTML */}
        <div className="pt-4 mt-8 border-t border-[#dee2e6] text-[13px] text-[#6c757d]">Copyright © 2025-2026 GBI Taman Mahkota. All rights reserved.</div>

        </div>
      </div>
    </div>
  );
}