(function () {
    var reduceMotionQuery = window.matchMedia
        ? window.matchMedia("(prefers-reduced-motion: reduce)")
        : null;

    var WHATSAPP_NUMBER = "5512997321701";
    var WHATSAPP_TEMPLATES = {
        pt: {
            diagnostic: "Oi! Quero um diagnostico rapido do meu site e ideias para aumentar a conversao.",
            demo: "Oi! Vi seu demo e quero algo parecido para o meu negocio. Meu nicho e: ____",
            quote: "Oi! Quero uma cotacao. Objetivo: ____. Prazo: ____. Orcamento faixa: ____.",
            automation: "Oi! Quero automatizar um processo / scraper / integracao. Contexto: ____."
        },
        en: {
            diagnostic: "Hi! I want a quick review of my website and ideas to increase conversion.",
            demo: "Hi! I saw your demo and I want something similar for my business. My niche is: ____",
            quote: "Hi! I'd like a quote. Goal: ____. Timeline: ____. Budget range: ____.",
            automation: "Hi! I want to automate a process / scraper / integration. Context: ____."
        }
    };

    var App = {
        qs: function (selector, scope) {
            return (scope || document).querySelector(selector);
        },
        qsa: function (selector, scope) {
            return Array.prototype.slice.call((scope || document).querySelectorAll(selector));
        },
        on: function (target, event, handler, options) {
            if (!target) {
                return;
            }

            target.addEventListener(event, handler, options);
        },
        getPageLanguage: function () {
            return document.documentElement.lang.toLowerCase().indexOf("en") === 0 ? "en" : "pt";
        },
        getWhatsAppMessage: function (context, options) {
            var meta = options || {};
            var lang = meta.lang || App.getPageLanguage();
            var templates = WHATSAPP_TEMPLATES[lang] || WHATSAPP_TEMPLATES.pt;

            if (context === "demo" && meta.demoTitle) {
                return templates.demo + " Demo: " + meta.demoTitle + ".";
            }

            return templates[context] || String(context || "");
        },
        getWhatsAppUrl: function (context, options) {
            return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" +
                encodeURIComponent(App.getWhatsAppMessage(context, options));
        }
    };

    function prefersReducedMotion() {
        return Boolean(reduceMotionQuery && reduceMotionQuery.matches);
    }

    function initSmoothScroll() {
        document.addEventListener("click", function (event) {
            var link = event.target.closest('a[href^="#"]');
            var id;
            var target;

            if (!link) {
                return;
            }

            id = link.getAttribute("href");
            if (!id || id === "#") {
                return;
            }

            target = App.qs(id);
            if (!target) {
                return;
            }

            event.preventDefault();
            target.scrollIntoView({
                behavior: prefersReducedMotion() ? "auto" : "smooth",
                block: "start"
            });
        });
    }

    function initReveal() {
        var revealItems = App.qsa("[data-reveal]");
        var observer;

        if (!revealItems.length) {
            return;
        }

        if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
            revealItems.forEach(function (item) {
                item.classList.add("is-visible");
            });
            return;
        }

        observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            });
        }, {
            rootMargin: "0px 0px -12% 0px",
            threshold: 0.12
        });

        revealItems.forEach(function (item) {
            observer.observe(item);
        });
    }

    function initAutoYear() {
        App.qsa("[data-year]").forEach(function (node) {
            node.textContent = String(new Date().getFullYear());
        });
    }

    function initWhatsAppLinks() {
        App.qsa("[data-wa-context]").forEach(function (link) {
            var context = link.getAttribute("data-wa-context");
            var demoTitle = link.getAttribute("data-wa-demo");
            var lang = link.getAttribute("data-wa-lang") || App.getPageLanguage();

            link.href = App.getWhatsAppUrl(context, {
                demoTitle: demoTitle || "",
                lang: lang
            });
            link.setAttribute("target", "_blank");
            link.setAttribute("rel", "noreferrer");
        });
    }

    function initHeaderOffset() {
        var header = App.qs(".site-header");
        var lastOffset = null;
        var frameId = 0;

        if (!header) {
            return;
        }

        function applyOffset(height) {
            var nextOffset = Math.ceil(height + 16);

            if (!height || nextOffset === lastOffset) {
                return;
            }

            lastOffset = nextOffset;
            document.documentElement.style.setProperty("--header-offset", nextOffset + "px");
        }

        function readOffset() {
            frameId = 0;
            applyOffset(header.getBoundingClientRect().height);
        }

        function scheduleRead() {
            if (frameId) {
                return;
            }

            frameId = window.requestAnimationFrame(readOffset);
        }

        if ("ResizeObserver" in window) {
            var observer = new ResizeObserver(function (entries) {
                var entry = entries[0];
                if (!entry) {
                    return;
                }

                applyOffset(entry.contentRect.height);
            });

            observer.observe(header);
        } else {
            window.addEventListener("resize", scheduleRead, { passive: true });
        }

        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(scheduleRead);
        }

        window.addEventListener("load", scheduleRead, { once: true });
        scheduleRead();
    }

    function initDemoModal() {
        var modal = App.qs("[data-demo-modal]");
        var dialog;
        var stage;
        var frameShell;
        var frame;
        var loading;
        var title;
        var openNew;
        var whatsapp;
        var toggle;
        var closeButton;
        var backgroundNodes;
        var focusSelector = 'button:not([disabled]), a[href], iframe, [tabindex]:not([tabindex="-1"])';
        var previousFocus = null;
        var activeTrigger = null;

        if (!modal) {
            return;
        }

        dialog = App.qs("[data-demo-dialog]", modal);
        stage = App.qs("[data-demo-stage]", modal);
        frameShell = App.qs("[data-demo-frame-shell]", modal);
        frame = App.qs("[data-demo-iframe]", modal);
        loading = App.qs("[data-demo-loading]", modal);
        title = App.qs("[data-demo-title]", modal) || App.qs("#demo-modal-title", modal);
        openNew = App.qs("[data-demo-open]", modal);
        whatsapp = App.qs("[data-demo-whatsapp]", modal);
        toggle = App.qs("[data-demo-toggle]", modal);
        closeButton = App.qs("[data-demo-close]", modal);
        backgroundNodes = Array.prototype.slice.call(document.body.children).filter(function (node) {
            return node !== modal;
        });

        function setViewMode(isMobile) {
            stage.classList.toggle("is-mobile", isMobile);
            toggle.setAttribute("aria-pressed", String(isMobile));
            toggle.setAttribute("aria-label", isMobile ? "Alternar para desktop" : "Alternar para mobile");
        }

        function getFocusableItems() {
            return App.qsa(focusSelector, dialog).filter(function (element) {
                return !element.hasAttribute("disabled") && element.getAttribute("aria-hidden") !== "true";
            });
        }

        function openModal(trigger) {
            var demoUrl = trigger.dataset.demo;
            var demoHeading = App.qs("h3", trigger);
            var demoTitle = trigger.dataset.demoTitle ||
                (demoHeading && demoHeading.textContent ? demoHeading.textContent.trim() : "") ||
                "Demo";

            if (!demoUrl) {
                return;
            }

            previousFocus = document.activeElement;
            activeTrigger = trigger;
            title.textContent = demoTitle;
            frame.title = "Visualizacao da demo " + demoTitle;
            openNew.href = demoUrl;
            whatsapp.href = App.getWhatsAppUrl("demo", {
                demoTitle: demoTitle,
                lang: App.getPageLanguage()
            });
            setViewMode(false);
            loading.hidden = false;
            frameShell.setAttribute("aria-busy", "true");
            modal.hidden = false;
            modal.setAttribute("aria-hidden", "false");
            document.body.classList.add("modal-open");
            backgroundNodes.forEach(function (node) {
                node.setAttribute("aria-hidden", "true");
            });
            frame.src = demoUrl;

            window.requestAnimationFrame(function () {
                dialog.focus();
            });
        }

        function closeModal() {
            if (modal.hidden) {
                return;
            }

            modal.hidden = true;
            modal.setAttribute("aria-hidden", "true");
            document.body.classList.remove("modal-open");
            backgroundNodes.forEach(function (node) {
                node.removeAttribute("aria-hidden");
            });
            frame.removeAttribute("src");
            frameShell.removeAttribute("aria-busy");
            loading.hidden = true;
            setViewMode(false);

            if (previousFocus instanceof HTMLElement) {
                previousFocus.focus();
            } else if (activeTrigger instanceof HTMLElement) {
                activeTrigger.focus();
            }
        }

        function trapFocus(event) {
            var focusableItems;
            var firstItem;
            var lastItem;

            if (event.key !== "Tab" || modal.hidden) {
                return;
            }

            focusableItems = getFocusableItems();
            if (!focusableItems.length) {
                event.preventDefault();
                dialog.focus();
                return;
            }

            firstItem = focusableItems[0];
            lastItem = focusableItems[focusableItems.length - 1];

            if (event.shiftKey && document.activeElement === firstItem) {
                event.preventDefault();
                lastItem.focus();
            } else if (!event.shiftKey && document.activeElement === lastItem) {
                event.preventDefault();
                firstItem.focus();
            }
        }

        App.on(frame, "load", function () {
            loading.hidden = true;
            frameShell.removeAttribute("aria-busy");
        });

        App.on(toggle, "click", function () {
            setViewMode(!stage.classList.contains("is-mobile"));
        });

        App.on(closeButton, "click", closeModal);

        App.on(modal, "click", function (event) {
            if (event.target instanceof HTMLElement && event.target.hasAttribute("data-demo-backdrop")) {
                closeModal();
            }
        });

        App.on(dialog, "keydown", trapFocus);

        document.addEventListener("click", function (event) {
            var trigger;
            var anchor;

            if (!(event.target instanceof Element)) {
                return;
            }

            trigger = event.target.closest("[data-demo]");
            if (!trigger) {
                return;
            }

            anchor = event.target.closest("a[href]");
            if (anchor) {
                event.preventDefault();
            }

            openModal(trigger);
        });

        document.addEventListener("keydown", function (event) {
            var trigger;

            if (!(event.target instanceof Element)) {
                return;
            }

            trigger = event.target.closest("[data-demo]");
            if (!trigger) {
                return;
            }

            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openModal(trigger);
            }
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape" && !modal.hidden) {
                closeModal();
            }
        });
    }

    function init() {
        initHeaderOffset();
        initSmoothScroll();
        initReveal();
        initAutoYear();
        initWhatsAppLinks();
        initDemoModal();
    }

    window.SiteApp = App;

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init, { once: true });
    } else {
        init();
    }
}());
