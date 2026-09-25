(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());

    /* ——— Page loader ——— */
    const finishLoad = () => {
        document.body.classList.remove("is-loading");
    };

    if (reduceMotion) {
        finishLoad();
    } else {
        window.addEventListener("load", () => {
            setTimeout(finishLoad, 700);
        });
        setTimeout(finishLoad, 2200);
    }

    /* ——— Split name into letters ——— */
    document.querySelectorAll("[data-letters]").forEach((line, lineIndex) => {
        const text = line.getAttribute("data-letters") || "";
        line.textContent = "";
        [...text].forEach((ch, i) => {
            const span = document.createElement("span");
            span.className = "char";
            span.textContent = ch;
            span.style.animationDelay = `${0.55 + lineIndex * 0.12 + i * 0.035}s`;
            line.appendChild(span);
        });
    });

    /* ——— Mobile nav ——— */
    const toggle = document.querySelector(".nav-toggle");
    const nav = document.getElementById("primary-nav");
    const header = document.querySelector(".site-header");

    if (toggle && nav) {
        const setOpen = (open) => {
            toggle.setAttribute("aria-expanded", String(open));
            toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
            nav.classList.toggle("is-open", open);
        };

        toggle.addEventListener("click", () => {
            setOpen(toggle.getAttribute("aria-expanded") !== "true");
        });

        nav.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => setOpen(false));
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") setOpen(false);
        });
    }

    /* ——— Tabs ——— */
    const tabs = document.querySelectorAll(".tab");
    const panels = document.querySelectorAll(".tab-panel");

    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            const targetId = tab.getAttribute("aria-controls");
            tabs.forEach((t) => {
                const active = t === tab;
                t.classList.toggle("is-active", active);
                t.setAttribute("aria-selected", String(active));
            });
            panels.forEach((panel) => {
                const match = panel.id === targetId;
                panel.classList.toggle("is-active", match);
                panel.hidden = !match;
            });
        });
    });

    /* ——— Role rotator ——— */
    const roles = document.querySelectorAll(".hero-role-rotator span");
    if (roles.length > 1 && !reduceMotion) {
        let i = 0;
        setInterval(() => {
            roles[i].classList.remove("is-active");
            i = (i + 1) % roles.length;
            roles[i].classList.add("is-active");
        }, 2600);
    }

    /* ——— Scroll progress, header, active nav / dots ——— */
    const progress = document.querySelector(".scroll-progress span");
    const navLinks = document.querySelectorAll(".primary-nav a[data-section]");
    const dots = document.querySelectorAll(".side-dots a[data-dot]");
    const sectionIds = ["top", "about", "services", "work", "contact"];
    const sections = sectionIds
        .map((id) => document.getElementById(id))
        .filter(Boolean);

    const onScroll = () => {
        const scrolled = window.scrollY;
        const docH = document.documentElement.scrollHeight - window.innerHeight;
        if (progress && docH > 0) {
            progress.style.width = `${Math.min(100, (scrolled / docH) * 100)}%`;
        }
        if (header) header.classList.toggle("is-scrolled", scrolled > 40);

        let current = "top";
        sections.forEach((section) => {
            if (scrolled >= section.offsetTop - 160) current = section.id;
        });

        navLinks.forEach((link) => {
            link.classList.toggle("is-active", link.dataset.section === current);
        });
        dots.forEach((dot) => {
            dot.classList.toggle("is-active", dot.dataset.dot === current);
        });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    /* ——— Reveal + count-up ——— */
    const revealTargets = document.querySelectorAll("[data-reveal]");

    const animateCount = (el) => {
        const target = Number(el.dataset.count || 0);
        if (!target) return;
        const duration = 1100;
        const start = performance.now();
        const step = (now) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            el.textContent = String(Math.round(target * eased));
            if (t < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    };

    if ("IntersectionObserver" in window) {
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add("is-visible");
                    entry.target.querySelectorAll("[data-count]").forEach(animateCount);
                    io.unobserve(entry.target);
                });
            },
            { threshold: 0.14, rootMargin: "0px 0px -6% 0px" }
        );
        revealTargets.forEach((el) => io.observe(el));
    } else {
        revealTargets.forEach((el) => {
            el.classList.add("is-visible");
            el.querySelectorAll("[data-count]").forEach(animateCount);
        });
    }

    /* ——— Parallax portrait ——— */
    const parallaxImg = document.querySelector("[data-parallax]");
    if (parallaxImg && !reduceMotion) {
        window.addEventListener(
            "scroll",
            () => {
                const y = Math.min(48, window.scrollY * 0.1);
                parallaxImg.style.transform = `translateY(${y}px) scale(1.03)`;
            },
            { passive: true }
        );
    }

    /* ——— 3D tilt ——— */
    if (!reduceMotion && finePointer) {
        const tilt = (el, strength = 8) => {
            el.addEventListener("pointermove", (e) => {
                const rect = el.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                el.style.transform = `rotateY(${x * strength}deg) rotateX(${-y * strength}deg)`;
            });
            el.addEventListener("pointerleave", () => {
                el.style.transform = "";
            });
        };

        document.querySelectorAll("[data-tilt]").forEach((el) => tilt(el, 7));
        document.querySelectorAll("[data-tilt-media] .work-media").forEach((el) => tilt(el, 5));
    }

    /* ——— Magnetic buttons ——— */
    if (!reduceMotion && finePointer) {
        document.querySelectorAll(".magnetic").forEach((btn) => {
            btn.addEventListener("pointermove", (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                btn.style.transform = `translate(${x * 0.2}px, ${y * 0.25}px)`;
            });
            btn.addEventListener("pointerleave", () => {
                btn.style.transform = "";
            });
        });
    }

    /* ——— Custom cursor + spotlight ——— */
    const cursorRoot = document.querySelector(".cursor");
    const cursorDot = document.querySelector(".cursor-dot");
    const cursorRing = document.querySelector(".cursor-ring");
    const cursorLabel = document.querySelector(".cursor-label");
    const spotlight = document.querySelector(".spotlight");
    const canCursor =
        cursorRoot &&
        cursorDot &&
        cursorRing &&
        !reduceMotion &&
        finePointer &&
        window.innerWidth > 720;

    if (canCursor) {
        document.body.classList.add("has-cursor");
        let mx = 0;
        let my = 0;
        let rx = 0;
        let ry = 0;

        document.addEventListener(
            "pointermove",
            (e) => {
                mx = e.clientX;
                my = e.clientY;
                cursorDot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
                if (cursorLabel) {
                    cursorLabel.style.transform = `translate(${mx}px, ${my}px) translate(-50%, 2.4rem)`;
                }
                if (spotlight) {
                    spotlight.style.left = `${mx}px`;
                    spotlight.style.top = `${my}px`;
                    spotlight.classList.add("is-on");
                }
            },
            { passive: true }
        );

        const tick = () => {
            rx += (mx - rx) * 0.18;
            ry += (my - ry) * 0.18;
            cursorRing.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
            requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);

        document.addEventListener("pointerdown", () => cursorRoot.classList.add("is-down"));
        document.addEventListener("pointerup", () => cursorRoot.classList.remove("is-down"));

        document.querySelectorAll("[data-cursor], a, button, .service-item, .work-item, input, textarea").forEach((el) => {
            el.addEventListener("pointerenter", () => {
                cursorRoot.classList.add("is-hover");
                const label = el.getAttribute("data-cursor");
                if (label && cursorLabel) {
                    cursorLabel.textContent = label;
                    cursorRoot.classList.add("has-label");
                }
            });
            el.addEventListener("pointerleave", () => {
                cursorRoot.classList.remove("is-hover", "has-label");
                if (cursorLabel) cursorLabel.textContent = "";
            });
        });
    }

    /* ——— Contact form ——— */
    const scriptURL =
        "https://script.google.com/macros/s/AKfycby6NcMwA6I05yEO0XagbkHWqIXSdJDSlOJrSMpvqxctC3XrapfUVcZQ4BJcbkMSSVU/exec";
    const form = document.forms["submit-to-google-sheet"];
    const status = document.getElementById("form-status");

    if (form && status) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            if (!form.checkValidity()) {
                status.textContent = "Please fill out all required fields.";
                status.className = "form-status is-err";
                return;
            }

            status.textContent = "Sending…";
            status.className = "form-status is-pending";

            try {
                const response = await fetch(scriptURL, {
                    method: "POST",
                    body: new FormData(form),
                });

                if (!response.ok) {
                    throw new Error(`Server responded with status ${response.status}`);
                }

                status.textContent = "Message sent successfully.";
                status.className = "form-status is-ok";
                form.reset();
                setTimeout(() => {
                    status.textContent = "";
                    status.className = "form-status";
                }, 5000);
            } catch (err) {
                status.textContent = `Couldn’t send — ${err.message}. Try again.`;
                status.className = "form-status is-err";
            }
        });
    }
})();
