// ==========================================================================
// ⏱️ GLOBAL CYBER TIMER SYNC (スマホ専用版)
// PC版にあった window.open() による「小窓ポップアウト」は
// スマホブラウザ／PWAでは正しく機能しないため廃止し、
// ヘッダーのタイマーHUD表示のみを担当する。
// ==========================================================================
(function() {
    function updateGlobalTimerHUD() {
        const timerBadges = document.querySelectorAll('.global-timer-link');
        if (!timerBadges || timerBadges.length === 0) return;

        try {
            const rawData = localStorage.getItem('cyber_timer_state');
            if (!rawData) {
                timerBadges.forEach(badge => {
                    badge.innerHTML = '⏱️ 集中タイマー';
                    badge.classList.remove('active-timer');
                });
                return;
            }

            const state = JSON.parse(rawData);
            if (!state || !state.isRunning || !state.endTime) {
                timerBadges.forEach(badge => {
                    badge.innerHTML = '⏱️ 集中タイマー';
                    badge.classList.remove('active-timer');
                });
                return;
            }

            const now = Date.now();
            const remainingSec = Math.max(0, Math.floor((state.endTime - now) / 1000));

            if (remainingSec <= 0) {
                timerBadges.forEach(badge => {
                    badge.innerHTML = '⏱️ FINISH!';
                    badge.classList.add('active-timer');
                });
                return;
            }

            const m = String(Math.floor(remainingSec / 60)).padStart(2, '0');
            const s = String(remainingSec % 60).padStart(2, '0');
            timerBadges.forEach(badge => {
                badge.innerHTML = `⏱️ ${m}:${s}`;
                badge.classList.add('active-timer');
            });
        } catch(e) {
            console.error('Timer sync error:', e);
        }
    }

    // 1秒ごとにヘッダー表示を更新
    setInterval(updateGlobalTimerHUD, 1000);
    document.addEventListener('DOMContentLoaded', updateGlobalTimerHUD);
})();
