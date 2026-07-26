$(function () {
    var $win = $(window);

    /* =========================
       共通ユーティリティ
    ========================= */
    var TRIGGER_MOVIE = -160;
    var TRIGGER = -60;

    function inView($el, offset) {
        if (!$el || !$el.length) return false;

        offset = (typeof offset === "number") ? offset : TRIGGER;

        var scrollTop = $win.scrollTop();
        var winH = $win.height();

        return scrollTop + winH > $el.offset().top + offset;
    }

    function staggerShow($els, baseDelay, step) {
        baseDelay = baseDelay || 0;
        step = step || 120;

        $els.each(function (i) {
            var $el = $(this);
            setTimeout(function () {
                $el.addClass("is-show");
            }, baseDelay + i * step);
        });
    }

    /* =========================
       ABOUT
    ========================= */
    var $aboutTitle = $(".about .js-reveal-title");
    var $aboutMovie = $(".about .js-reveal-card");

    function revealAbout() {
        $aboutTitle.each(function () {
            var $el = $(this);
            if (inView($el, TRIGGER)) {
                $el.addClass("is-show");
            }
        });

        $aboutMovie.each(function () {
            var $el = $(this);
            if (inView($el, TRIGGER_MOVIE)) {
                $el.addClass("is-show");
            }
        });
    }

    /* =========================
       CREWFIRST
    ========================= */
    var $cfMovie = $(".crewfirst .js-fadeup").first();
    var $cfTitle = $(".crewfirst__vertical.js-slidein-right");
    var $cfIllust = $(".crewfirst .js-slidein-left-illust");
    var $cfBubble = $(".crewfirst .js-pop");
    var $cfItems = $(".crewfirst .js-stagger-item");
    var $cfBtn = $(".crewfirst .js-btn");

    var crewfirstIllustShown = false;

    function revealCrewfirst() {
        if (inView($cfMovie, TRIGGER_MOVIE)) {
            $cfMovie.addClass("is-show");
        }

        $cfTitle.each(function () {
            var $el = $(this);

            if (inView($el, TRIGGER) && !$el.hasClass("is-show")) {
                setTimeout(function () {
                    $el.addClass("is-show");
                }, 200);

                if (!crewfirstIllustShown && $cfIllust.length) {
                    crewfirstIllustShown = true;
                    setTimeout(function () {
                        $cfIllust.addClass("is-show");
                    }, 420);
                }
            }
        });

        $cfBubble.each(function () {
            var $el = $(this);
            if (inView($el, TRIGGER) && !$el.hasClass("is-show")) {
                setTimeout(function () {
                    $el.addClass("is-show");
                }, 60);
            }
        });

        $cfItems.each(function (i) {
            var $el = $(this);
            if (inView($el, TRIGGER) && !$el.hasClass("is-show")) {
                setTimeout(function () {
                    $el.addClass("is-show");
                }, i * 120);
            }
        });

        $cfBtn.each(function () {
            var $el = $(this);
            if (inView($el, TRIGGER)) {
                $el.addClass("is-show");
            }
        });
    }

    /* =========================
       STRENGTH（1回点火）
    ========================= */
    var $stMovie = $(".strength .yt-block.js-fadeup").first();
    var $stTitle = $(".strength .js-slidein-left");
    var $stPhoto1 = $(".strength .js-fadeup-photo1");
    var $stPhoto2 = $(".strength .js-fadeup-photo2");
    var $stBubble = $(".strength .js-pop");
    var $stItems = $(".strength .js-stagger-item");
    var $stBtn = $(".strength .js-btn");

    var strengthFired = false;

    function revealStrength() {
        if (strengthFired || !$stTitle.length) return;
        if (!inView($stTitle, TRIGGER)) return;

        strengthFired = true;

        if ($stMovie.length && inView($stMovie, TRIGGER_MOVIE)) {
            $stMovie.addClass("is-show");
        } else if ($stMovie.length) {
            $stMovie.addClass("is-show");
        }

        $stTitle.addClass("is-show");

        setTimeout(function () { $stPhoto1.addClass("is-show"); }, 220);
        setTimeout(function () { $stPhoto2.addClass("is-show"); }, 420);
        setTimeout(function () { $stBubble.addClass("is-show"); }, 650);

        staggerShow($stItems, 780, 120);

        setTimeout(function () {
            $stBtn.addClass("is-show");
        }, 780 + $stItems.length * 120 + 120);
    }

    /* =========================
       WORKSTYLE（1回点火）
    ========================= */
    var $wsMovie = $(".workstyle .js-workstyle-movie");
    var $wsTitle = $(".workstyle .js-slidein-right");
    var $wsBg = $(".workstyle__bg.js-fadeup");
    var $wsBubble = $(".workstyle .js-pop");
    var $wsItems = $(".workstyle .js-stagger-item");
    var $wsBtn = $(".workstyle .js-btn");

    var workstyleFired = false;

    function revealWorkstyle() {
        if (workstyleFired || !$wsTitle.length) return;
        if (!inView($wsTitle, TRIGGER)) return;

        workstyleFired = true;

        if ($wsMovie.length && inView($wsMovie, TRIGGER_MOVIE)) {
            $wsMovie.addClass("is-show");
        } else if ($wsMovie.length) {
            $wsMovie.addClass("is-show");
        }

        setTimeout(function () { $wsTitle.addClass("is-show"); }, 200);
        setTimeout(function () { $wsBg.addClass("is-show"); }, 420);
        setTimeout(function () { $wsBubble.addClass("is-show"); }, 650);

        staggerShow($wsItems, 780, 120);

        setTimeout(function () {
            $wsBtn.addClass("is-show");
        }, 780 + $wsItems.length * 120 + 120);
    }

    /* =========================
       MEDIA（1回点火）
    ========================= */
    var $mdMovie = $(".media .js-fadeup").first();
    var $mdTitle = $(".media .js-slidein-right");
    var $mdIllust = $(".media .js-slidein-left-illust");
    var $mdBubble = $(".media .js-pop");
    var $mdItems = $(".media .js-stagger-item");
    var $mdBtn = $(".media .js-btn");

    var mediaFired = false;

    function revealMedia() {
        if (mediaFired || !$mdTitle.length) return;
        if (!inView($mdTitle, TRIGGER)) return;

        mediaFired = true;

        if ($mdMovie.length && inView($mdMovie, TRIGGER_MOVIE)) {
            $mdMovie.addClass("is-show");
        } else if ($mdMovie.length) {
            $mdMovie.addClass("is-show");
        }

        setTimeout(function () { $mdTitle.addClass("is-show"); }, 200);
        setTimeout(function () { $mdIllust.addClass("is-show"); }, 420);
        setTimeout(function () { $mdBubble.addClass("is-show"); }, 650);

        staggerShow($mdItems, 780, 120);

        setTimeout(function () {
            $mdBtn.addClass("is-show");
        }, 780 + $mdItems.length * 120 + 120);
    }

    /* =========================
       CHANNEL（1回点火）
    ========================= */
    var $chRoot = $(".channel");
    var $chTitle = $(".channel__title.js-fadeup");
    var $chVideos = $(".channel__video.js-stagger-item");
    var $chBtn = $(".channel__btn-wrap.js-btn");

    var channelFired = false;

    function revealChannel() {
        if (channelFired || !$chRoot.length) return;
        if (!inView($chRoot, TRIGGER)) return;

        channelFired = true;

        setTimeout(function () {
            if ($chTitle.length) $chTitle.addClass("is-show");
        }, 180);

        setTimeout(function () {
            staggerShow($chVideos, 0, 140);
        }, 380);

        setTimeout(function () {
            if ($chBtn.length) $chBtn.addClass("is-show");
        }, 380 + $chVideos.length * 140 + 180);
    }

    /* =========================
       CLOSE（1回点火）
    ========================= */
    var $clRoot = $(".close");
    var $clTitle = $(".close .close__title");
    var $clPhotos = $(".close .close__photo");
    var $clBubble = $(".close .js-pop");
    var $clItems = $(".close .js-stagger-item");
    var $clMovie = $(".close .close__movie");
    var closeFired = false;

    function revealClose() {
        if (closeFired || !$clRoot.length) return;
        if (!inView($clRoot, TRIGGER)) return;
        closeFired = true;
        // タイトル
        $clTitle.addClass("is-show");
        // 画像を順番に表示
        $clPhotos.each(function (i) {
            var $photo = $(this);
            setTimeout(function () {
                $photo.addClass("is-show");
            }, 180 + i * 180);
        });
        // 吹き出し
        setTimeout(function () {
            $clBubble.addClass("is-show");
        }, 600);
        // リストを順番に表示
        $clItems.each(function (i) {
            var $item = $(this);
            setTimeout(function () {
                $item.addClass("is-show");
            }, 760 + i * 120);
        });
        // 動画
        setTimeout(function () {
            $clMovie.addClass("is-show");
        }, 760 + $clItems.length * 120 + 220);
    }

    /* =========================
       COMPANY（1回点火）
    ========================= */
    var $coRoot = $(".company");
    var $coTitle = $(".company .company__title");

    var companyFired = false;

    function revealCompany() {
        if (companyFired || !$coRoot.length) return;
        if (!inView($coRoot, TRIGGER)) return;

        companyFired = true;

        $coTitle.addClass("is-show");
    }

    /* =========================
       RECRUIT（1回点火）
    ========================= */
    var $rcRoot = $(".recruit.js-cta");
    var $rcTitle = $(".recruit__title");

    var recruitFired = false;

    function revealRecruit() {
        if (recruitFired || !$rcRoot.length) return;
        if (!inView($rcRoot, TRIGGER)) return;

        recruitFired = true;

        $rcRoot.addClass("is-show");

        if ($rcTitle.length) {
            $rcTitle.addClass("is-show");
        }
    }

    /* =========================
       初期実行 & scroll
    ========================= */
    function onScroll() {
        revealAbout();
        revealCrewfirst();
        revealStrength();
        revealWorkstyle();
        revealMedia();
        revealChannel();
        revealClose();
        revealCompany();
        revealRecruit();
    }

    onScroll();
    $win.on("scroll", onScroll);
});