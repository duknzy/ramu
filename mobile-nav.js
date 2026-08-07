// ==========================================================================
// 📱 MOBILE NAV DRAWER CONTROLLER
// PC版の横並びヘッダーnavを廃止し、ハンバーガー+スライドドロワーに統一する。
// ==========================================================================
(function() {
    function initMobileNav() {
        const nav = document.querySelector('.global-cyber-nav');
        if (!nav) return;

        const toggleBtn = nav.querySelector('.nav-hamburger-btn');
        const links = nav.querySelector('.nav-links');
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
