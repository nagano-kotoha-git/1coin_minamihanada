// ===== ヘッダー高さをCSS変数へ（fixedヘッダー分だけ上余白を確保） =====
(function () {
    const setHeaderHeight = () => {
        const header = document.querySelector("header");
        if (!header) return;
        document.documentElement.style.setProperty("--header-h", `${header.offsetHeight}px`);
    };

    // できるだけ早く反映（ガクッ防止）
    document.addEventListener("DOMContentLoaded", setHeaderHeight);

    // レイアウト確定後にも反映（フォント/画像で高さ変わる保険）
    requestAnimationFrame(setHeaderHeight);
    setTimeout(setHeaderHeight, 0);
    window.addEventListener("load", setHeaderHeight);

    window.addEventListener("resize", setHeaderHeight);
    window.addEventListener("orientationchange", setHeaderHeight);

    // Webフォントで高さが変わるケースの保険
    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(setHeaderHeight);
    }
})();


// 住所コピー
$(".js-copy-address").on("click", function () {
    const address = "〒591-8011大阪府堺市北区南花田町209-1";
    navigator.clipboard.writeText(address);
    const $this = $(this);
    $this.addClass("is-copied");
    setTimeout(function () {
        $this.removeClass("is-copied");
    }, 2000);
});

// ハンバガーメニュー
$(".openbtn").click(function () {
    $(this).toggleClass("active");
    $("#g-nav").toggleClass("panelactive");
});

$("#g-nav a").click(function () {
    $(".openbtn").removeClass("active");
    $("#g-nav").removeClass("panelactive");
});


// =========================
// 配車案内：タブを閉じるまで非表示
// =========================
var $notice = $(".dispatch-notice");
var $noticeClose = $(".dispatch-notice__close");

if ($notice.length) {
    if (sessionStorage.getItem("dispatchNoticeClosed") === "true") {
        $notice.hide();
    }

    $noticeClose.on("click", function () {
        $notice.hide();
        sessionStorage.setItem("dispatchNoticeClosed", "true");
    });
}



// Google analytics関連

// Googleアナリティクスのイベントトラッキング
// お忘れ物LINEクリックイベント
$(".js-lost-item-line").on("click", function () {
    gtag('event', 'lost_item_line_click', {
        event_category: 'contact',
        event_label: 'お忘れ物LINE'
    });
});

// お問い合わせボタンクリックイベント
$(".js-contact-btn").on("click", function () {
    gtag('event', 'contact_click', {
        event_category: 'contact',
        event_label: 'お問い合わせボタン'
    });
});