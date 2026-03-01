/* ============================================================
   PRABHAT KUMAR — PORTFOLIO SCRIPT
   Features: Preloader, Matrix Canvas, Typed.js, Cursor,
             Scroll Reveal, Counters, Skill Bars, Filter,
             Navbar, Drawer, Back-to-top
   ============================================================ */

// ============ PRELOADER ============
(function () {
    var pre = document.getElementById('preloader');
    function hidePre() {
        if (!pre) return;
        pre.classList.add('gone');
        document.body.style.overflow = 'auto';
        setTimeout(function () {
            pre.style.display = 'none';
            startReveal();
            startCounters();
        }, 600);
    }
    setTimeout(hidePre, 2400);
    document.body.style.overflow = 'hidden';
})();

// ============ TYPED.JS ============
var typed = new Typed('#typed-el', {
    strings: [
        'AI/ML Engineer',
        'GenAI Developer',
        'RAG Specialist',
        'Python Developer',
        'LLM Architect'
    ],
    typeSpeed: 65,
    backSpeed: 35,
    backDelay: 1800,
    loop: true,
    smartBackspace: true
});

// ============ MATRIX CANVAS ============
(function () {
    var canvas = document.getElementById('matrixCanvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var W, H, cols, drops;

    function resize() {
        W = canvas.width = canvas.offsetWidth;
        H = canvas.height = canvas.offsetHeight;
        cols = Math.floor(W / 18);
        drops = Array(cols).fill(1);
    }
    resize();
    window.addEventListener('resize', resize);

    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/\\|{}[]$#@!';
    function drawMatrix() {
        ctx.fillStyle = 'rgba(6,7,15,0.05)';
        ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = 'rgba(201,168,76,0.6)';
        ctx.font = '13px DM Mono, monospace';
        for (var i = 0; i < drops.length; i++) {
            var c = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(c, i * 18, drops[i] * 18);
            if (drops[i] * 18 > H && Math.random() > 0.97) drops[i] = 0;
            drops[i]++;
        }
    }
    setInterval(drawMatrix, 60);
})();

// ============ CUSTOM CURSOR ============
var cur = document.getElementById('cursor');
var ring = document.getElementById('cursorRing');
var mx = 0, my = 0, rx = 0, ry = 0;

if (cur && ring) {
    document.addEventListener('mousemove', function (e) {
        mx = e.clientX; my = e.clientY;
        cur.style.left = mx + 'px';
        cur.style.top  = my + 'px';
    });
    (function animRing() {
        rx += (mx - rx) * 0.1;
        ry += (my - ry) * 0.1;
        ring.style.left = rx + 'px';
        ring.style.top  = ry + 'px';
        requestAnimationFrame(animRing);
    })();

    var hoverEls = document.querySelectorAll('a, button, .proj-card, .tech-pills .tp, .hstat, .fb-service');
    hoverEls.forEach(function (el) {
        el.addEventListener('mouseenter', function () { ring.classList.add('big'); });
        el.addEventListener('mouseleave', function () { ring.classList.remove('big'); });
    });
}

// ============ NAVBAR ============
var navbar = document.getElementById('navbar');
var hamBtn = document.getElementById('hamBtn');
var drawer = document.getElementById('drawer');

window.addEventListener('scroll', function () {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    updateActiveLink();
    handleRevealOnScroll();
    handleSkillBars();
    handleBackTop();
});

// Hamburger
hamBtn.addEventListener('click', function () {
    hamBtn.classList.toggle('open');
    drawer.classList.toggle('open');
});
document.querySelectorAll('.dlink').forEach(function (l) {
    l.addEventListener('click', function () {
        hamBtn.classList.remove('open');
        drawer.classList.remove('open');
    });
});

// ============ ACTIVE NAV LINK ============
function updateActiveLink() {
    var sections = document.querySelectorAll('section[id]');
    var links = document.querySelectorAll('.nlink');
    var cur = '';
    sections.forEach(function (s) {
        if (window.scrollY >= s.offsetTop - 130) cur = s.id;
    });
    links.forEach(function (l) {
        l.classList.remove('active');
        if (l.getAttribute('href') === '#' + cur) l.classList.add('active');
    });
}

// ============ SMOOTH SCROLL ============
document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
        var target = document.querySelector(a.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ============ REVEAL ON SCROLL ============
function startReveal() {
    handleRevealOnScroll();
}
function handleRevealOnScroll() {
    var wh = window.innerHeight;
    document.querySelectorAll('.reveal-up, .reveal-right').forEach(function (el, i) {
        var rect = el.getBoundingClientRect();
        if (rect.top < wh - 60) {
            setTimeout(function () { el.classList.add('vis'); }, i * 70);
        }
    });
}
// Initial call after preloader
setTimeout(handleRevealOnScroll, 2600);

// ============ COUNTER ANIMATION ============
var countersStarted = false;
function startCounters() {
    if (countersStarted) return;
    countersStarted = true;
    document.querySelectorAll('[data-count]').forEach(function (el) {
        var target = parseInt(el.getAttribute('data-count'));
        var suffix = target === 7 ? '.78' : '';
        var duration = 1500;
        var steps = 50;
        var stepVal = target / steps;
        var count = 0;
        var interval = setInterval(function () {
            count += stepVal;
            if (count >= target) {
                el.textContent = target + suffix;
                clearInterval(interval);
            } else {
                el.textContent = Math.floor(count) + (suffix && count > target * 0.9 ? suffix : '');
            }
        }, duration / steps);
    });
}

// ============ SKILL BARS ============
var skillsDone = false;
function handleSkillBars() {
    if (skillsDone) return;
    var sec = document.getElementById('skills');
    if (!sec) return;
    if (sec.getBoundingClientRect().top < window.innerHeight - 60) {
        skillsDone = true;
        document.querySelectorAll('.sbar-fill').forEach(function (bar) {
            var w = bar.getAttribute('data-w');
            setTimeout(function () { bar.style.width = w + '%'; }, 300);
        });
    }
}

// ============ PROJECT FILTER ============
document.querySelectorAll('.pf').forEach(function (btn) {
    btn.addEventListener('click', function () {
        document.querySelectorAll('.pf').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var f = btn.getAttribute('data-f');
        document.querySelectorAll('.proj-card').forEach(function (card) {
            var cats = card.getAttribute('data-cat') || '';
            if (f === 'all' || cats.includes(f)) {
                card.style.display = '';
                card.style.animation = 'none';
                void card.offsetHeight;
                card.style.animation = 'fadeUp 0.4s ease forwards';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// ============ BACK TO TOP ============
var backTop = document.getElementById('backTop');
function handleBackTop() {
    if (!backTop) return;
    backTop.classList.toggle('show', window.scrollY > 400);
}
if (backTop) {
    backTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ============ FORM INTERACTIONS ============
document.querySelectorAll('.cf-group input, .cf-group textarea, .cf-group select').forEach(function (el) {
    el.addEventListener('focus', function () {
        var lbl = el.parentElement.querySelector('label');
        if (lbl) lbl.style.color = 'var(--gold)';
    });
    el.addEventListener('blur', function () {
        var lbl = el.parentElement.querySelector('label');
        if (lbl) lbl.style.color = '';
    });
});

// ============ INJECT KEYFRAMES ============
var kf = document.createElement('style');
kf.textContent = '@keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }';
document.head.appendChild(kf);
