// ==========================================================================
// 📱 MOBILE NAV DRAWER CONTROLLER
// 上部の固定バーは廃止し、画面右上に浮くハンバーガーボタン単体から
// スライドドロワーを開閉する。
// ==========================================================================
(function() {
    function initMobileNav() {
        const toggleBtn = document.querySelector('.nav-hamburger-btn');
        const links = document.querySelector('.nav-links');
        const overlay = document.querySelector('.nav-drawer-overlay');
        if (!toggleBtn || !links || !overlay) return;

        function openDrawer() {
            links.classList.add('is-open');
            overlay.classList.add('is-open');
            toggleBtn.classList.add('is-open');
            toggleBtn.setAttribute('aria-expanded', 'true');
            document.body.classList.add('nav-drawer-locked');
        }

        function closeDrawer() {
            links.classList.remove('is-open');
            overlay.classList.remove('is-open');
            toggleBtn.classList.remove('is-open');
            toggleBtn.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('nav-drawer-locked');
        }

        toggleBtn.addEventListener('click', function() {
            if (links.classList.contains('is-open')) {
                closeDrawer();
            } else {
                openDrawer();
            }
        });

        overlay.addEventListener('click', closeDrawer);

        // ドロワー内のリンクをタップしたら自動で閉じる
        links.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', closeDrawer);
        });
    }

    document.addEventListener('DOMContentLoaded', initMobileNav);
})();
