// reveal（VOICE + CTAまとめて）
$(function () {
    const $win = $(window);

    // VOICE
    const $title = $(".js-reveal-title");
    const $card = $(".js-reveal-card");
    const $qa = $(".js-stagger .voice_qa_item");

    // CTA（セクション本体に .js-cta を付けてね）
    const $cta = $(".js-cta");

    // CTAの必要クラス/構造を保険で整える（付いててもOK）
    const prepareCta = () => {
        $cta.each(function () {
            const $root = $(this);

            // kicker/text/note に jsクラスが無ければ付与
            const $kicker = $root.find(".cta_kicker");
            if ($kicker.length && !$kicker.hasClass("js-cta-kicker")) {
                $kicker.addClass("js-cta-kicker");
            }

            const $text = $root.find(".cta_text");
            if ($text.length && !$text.hasClass("js-cta-text")) {
                $text.addClass("js-cta-text");
            }

            const $note = $root.find(".cta_note");
            if ($note.length && !$note.hasClass("js-cta-note")) {
                $note.addClass("js-cta-note");
            }

            // bar：js-cta-bar付与 + spanが無ければ包む
            const $bar = $root.find(".cta_bar");
            if ($bar.length && !$bar.hasClass("js-cta-bar")) {
                $bar.addClass("js-cta-bar");
            }

            $bar.each(function () {
                const $b = $(this);
                if ($b.find("span").length === 0) {
                    $b.wrapInner("<span></span>");
                }
            });

            // btn：js-cta-btn を保険で付与
            const $btn = $root.find(".cta_btn-wrap");
            if ($btn.length && !$btn.hasClass("js-cta-btn")) {
                $btn.addClass("js-cta-btn");
            }
        });
    };

    prepareCta();

    const reveal = () => {
        const scrollTop = $win.scrollTop();
        const winH = $win.height();

        // --- VOICE title ---
        $title.each(function () {
            const top = $(this).offset().top;
            if (scrollTop + winH > top + 80) $(this).addClass("is-show");
        });

        // --- VOICE card（少し遅らせる）---
        $card.each(function () {
            const top = $(this).offset().top;
            if (scrollTop + winH > top + 80) {
                const $el = $(this);
                if (!$el.hasClass("is-show")) {
                    setTimeout(() => $el.addClass("is-show"), 300);
                }
            }
        });

        // --- VOICE QA（順番）---
        $qa.each(function (i) {
            const top = $(this).offset().top;
            if (scrollTop + winH > top + 80) {
                const $el = $(this);
                if (!$el.hasClass("is-show")) {
                    setTimeout(() => $el.addClass("is-show"), i * 120);
                }
            }
        });

        // --- CTA（入ってきたら is-show：1回だけ）---
        $cta.each(function () {
            const $el = $(this);
            const top = $el.offset().top;

            if (scrollTop + winH > top + 80 && !$el.hasClass("is-show")) {
                $el.addClass("is-show");
            }
        });
    };

    // --- SPだけ開始を遅らせる ---
    const isSp = window.matchMedia("(max-width: 767px)").matches;

    const startReveal = () => {
        reveal();
        $win.on("scroll", reveal);
    };

    if (isSp) {
        const heroTitle = document.querySelector(".hero h1");
        if (heroTitle) {
            heroTitle.addEventListener("animationend", startReveal, { once: true });
            setTimeout(startReveal, 1500);
        } else {
            setTimeout(startReveal, 1500);
        }
    } else {
        startReveal();
    }
});