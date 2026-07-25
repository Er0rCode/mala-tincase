document.addEventListener('DOMContentLoaded', () => {
  // Fade-in halus saat setiap halaman dibuka
  const section = document.querySelector('.page-section');
  if (section) {
    requestAnimationFrame(() => section.classList.add('loaded'));
  }

  // ==========================================================================
  // Marquee "EVERYTHING" banner (page3): gandakan teks sampai benar-benar
  // menutupi lebar layar, biar animasinya nyambung terus tanpa celah kosong,
  // di layar sekecil atau selebar apapun.
  // ==========================================================================
  const banner = document.getElementById('marqueeBanner');
  const track = document.getElementById('marqueeTrack');
  const group = document.getElementById('marqueeGroup');

  if (banner && track && group) {
    const unitTemplate = group.querySelector('.marquee-unit');

    function buildMarquee() {
      // Reset ke satu unit awal
      group.innerHTML = '';
      group.appendChild(unitTemplate.cloneNode(true));

      const bannerWidth = banner.offsetWidth;

      // Tambah unit sampai satu grup selebar (atau lebih lebar dari) banner
      let safety = 0;
      while (group.offsetWidth < bannerWidth && safety < 200) {
        group.appendChild(unitTemplate.cloneNode(true));
        safety++;
      }

      // Hapus grup kedua kalau sebelumnya ada, lalu gandakan grup persis sama
      const existingSecondGroup = track.querySelector('#marqueeGroupClone');
      if (existingSecondGroup) existingSecondGroup.remove();

      const groupClone = group.cloneNode(true);
      groupClone.id = 'marqueeGroupClone';
      track.appendChild(groupClone);
    }

    buildMarquee();

    // Bangun ulang kalau ukuran layar berubah (resize / rotate)
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(buildMarquee, 200);
    });
  }
});