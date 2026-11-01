/* MEGA CODE — site interactions */
(function () {
  "use strict";
  var root = document.documentElement;
  root.classList.remove("no-js");

  /* ---------- Theme toggle ---------- */
  var KEY = "megacode-theme";
  function currentTheme() {
    var t = root.getAttribute("data-theme");
    if (t) return t;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  function setTheme(t, persist) {
    root.setAttribute("data-theme", t);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", t === "dark" ? "#0B0F17" : "#F8FAFC");
    document.querySelectorAll(".theme-toggle").forEach(function (b) {
      b.setAttribute("aria-label", t === "dark" ? "Switch to light theme" : "Switch to dark theme");
      b.setAttribute("aria-pressed", t === "dark" ? "true" : "false");
    });
    if (persist) { try { localStorage.setItem(KEY, t); } catch (e) {} }
  }
  setTheme(currentTheme(), false);
  document.querySelectorAll(".theme-toggle").forEach(function (btn) {
    btn.addEventListener("click", function () {
      setTheme(currentTheme() === "dark" ? "light" : "dark", true);
    });
  });
  // follow the OS when the visitor hasn't picked a theme
  if (window.matchMedia) {
    var mq = window.matchMedia("(prefers-color-scheme: dark)");
    var onChange = function (e) {
      var saved = null; try { saved = localStorage.getItem(KEY); } catch (err) {}
      if (!saved) setTheme(e.matches ? "dark" : "light", false);
    };
    if (mq.addEventListener) mq.addEventListener("change", onChange); else if (mq.addListener) mq.addListener(onChange);
  }

  /* ---------- Reveal on scroll ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else { reveals.forEach(function (el) { el.classList.add("in"); }); }

  /* ---------- Hide broken photos (keeps the dark media panel instead of alt text) ---------- */
  document.querySelectorAll(".media img").forEach(function (img) {
    var hide = function () { img.style.visibility = "hidden"; };
    if (img.complete && img.naturalWidth === 0) hide(); else img.addEventListener("error", hide);
  });

  /* ---------- Client logos: show the logo when the file exists, else keep the initials badge ---------- */
  document.querySelectorAll(".client img").forEach(function (img) {
    var card = img.closest(".client");
    if (img.complete && img.naturalWidth > 0) card.classList.add("has-logo");
    else if (img.complete) img.remove();
  });

  /* ---------- Footer year ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ---------- Generic form success (no backend yet) ---------- */
  document.querySelectorAll("form[data-success]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var ok = document.getElementById(form.getAttribute("data-success"));
      form.hidden = true;
      if (ok) { ok.classList.add("show"); ok.setAttribute("tabindex", "-1"); ok.focus({ preventScroll: true }); ok.scrollIntoView({ behavior: "smooth", block: "center" }); }
    });
  });
  document.querySelectorAll("[data-reset-form]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var form = document.getElementById(btn.getAttribute("data-reset-form"));
      var ok = btn.closest(".success-state");
      if (form) { form.reset(); form.hidden = false; }
      if (ok) ok.classList.remove("show");
    });
  });

  /* ---------- Home: scope estimator ---------- */
  var tracks = {
    mvp: { badge: "SPRINT: RAPID MVP", cls: "text-success", text: "Includes product discovery, interactive Figma UI prototypes, CI/CD staging pipelines, and a production release warranty." },
    saas: { badge: "TRACK: FULL-SCALE SAAS", cls: "text-cyan", text: "Includes multi-tenant database partitioning, automated billing gateways, role-based access permissions, and analytics dashboards." },
    enterprise: { badge: "TIER: ENTERPRISE CLUSTER", cls: "text-brand", text: "Bespoke microservices, high-availability load balancers, multi-region compliance, SLA contracts, and team enablement sprints." }
  };
  var est = document.getElementById("project-type");
  if (est) {
    est.addEventListener("change", function () {
      var t = tracks[est.value]; if (!t) return;
      var b = document.getElementById("tier-badge");
      b.textContent = t.badge; b.className = "code-label " + t.cls;
      document.getElementById("estimator-details").textContent = t.text;
    });
  }

  /* ---------- Services: engagement model + scope ---------- */
  var models = {
    dedicated: "A full squad (PM, engineers, QA) embedded in your roadmap — billed monthly, scaled up or down with 30 days' notice.",
    sprint: "Fixed scope, fixed price. We lock requirements in discovery, then deliver in 2-week sprints with a clickable demo at the end of each.",
    retainer: "Ongoing maintenance, monitoring, and enhancements on a monthly block of engineering hours with a 24/7 critical SLA."
  };
  document.querySelectorAll("[data-model]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      document.querySelectorAll("[data-model]").forEach(function (b) { b.setAttribute("aria-pressed", "false"); });
      btn.setAttribute("aria-pressed", "true");
      var d = document.getElementById("model-desc"); if (d) d.textContent = models[btn.getAttribute("data-model")];
      var h = document.getElementById("model-input"); if (h) h.value = btn.getAttribute("data-model");
    });
  });
  var scopeBox = document.getElementById("scope-list");
  if (scopeBox) {
    var count = document.getElementById("scope-count");
    var upd = function () {
      var n = scopeBox.querySelectorAll("input:checked").length;
      count.textContent = n + " selected";
    };
    scopeBox.addEventListener("change", upd); upd();
  }

  /* ---------- Why us: readiness calculator ---------- */
  var calc = document.getElementById("readiness");
  if (calc) {
    var out = document.getElementById("readiness-out");
    var run = function () {
      var hrs = 120;
      calc.querySelectorAll("input[data-hours]").forEach(function (i) { if (i.checked) hrs -= parseInt(i.getAttribute("data-hours"), 10); });
      out.textContent = hrs <= 48 ? "< 48 Hours" : hrs <= 72 ? "~ 72 Hours" : hrs <= 96 ? "~ 4 Days" : "~ 5 Days";
    };
    calc.addEventListener("change", run); run();
  }

  /* ---------- Careers: apply buttons prefill role ---------- */
  document.querySelectorAll("[data-role]").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      var sel = document.getElementById("role");
      if (!sel) return;
      e.preventDefault();
      sel.value = btn.getAttribute("data-role");
      document.getElementById("apply").scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(function () { var n = document.getElementById("full-name"); if (n) n.focus({ preventScroll: true }); }, 500);
    });
  });

  /* ---------- Services sub-nav active state ---------- */
  var subLinks = document.querySelectorAll(".service-nav a[href^='#']");
  if (subLinks.length && "IntersectionObserver" in window) {
    var map = {};
    subLinks.forEach(function (a) { var s = document.querySelector(a.getAttribute("href")); if (s) map[s.id] = a; });
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          subLinks.forEach(function (a) { a.classList.remove("active"); });
          var a = map[en.target.id]; if (a) a.classList.add("active");
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    Object.keys(map).forEach(function (id) { so.observe(document.getElementById(id)); });
  }
})();
