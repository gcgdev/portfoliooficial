(function () {
    var currentScript = document.currentScript;
    var gtagId = currentScript && currentScript.dataset ? currentScript.dataset.gtagId : "";
    var fbPixelId = currentScript && currentScript.dataset ? currentScript.dataset.fbPixelId : "";
    var loaded = false;
    var events = ["pointerdown", "keydown", "touchstart", "scroll"];

    function loadScript(src) {
        var script = document.createElement("script");
        script.async = true;
        script.src = src;
        document.head.appendChild(script);
    }

    function loadGtag() {
        if (!gtagId) {
            return;
        }

        window.dataLayer = window.dataLayer || [];
        window.gtag = window.gtag || function () {
            window.dataLayer.push(arguments);
        };

        window.gtag("js", new Date());
        window.gtag("config", gtagId, { transport_type: "beacon" });
        loadScript("https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(gtagId));
    }

    function loadFacebookPixel() {
        var f = window;
        var d = document;
        var s;
        var firstScript;

        if (!fbPixelId || f.fbq) {
            return;
        }

        s = d.createElement("script");
        s.async = true;
        s.src = "https://connect.facebook.net/en_US/fbevents.js";
        firstScript = d.getElementsByTagName("script")[0];
        firstScript.parentNode.insertBefore(s, firstScript);

        f.fbq = function () {
            if (f.fbq.callMethod) {
                f.fbq.callMethod.apply(f.fbq, arguments);
                return;
            }

            f.fbq.queue.push(arguments);
        };

        if (!f._fbq) {
            f._fbq = f.fbq;
        }

        f.fbq.push = f.fbq;
        f.fbq.loaded = true;
        f.fbq.version = "2.0";
        f.fbq.queue = [];
        f.fbq("init", fbPixelId);
        f.fbq("track", "PageView");
    }

    function initAnalytics() {
        if (loaded) {
            return;
        }

        loaded = true;
        removeListeners();
        loadGtag();
        loadFacebookPixel();
    }

    function addListeners() {
        events.forEach(function (eventName) {
            window.addEventListener(eventName, initAnalytics, { once: true, passive: true });
        });
    }

    function removeListeners() {
        events.forEach(function (eventName) {
            window.removeEventListener(eventName, initAnalytics);
        });
    }

    addListeners();
}());
