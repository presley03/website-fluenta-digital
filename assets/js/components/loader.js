// File: assets/js/components/loader.js

document.addEventListener('DOMContentLoaded', function () {
    // Tunggu sampai semua konten dimuat
    window.addEventListener('load', function () {
        // Tunggu beberapa saat untuk efek loading
        setTimeout(function () {
            // Tambahkan class loaded ke content untuk memunculkan konten
            document.querySelector('.content').classList.add('loaded');

            // Fade out loader
            document.querySelector('.loader-container').style.opacity = '0';

            // Hapus loader setelah animasi fade out selesai
            setTimeout(function () {
                document.querySelector('.loader-container').style.display = 'none';
            }, 500);
        }, 4000); // Waktu loading 4 detik
    });
});