const FORM_URL = "https://l.facebook.com/l.php?u=https%3A%2F%2Fdocs.google.com%2Fforms%2Fd%2F1V4Gg1Cv_FQjogWRHct5VaC-s4T3ku-JIG_9HRJsTekA%2Fviewform%3Ffbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQ2hnakdyT0ZLM1dRaXVuY3NydGMGYXBwX2lkEDIyMjAzOTE3ODgyMDA4OTIAAR4x0BPbHY9MnF50dbyC501w-QBUwCQzWdN8vMQhwmb_2r5PEfuLsc4qPNTK1Q_aem_0kCclH0G9wniFqhLeOU_Lw&h=AT2YC2uXgImQCGG4XTSb4m4r0fYuBSbRIuyTm_YDSTf4aeosHfvNmiNM_I4El4GvK8F4-MyB0TLi5UyPkZ9Q4syO8neomWRnbKnmE2frLn7s3OSWUdPZsodDJzcneZgbXZ91YQ";

    document.getElementById("year").textContent = new Date().getFullYear();

    const regTop = document.getElementById("registerBtnTop");
    const regHero = document.getElementById("registerBtnHero");
    const regMobile = document.getElementById("registerBtnMobile");
    [regTop, regHero, regMobile].forEach(a => {
      if(!a) return;
      a.href = FORM_URL;
      a.target = "_blank";
      a.rel = "noopener";
    });

    const drawer = document.getElementById("drawer");
    const openMenu = document.getElementById("openMenu");
    const closeMenu = document.getElementById("closeMenu");
    const mLinks = document.querySelectorAll(".mLink");

    function setDrawer(open){
      drawer.classList.toggle("open", open);
      drawer.setAttribute("aria-hidden", String(!open));
      document.body.style.overflow = open ? "hidden" : "";
      if(open) closeMenu?.focus();
    }
    openMenu?.addEventListener("click", () => setDrawer(true));
    closeMenu?.addEventListener("click", () => setDrawer(false));
    drawer.addEventListener("click", (e) => { if(e.target === drawer) setDrawer(false); });
    mLinks.forEach(a => a.addEventListener("click", () => setDrawer(false)));
    window.addEventListener("keydown", (e) => { if(e.key === "Escape") setDrawer(false); });

    const root = document.documentElement;
    const themeBtn = document.getElementById("themeBtn");

    function applyTheme(theme){
      root.setAttribute("data-theme", theme);
      themeBtn.textContent = (theme === "light") ? "☀️" : "🌙";
      localStorage.setItem("theme", theme);
    }
    const saved = localStorage.getItem("theme");
    if(saved === "light" || saved === "dark") applyTheme(saved);
    else applyTheme("dark");

    themeBtn.addEventListener("click", () => {
      const current = root.getAttribute("data-theme") || "dark";
      applyTheme(current === "dark" ? "light" : "dark");
    });

    const dEl = document.getElementById("d");
    const hEl = document.getElementById("h");
    const mEl = document.getElementById("m");
    const sEl = document.getElementById("s");
    const cdMsg = document.getElementById("cdMsg");

    const target = new Date(2025, 11, 20, 23, 59, 59);
    function pad(n){ return String(n).padStart(2,"0"); }

    function tick(){
      const now = new Date();
      let diff = target - now;

      if(diff <= 0){
        dEl.textContent = "0";
        hEl.textContent = "00";
        mEl.textContent = "00";
        sEl.textContent = "00";
        if(cdMsg){
          cdMsg.style.display = "block";
          cdMsg.textContent = "⏳ Бүртгэлийн хугацаа дууссан байна.";
        }
        return;
      }

      const sec = Math.floor(diff / 1000);
      const days = Math.floor(sec / 86400);
      const hours = Math.floor((sec % 86400) / 3600);
      const mins = Math.floor((sec % 3600) / 60);
      const secs = sec % 60;

      dEl.textContent = String(days);
      hEl.textContent = pad(hours);
      mEl.textContent = pad(mins);
      sEl.textContent = pad(secs);

      if(cdMsg) cdMsg.style.display = "none";
    }
    tick();
    setInterval(tick, 1000);
