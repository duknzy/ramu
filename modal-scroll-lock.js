// ==========================================================================
// 🔒 MODAL SCROLL LOCK（スマホ専用）
// .modal-overlay / id・classに"modal"や"lightbox"を含む全画面オーバーレイが
// 表示されている間、背面ページのスクロール（iOSのラバーバンド含む）を止める。
// 個々のモーダルの開閉処理を1つずつ書き換えなくても済むよう、
// MutationObserverでstyle/classの変化を監視して自動判定する。
// ==========================================================================
(function() {
    var OVERLAY_SELECTOR = '.modal-overlay, [id*="modal" i], [id*="lightbox" i], [class*="lightbox" i]';

    function isOpenOverlay(el) {
        var cs = window.getComputedStyle(el);
        if (cs.position !== 'fixed') return false;
        if (cs.display === 'none') return false;
        if (cs.visibility === 'hidden') return false;
        if (parseFloat(cs.opacity) === 0) return false;
        return true;
    }

    function refreshLock() {
        var overlays = document.querySelectorAll(OVERLAY_SELECTOR);
        var anyOpen = false;
        for (var i = 0; i < overlays.length; i++) {
            if (isOpenOverlay(overlays[i])) { anyOpen = true; break; }
        }
        document.body.classList.toggle('modal-scroll-locked', anyOpen);
    }

    var observer = new MutationObserver(function(mutations) {
        // style / class の変化だけを見れば十分（頻繁なDOM全体走査を避ける）
        refreshLock();
    });

    function start() {
        refreshLock();
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['style', 'class'],
            subtree: true
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', start);
    } else {
        start();
    }
})();
