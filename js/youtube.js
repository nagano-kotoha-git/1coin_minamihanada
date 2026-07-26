"use strict";

/* =========================
   YouTube 最新3件を自動表示
========================= */

document.addEventListener("DOMContentLoaded", function () {
    const API_KEY = "AIzaSyCOahXHtAirDUrhM_XPA6DWgL8Ae0V963w";
    const CHANNEL_ID = "UCjgjQphmgM_7iAW1zNeVuFg";
    const MAX_RESULTS = 3;

    const youtubeList = document.querySelector(".js-youtube-list");

    if (!youtubeList) return;

    /**
     * エラーメッセージを表示
     */
    function showError(message) {
        youtubeList.innerHTML = "";

        const errorItem = document.createElement("li");
        errorItem.className = "channel__error";
        errorItem.textContent = message;

        youtubeList.appendChild(errorItem);
    }

    /**
     * チャンネルのアップロード用プレイリストIDを取得
     */
    async function getUploadsPlaylistId() {
        const params = new URLSearchParams({
            part: "contentDetails",
            id: CHANNEL_ID,
            key: API_KEY
        });

        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/channels?${params.toString()}`
        );

        if (!response.ok) {
            throw new Error(`チャンネル情報の取得に失敗しました: ${response.status}`);
        }

        const data = await response.json();

        if (!data.items || data.items.length === 0) {
            throw new Error("YouTubeチャンネルが見つかりませんでした。");
        }

        return data.items[0].contentDetails.relatedPlaylists.uploads;
    }

    /**
     * アップロード用プレイリストから最新動画を取得
     */
    async function getLatestVideos(playlistId) {
        const params = new URLSearchParams({
            part: "snippet,contentDetails",
            playlistId: playlistId,
            maxResults: String(MAX_RESULTS),
            key: API_KEY
        });

        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/playlistItems?${params.toString()}`
        );

        if (!response.ok) {
            throw new Error(`動画情報の取得に失敗しました: ${response.status}`);
        }

        const data = await response.json();

        return data.items || [];
    }

    /**
     * 動画をHTMLへ表示
     */
    function renderVideos(videos) {
        youtubeList.innerHTML = "";

        if (videos.length === 0) {
            showError("現在表示できる動画がありません。");
            return;
        }

        videos.forEach(function (video, index) {
            const videoId = video.contentDetails.videoId;
            const videoTitle = video.snippet.title;

            const listItem = document.createElement("li");
            listItem.className = "channel__video js-stagger-item";

            const videoInner = document.createElement("div");
            videoInner.className = "channel__video-inner";

            const iframe = document.createElement("iframe");
            iframe.src = `https://www.youtube.com/embed/${encodeURIComponent(videoId)}`;
            iframe.title = videoTitle;
            iframe.loading = "lazy";
            iframe.allow =
                "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
            iframe.referrerPolicy = "strict-origin-when-cross-origin";
            iframe.allowFullscreen = true;

            videoInner.appendChild(iframe);
            listItem.appendChild(videoInner);
            youtubeList.appendChild(listItem);

            // 動的追加した動画を順番にフェードアップ
            window.setTimeout(function () {
                listItem.classList.add("is-show");
            }, index * 150);
        });
    }

    /**
     * 初期処理
     */
    async function initYoutubeVideos() {
        try {
            const uploadsPlaylistId = await getUploadsPlaylistId();
            const videos = await getLatestVideos(uploadsPlaylistId);

            renderVideos(videos);
        } catch (error) {
            console.error("YouTube APIエラー:", error);
            showError("最新動画を読み込めませんでした。");
        }
    }

    initYoutubeVideos();
});