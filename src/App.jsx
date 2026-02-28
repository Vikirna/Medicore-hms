import { useState, useEffect, useRef } from "react";

/* ─── SEED DATA ─────────────────────────────────────────────────────────── */
const SEED_DOCTORS = [
  { name:"Dr. Vishal Sharma",  spec:"NEUROLOGIST",   age:45, addr:"391 Vishwas Nagar", contact:"6382765851", fees:400,  salary:400000 },
  { name:"Dr. K.K. Gupta",     spec:"CARDIOLOGIST",  age:37, addr:"390 Ram Nagar",     contact:"9238623566", fees:700,  salary:650000 },
  { name:"Dr. Aman Aggarwal",  spec:"PLASTICS",      age:41, addr:"726 Raj Nagar",     contact:"6279165105", fees:600,  salary:550000 },
  { name:"Dr. Aadya Rai",      spec:"PAEDIATRICS",   age:39, addr:"406 Shyam Nagar",   contact:"6293452882", fees:800,  salary:400000 },
  { name:"Dr. Rishi Singh",    spec:"PSYCHIATRIST",  age:46, addr:"921 Vishwas Nagar", contact:"9826378451", fees:700,  salary:750000 },
  { name:"Dr. Mansi Sharma",   spec:"ORTHOPEDICS",   age:37, addr:"301 Anand Vihar",   contact:"9262718462", fees:800,  salary:950000 },
];
const SEED_NURSES = [
  { name:"Raima Aggarwal",  age:29, addr:"391 Anand Vihar",   contact:"9827450194", salary:200000 },
  { name:"Dhruv Rai",       age:27, addr:"428 Shyam Nagar",   contact:"9726503829", salary:170000 },
  { name:"Adya Sharma",     age:30, addr:"563 Ram Nagar",      contact:"9328303828", salary:200000 },
  { name:"Himesh Tripathi", age:32, addr:"303 Vishwas Nagar", contact:"9277382947", salary:200000 },
];
const SEED_WORKERS = [
  { name:"Ramesh Kumar", age:35, addr:"12 Civil Lines",  contact:"9811234567", salary:80000 },
  { name:"Sunita Devi",  age:28, addr:"45 Gandhi Nagar", contact:"9922345678", salary:75000 },
];
const SEED_PATIENTS = [
  { name:"Aarav Singh",  sex:"M", age:52, addr:"23 MG Road",    contact:"9811111111", doctor:"Dr. K.K. Gupta",    date:"2026-02-20" },
  { name:"Priya Mehta",  sex:"F", age:34, addr:"67 Rajpur Road", contact:"9822222222", doctor:"Dr. Aadya Rai",     date:"2026-02-25" },
  { name:"Vikram Joshi", sex:"M", age:29, addr:"89 Civil Lines", contact:"9833333333", doctor:"Dr. Vishal Sharma", date:"2026-02-28" },
];

const SPEC_META = {
  NEUROLOGIST:  { color:"#f472b6", bg:"#4a044e", floor:6, days:6, emoji:"🧠" },
  CARDIOLOGIST: { color:"#f87171", bg:"#450a0a", floor:3, days:3, emoji:"❤️" },
  PLASTICS:     { color:"#34d399", bg:"#022c22", floor:1, days:1, emoji:"✨" },
  PAEDIATRICS:  { color:"#fbbf24", bg:"#431407", floor:5, days:5, emoji:"🍼" },
  PSYCHIATRIST: { color:"#a78bfa", bg:"#2e1065", floor:2, days:2, emoji:"🧘" },
  ORTHOPEDICS:  { color:"#38bdf8", bg:"#082f49", floor:4, days:4, emoji:"🦴" },
};

const today = () => new Date();
const addDays = (n) => { const d = today(); d.setDate(d.getDate()+n); return d.toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"}); };
const DEMO_USER = { username:"admin", password:"admin123" };

/* ─── GLOBAL STYLES ─────────────────────────────────────────────────────── */
const G = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Outfit:wght@300;400;500;600&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#05060f;
  --s1:#0a0d1f;
  --s2:#0f1530;
  --border:#1e2a4a;
  --text:#f0f4ff;
  --muted:#6272a4;
  --c1:#ff6b6b;   /* coral red */
  --c2:#ffd93d;   /* electric yellow */
  --c3:#6bcb77;   /* vivid green */
  --c4:#4d96ff;   /* electric blue */
  --c5:#ff9f1c;   /* vivid orange */
  --c6:#f72585;   /* hot pink */
  --grad1:linear-gradient(135deg,#ff6b6b,#ffd93d);
  --grad2:linear-gradient(135deg,#4d96ff,#6bcb77);
  --grad3:linear-gradient(135deg,#f72585,#a78bfa);
  --font:'Outfit',sans-serif;
  --display:'Syne',sans-serif;
}
html{scroll-behavior:smooth}
body{font-family:var(--font);background:var(--bg);color:var(--text);min-height:100vh;overflow-x:hidden}
::-webkit-scrollbar{width:5px}
::-webkit-scrollbar-track{background:var(--s1)}
::-webkit-scrollbar-thumb{background:var(--c4);border-radius:3px}

/* ── NOISE OVERLAY ── */
body::before{content:'';position:fixed;inset:0;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");pointer-events:none;z-index:0;opacity:.4}

/* ── LANDING ── */
.land{position:relative;min-height:100vh;display:flex;flex-direction:column;overflow:hidden}
.land-bg{position:absolute;inset:0;background:radial-gradient(ellipse 60% 60% at 70% 30%,#0d2060 0%,transparent 60%),radial-gradient(ellipse 40% 50% at 10% 80%,#3d0030 0%,transparent 60%),var(--bg)}
.orb{position:absolute;border-radius:50%;filter:blur(80px);opacity:.35;animation:drift 12s ease-in-out infinite alternate}
.orb1{width:500px;height:500px;background:#ff6b6b;top:-100px;right:-100px}
.orb2{width:400px;height:400px;background:#4d96ff;bottom:-50px;left:-50px;animation-delay:-4s}
.orb3{width:300px;height:300px;background:#ffd93d;top:40%;left:40%;animation-delay:-8s}
@keyframes drift{0%{transform:translate(0,0) scale(1)}100%{transform:translate(40px,30px) scale(1.1)}}

.land-nav{position:relative;z-index:10;display:flex;align-items:center;justify-content:space-between;padding:24px 48px}
.land-logo{font-family:var(--display);font-weight:800;font-size:22px;background:var(--grad1);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.land-nav-links{display:flex;gap:8px}

.land-hero{position:relative;z-index:5;flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:60px 32px}
.hero-tag{display:inline-flex;align-items:center;gap:8px;background:#ffffff0f;border:1px solid #ffffff22;border-radius:30px;padding:8px 18px;font-size:13px;font-weight:500;color:var(--c2);margin-bottom:28px;letter-spacing:.5px;backdrop-filter:blur(10px)}
.hero-tag-dot{width:7px;height:7px;border-radius:50%;background:var(--c3);animation:pulse 2s ease-in-out infinite}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(.8)}}

.hero-h1{font-family:var(--display);font-size:clamp(42px,7vw,90px);font-weight:800;line-height:1;margin-bottom:12px;letter-spacing:-2px}
.hero-h1 .line1{display:block}
.hero-h1 .grad-text{background:var(--grad1);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.hero-h1 .grad-text2{background:var(--grad2);-webkit-background-clip:text;-webkit-text-fill-color:transparent}

.hero-sub{font-size:18px;color:var(--muted);max-width:520px;line-height:1.7;margin:20px auto 40px}

.hero-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}

.land-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;max-width:800px;width:100%;margin-top:60px}
.land-stat{background:#ffffff08;border:1px solid #ffffff14;border-radius:16px;padding:20px;backdrop-filter:blur(10px);text-align:center}
.land-stat-num{font-family:var(--display);font-size:32px;font-weight:800}
.land-stat-lbl{font-size:12px;color:var(--muted);margin-top:4px;font-weight:500}

.land-features{position:relative;z-index:5;display:grid;grid-template-columns:repeat(3,1fr);gap:20px;padding:0 48px 80px;max-width:1200px;margin:0 auto;width:100%}
.feat-card{background:#ffffff06;border:1px solid #ffffff12;border-radius:20px;padding:28px;backdrop-filter:blur(10px);transition:all .3s;cursor:default}
.feat-card:hover{background:#ffffff10;border-color:var(--c4);transform:translateY(-4px)}
.feat-icon{font-size:32px;margin-bottom:16px}
.feat-title{font-family:var(--display);font-size:18px;font-weight:700;margin-bottom:10px}
.feat-desc{font-size:14px;color:var(--muted);line-height:1.7}

/* ── BUTTONS ── */
.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:12px 24px;border-radius:12px;border:none;font-family:var(--font);font-size:14px;font-weight:600;cursor:pointer;transition:all .2s;text-decoration:none;white-space:nowrap}
.btn-glow{background:var(--grad1);color:#000;box-shadow:0 0 30px #ff6b6b66}
.btn-glow:hover{transform:translateY(-2px);box-shadow:0 0 50px #ff6b6b99}
.btn-outline{background:transparent;border:2px solid #ffffff30;color:var(--text)}
.btn-outline:hover{border-color:var(--c4);color:var(--c4);background:#4d96ff11}
.btn-blue{background:var(--c4);color:#fff;box-shadow:0 0 20px #4d96ff44}
.btn-blue:hover{background:#2d76df;transform:translateY(-1px)}
.btn-red{background:#7f1d1d;color:#fca5a5;border:1px solid #ef444466}
.btn-red:hover{background:#991b1b}
.btn-green{background:#14532d;color:#6ee7b7;border:1px solid #16a34a44}
.btn-green:hover{background:#166534}
.btn-ghost{background:transparent;border:1px solid var(--border);color:var(--muted)}
.btn-ghost:hover{border-color:var(--c4);color:var(--c4)}
.btn-yellow{background:#713f12;color:#fde68a;border:1px solid #d97706}
.btn-yellow:hover{background:#92400e}
.btn-sm{padding:7px 14px;font-size:12px;border-radius:8px}
.btn-full{width:100%}

/* ── SHELL ── */
.shell{display:flex;min-height:100vh}
.sidebar{width:260px;flex-shrink:0;background:var(--s1);border-right:1px solid var(--border);display:flex;flex-direction:column;position:sticky;top:0;height:100vh}
.sb-top{padding:28px 20px 20px;border-bottom:1px solid var(--border)}
.sb-logo{font-family:var(--display);font-weight:800;font-size:20px;background:var(--grad1);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.sb-tagline{font-size:11px;color:var(--muted);margin-top:3px;letter-spacing:.5px}
.sb-nav{flex:1;padding:16px 12px;overflow-y:auto}
.nav-grp-lbl{font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--muted);padding:14px 10px 6px}
.nav-btn{display:flex;align-items:center;gap:12px;padding:11px 14px;border-radius:10px;cursor:pointer;font-size:14px;font-weight:500;color:var(--muted);transition:all .15s;margin-bottom:2px;border:none;background:transparent;width:100%;text-align:left}
.nav-btn:hover{background:var(--s2);color:var(--text)}
.nav-btn.on{color:#fff;font-weight:600}
.nav-btn .ni{font-size:18px;width:22px;text-align:center}
.nav-btn .badge-count{margin-left:auto;background:var(--c1);color:#fff;font-size:10px;font-weight:700;padding:2px 7px;border-radius:20px}
.sb-foot{padding:16px 12px;border-top:1px solid var(--border)}
.user-row{display:flex;align-items:center;gap:10px;padding:12px;background:var(--s2);border-radius:12px;margin-bottom:10px}
.user-av{width:36px;height:36px;border-radius:50%;background:var(--grad1);display:flex;align-items:center;justify-content:center;font-weight:800;font-size:14px;color:#000;flex-shrink:0}
.user-name{font-size:13px;font-weight:600}
.user-role{font-size:11px;color:var(--muted)}

/* ── MAIN ── */
.main{flex:1;overflow-y:auto;background:var(--bg)}
.page{padding:36px 40px;max-width:1200px}
.ph{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:32px;gap:16px;flex-wrap:wrap}
.ph-left{}
.ph-title{font-family:var(--display);font-size:28px;font-weight:800;line-height:1}
.ph-sub{color:var(--muted);font-size:14px;margin-top:6px}
.ph-right{display:flex;gap:10px;align-items:center;flex-wrap:wrap}

/* ── STATS ── */
.stats-row{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:28px}
.sc{border-radius:16px;padding:22px;border:1px solid transparent;position:relative;overflow:hidden;transition:transform .2s}
.sc:hover{transform:translateY(-3px)}
.sc::before{content:'';position:absolute;inset:0;opacity:.12;background:var(--sc-grad)}
.sc-icon{font-size:26px;margin-bottom:12px;position:relative}
.sc-lbl{font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--muted);position:relative}
.sc-val{font-family:var(--display);font-size:36px;font-weight:800;margin:6px 0 2px;position:relative;line-height:1}
.sc-sub{font-size:12px;color:var(--muted);position:relative}

/* ── TABLE ── */
.tbl-wrap{background:var(--s1);border:1px solid var(--border);border-radius:18px;overflow:hidden;margin-bottom:24px}
.tbl-hdr{padding:18px 22px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px}
.tbl-title{font-family:var(--display);font-size:16px;font-weight:700}
.tbl-actions{display:flex;gap:10px;align-items:center}
table{width:100%;border-collapse:collapse}
thead th{background:#07091a;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--muted);padding:12px 18px;text-align:left;border-bottom:1px solid var(--border)}
tbody tr{border-top:1px solid #ffffff08;transition:background .1s}
tbody tr:hover{background:#ffffff05}
tbody td{padding:13px 18px;font-size:14px}
.empty-row td{text-align:center;padding:48px;color:var(--muted)}

/* ── BADGE ── */
.bdg{display:inline-flex;align-items:center;gap:5px;padding:4px 11px;border-radius:20px;font-size:11px;font-weight:700;letter-spacing:.3px}

/* ── SEARCH ── */
.search{background:var(--s2);border:1px solid var(--border);color:var(--text);border-radius:10px;padding:9px 16px;font-family:var(--font);font-size:14px;outline:none;width:220px;transition:border-color .2s}
.search:focus{border-color:var(--c4)}
.search::placeholder{color:var(--muted)}

/* ── CHIPS ── */
.chips{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:20px}
.chip{padding:6px 16px;border-radius:20px;font-size:12px;font-weight:600;cursor:pointer;border:1px solid var(--border);background:var(--s1);color:var(--muted);transition:all .15s;letter-spacing:.3px}
.chip.on{background:var(--c4);border-color:var(--c4);color:#fff}

/* ── MODAL ── */
.mbg{position:fixed;inset:0;background:#000000b8;z-index:9000;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(6px)}
.modal{background:var(--s1);border:1px solid var(--border);border-radius:20px;padding:36px;width:520px;max-height:85vh;overflow-y:auto;position:relative}
.modal-close{position:absolute;top:16px;right:16px;background:transparent;border:none;color:var(--muted);font-size:22px;cursor:pointer;line-height:1;padding:4px 8px;border-radius:8px;transition:all .15s}
.modal-close:hover{background:var(--s2);color:var(--text)}
.modal-title{font-family:var(--display);font-size:20px;font-weight:800;margin-bottom:24px}

/* ── FORM ── */
.fgrid{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.full{grid-column:1/-1}
.field{display:flex;flex-direction:column;gap:7px}
.field label{font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--muted)}
.field input,.field select{background:var(--s2);border:1px solid var(--border);color:var(--text);border-radius:10px;padding:12px 16px;font-family:var(--font);font-size:14px;outline:none;transition:border-color .2s;appearance:none}
.field input:focus,.field select:focus{border-color:var(--c4)}
.field select option{background:var(--s2)}
.ferr{color:var(--c1);font-size:12px}

/* ── APT CARDS ── */
.apt-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.apt-card{border-radius:16px;padding:22px;border:1px solid transparent;cursor:pointer;transition:all .25s;position:relative;overflow:hidden}
.apt-card::before{content:'';position:absolute;inset:0;opacity:.08;background:var(--agrad)}
.apt-card:hover{transform:translateY(-4px);border-color:currentColor;box-shadow:0 8px 30px var(--ashadow)}
.apt-emoji{font-size:28px;margin-bottom:12px}
.apt-spec{font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:6px}
.apt-doc{font-family:var(--display);font-size:16px;font-weight:700;margin-bottom:8px}
.apt-meta{font-size:12px;color:var(--muted)}

/* ── CONFIRM BOX ── */
.confirm-box{border-radius:16px;padding:22px;margin-bottom:24px;border:1px solid}

/* ── TOAST ── */
.toast{position:fixed;bottom:28px;right:28px;padding:14px 22px;border-radius:12px;font-size:14px;font-weight:600;z-index:99999;display:flex;align-items:center;gap:10px;animation:toastin .3s ease;box-shadow:0 8px 32px #00000066}
.toast-ok{background:#14532d;color:#6ee7b7;border:1px solid #16a34a}
.toast-err{background:#7f1d1d;color:#fca5a5;border:1px solid #dc2626}
@keyframes toastin{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}

/* ── APT CONFIRM ── */
.apt-confirm-panel{background:linear-gradient(135deg,#0c1f4a,#1a0c3d);border:1px solid #4d96ff55;border-radius:18px;padding:28px;margin-bottom:28px}

/* ── GRID HELPERS ── */
.row2{display:grid;grid-template-columns:1fr 1fr;gap:20px}

/* ── ANIMATIONS ── */
@keyframes fadeup{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
.fadeup{animation:fadeup .5s ease forwards}
.fadeup2{animation:fadeup .5s .15s ease both}
.fadeup3{animation:fadeup .5s .3s ease both}
.fadeup4{animation:fadeup .5s .45s ease both}

/* ── LOGIN ── */
.login-wrap{min-height:100vh;display:flex;align-items:center;justify-content:center;background:radial-gradient(ellipse 70% 70% at 60% 40%,#120a30,#05060f)}
.login-card{background:var(--s1);border:1px solid var(--border);border-radius:24px;padding:52px 44px;width:440px;box-shadow:0 0 100px #4d96ff22}
.login-head{text-align:center;margin-bottom:36px}
.login-logo{font-family:var(--display);font-size:28px;font-weight:800;background:var(--grad1);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:6px}
.login-sub{color:var(--muted);font-size:14px}
.login-demo{background:#0f1530;border:1px solid var(--border);border-radius:10px;padding:12px 16px;font-size:12px;color:var(--muted);margin-top:16px;font-family:'Courier New',monospace;text-align:center}

/* RESPONSIVE */
@media(max-width:768px){
  .stats-row{grid-template-columns:1fr 1fr}
  .apt-grid{grid-template-columns:1fr}
  .land-features{grid-template-columns:1fr;padding:0 24px 48px}
  .land-stats{grid-template-columns:1fr 1fr}
  .sidebar{width:200px}
  .page{padding:24px 20px}
}
`;

/* ─── HELPERS ───────────────────────────────────────────────────────────── */
function Toast({ msg, type, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, []);
  return <div className={`toast ${type==="ok"?"toast-ok":"toast-err"}`}>{type==="ok"?"✓":"✗"} {msg}</div>;
}

function Modal({ title, onClose, children, width=520 }) {
  return (
    <div className="mbg" onClick={onClose}>
      <div className="modal" style={{ width }} onClick={e=>e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="modal-title">{title}</div>
        {children}
      </div>
    </div>
  );
}

function SpecBadge({ spec }) {
  const m = SPEC_META[spec] || { color:"#94a3b8", bg:"#1e293b" };
  return <span className="bdg" style={{ background:m.bg, color:m.color }}>{m.emoji||"⚕"} {spec}</span>;
}

function SexBadge({ sex }) {
  return <span className="bdg" style={{ background:sex==="M"?"#172554":"#3b0764", color:sex==="M"?"#93c5fd":"#d8b4fe" }}>
    {sex==="M"?"♂ Male":"♀ Female"}
  </span>;
}

function Money({ v }) {
  return <span style={{ fontFamily:"'Courier New',monospace", color:"var(--c2)" }}>₹{Number(v).toLocaleString("en-IN")}</span>;
}

/* ─── LANDING PAGE ──────────────────────────────────────────────────────── */
function Landing({ onEnter }) {
  return (
    <div className="land">
      <div className="land-bg" />
      <div className="orb orb1" />
      <div className="orb orb2" />
      <div className="orb orb3" />

      {/* NAV */}
      <nav className="land-nav">
        <div className="land-logo">⚕ MediCore HMS</div>
        <div className="land-nav-links">
          <button className="btn btn-outline" onClick={onEnter}>Sign In</button>
          <button className="btn btn-glow" onClick={onEnter}>Launch App →</button>
        </div>
      </nav>

      {/* HERO */}
      <div className="land-hero">
        <div className="hero-tag fadeup">
          <span className="hero-tag-dot" />
          Hospital Management System · CS Project 2024
        </div>
        <h1 className="hero-h1 fadeup2">
          <span className="line1">Modern Care.</span>
          <span className="grad-text">Smarter</span>{" "}
          <span className="grad-text2">Management.</span>
        </h1>
        <p className="hero-sub fadeup3">
          A complete hospital management platform — doctors, nurses, patients, appointments, and real-time dashboards. Built to impress.
        </p>
        <div className="hero-btns fadeup4">
          <button className="btn btn-glow" style={{ fontSize:16, padding:"16px 36px" }} onClick={onEnter}>
            🚀 Open Dashboard
          </button>
          <button className="btn btn-outline" style={{ fontSize:16, padding:"16px 28px" }}>
            View on GitHub
          </button>
        </div>

        <div className="land-stats fadeup4">
          {[
            { num:"6+", lbl:"Specialists", color:"var(--c1)" },
            { num:"4+", lbl:"Departments", color:"var(--c2)" },
            { num:"∞", lbl:"Patients", color:"var(--c3)" },
            { num:"24/7", lbl:"Availability", color:"var(--c4)" },
          ].map(s=>(
            <div className="land-stat" key={s.lbl}>
              <div className="land-stat-num" style={{ color:s.color }}>{s.num}</div>
              <div className="land-stat-lbl">{s.lbl}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <div className="land-features">
        {[
          { icon:"🏥", title:"Patient Management", desc:"Admit, track, and discharge patients with full records including assigned doctors and contact details." },
          { icon:"👨‍⚕️", title:"Doctor Directory", desc:"Manage specialists across neurology, cardiology, orthopedics and more. View fees and schedule appointments." },
          { icon:"📅", title:"Smart Appointments", desc:"Book consultations by specialisation. Auto-assigns available doctor with date, floor, and fee info." },
          { icon:"👩‍⚕️", title:"Nursing & Staff", desc:"Complete records for nurses and support staff with salary management and contact details." },
          { icon:"📊", title:"Live Dashboard", desc:"Real-time statistics showing hospital occupancy, staff counts, and recent patient activity at a glance." },
          { icon:"🔐", title:"Secure Login", desc:"Role-based authentication system. Only authorized personnel can access and modify hospital records." },
        ].map(f=>(
          <div className="feat-card" key={f.title}>
            <div className="feat-icon">{f.icon}</div>
            <div className="feat-title">{f.title}</div>
            <div className="feat-desc">{f.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── LOGIN ─────────────────────────────────────────────────────────────── */
function Login({ onLogin, onBack }) {
  const [u, setU] = useState(""); const [p, setP] = useState(""); const [err, setErr] = useState("");
  const go = () => {
    if (u===DEMO_USER.username && p===DEMO_USER.password) onLogin(u);
    else setErr("Invalid credentials.");
  };
  return (
    <div className="login-wrap">
      <div className="login-card fadeup">
        <div className="login-head">
          <div className="login-logo">⚕ MediCore HMS</div>
          <div className="login-sub">Sign in to access the hospital portal</div>
        </div>
        <div className="field" style={{ marginBottom:14 }}>
          <label>Username</label>
          <input value={u} onChange={e=>setU(e.target.value)} placeholder="Enter username" onKeyDown={e=>e.key==="Enter"&&go()} />
        </div>
        <div className="field" style={{ marginBottom:20 }}>
          <label>Password</label>
          <input type="password" value={p} onChange={e=>setP(e.target.value)} placeholder="Enter password" onKeyDown={e=>e.key==="Enter"&&go()} />
        </div>
        {err && <div className="ferr" style={{ marginBottom:12 }}>✗ {err}</div>}
        <button className="btn btn-glow btn-full" style={{ fontSize:15, padding:14 }} onClick={go}>Sign In →</button>
        <div className="login-demo">demo login: admin / admin123</div>
        <button className="btn btn-ghost btn-full" style={{ marginTop:12 }} onClick={onBack}>← Back to Home</button>
      </div>
    </div>
  );
}

/* ─── SIDEBAR ───────────────────────────────────────────────────────────── */
const NAV_GROUPS = [
  { label:"Overview", items:[{ id:"dash", icon:"◈", label:"Dashboard" }] },
  { label:"Administration", items:[
    { id:"doctors",  icon:"⚕", label:"Doctors",      countKey:"doctors" },
    { id:"nurses",   icon:"♡", label:"Nurses",       countKey:"nurses" },
    { id:"workers",  icon:"⚙", label:"Support Staff", countKey:"workers" },
  ]},
  { label:"Patients", items:[
    { id:"patients",      icon:"▣", label:"Patients",     countKey:"patients" },
    { id:"appointments",  icon:"◷", label:"Appointments"  },
  ]},
];

const NAV_COLORS = { dash:"var(--grad1)", doctors:"var(--grad1)", nurses:"var(--c6)", workers:"var(--c5)", patients:"var(--c3)", appointments:"var(--c4)" };

function Sidebar({ page, setPage, user, onLogout, counts }) {
  return (
    <div className="sidebar">
      <div className="sb-top">
        <div className="sb-logo">⚕ MediCore</div>
        <div className="sb-tagline">Hospital Management System</div>
      </div>
      <div className="sb-nav">
        {NAV_GROUPS.map(g=>(
          <div key={g.label}>
            <div className="nav-grp-lbl">{g.label}</div>
            {g.items.map(item=>(
              <button key={item.id} className={`nav-btn ${page===item.id?"on":""}`}
                style={page===item.id?{ background:`linear-gradient(90deg,${NAV_COLORS[item.id]}22,transparent)`, borderLeft:`3px solid`, borderColor:"transparent", backgroundImage:`linear-gradient(90deg,${NAV_COLORS[item.id]}22,transparent)`, color:"#fff" }:{}}
                onClick={()=>setPage(item.id)}>
                <span className="ni">{item.icon}</span>
                {item.label}
                {item.countKey && counts[item.countKey]!==undefined && (
                  <span className="badge-count">{counts[item.countKey]}</span>
                )}
              </button>
            ))}
          </div>
        ))}
      </div>
      <div className="sb-foot">
        <div className="user-row">
          <div className="user-av">{user[0].toUpperCase()}</div>
          <div>
            <div className="user-name">{user}</div>
            <div className="user-role">Administrator</div>
          </div>
        </div>
        <button className="btn btn-ghost btn-full" style={{ fontSize:13 }} onClick={onLogout}>← Sign Out</button>
      </div>
    </div>
  );
}

/* ─── DASHBOARD ──────────────────────────────────────────────────────────── */
function Dashboard({ doctors, nurses, workers, patients }) {
  const stats = [
    { icon:"⚕", lbl:"Doctors",      val:doctors.length,  sub:"Active specialists", c:"var(--c1)",  grad:"linear-gradient(135deg,#ff6b6b,#f87171)", shadow:"#ff6b6b" },
    { icon:"♡", lbl:"Nurses",       val:nurses.length,   sub:"On duty",            c:"var(--c6)",  grad:"linear-gradient(135deg,#f72585,#ec4899)", shadow:"#f72585" },
    { icon:"▣", lbl:"Patients",     val:patients.length, sub:"Admitted",           c:"var(--c3)",  grad:"linear-gradient(135deg,#6bcb77,#22c55e)", shadow:"#6bcb77" },
    { icon:"⚙", lbl:"Support Staff",val:workers.length,  sub:"Other staff",        c:"var(--c5)",  grad:"linear-gradient(135deg,#ff9f1c,#f59e0b)", shadow:"#ff9f1c" },
  ];

  return (
    <div className="page">
      <div className="ph fadeup">
        <div className="ph-left">
          <div className="ph-title">Dashboard 📊</div>
          <div className="ph-sub">{new Date().toLocaleDateString("en-IN",{ weekday:"long", year:"numeric", month:"long", day:"numeric" })}</div>
        </div>
      </div>

      <div className="stats-row fadeup2">
        {stats.map(s=>(
          <div className="sc" key={s.lbl} style={{ "--sc-grad":s.grad, background:s.grad+"11", border:`1px solid ${s.shadow}33` }}>
            <div className="sc-icon" style={{ fontSize:28 }}>{s.icon}</div>
            <div className="sc-lbl">{s.lbl}</div>
            <div className="sc-val" style={{ color:s.c }}>{s.val}</div>
            <div className="sc-sub">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="row2 fadeup3">
        {/* Recent Patients */}
        <div className="tbl-wrap">
          <div className="tbl-hdr"><div className="tbl-title">🏥 Recent Patients</div></div>
          <table>
            <thead><tr><th>Name</th><th>Doctor</th><th>Admitted</th></tr></thead>
            <tbody>
              {patients.length===0 && <tr className="empty-row"><td colSpan={3}>No patients yet</td></tr>}
              {[...patients].reverse().slice(0,5).map((p,i)=>(
                <tr key={i}>
                  <td>{p.name}</td>
                  <td style={{ color:"var(--muted)", fontSize:13 }}>{p.doctor}</td>
                  <td><span className="bdg" style={{ background:"#0d2040", color:"var(--c4)" }}>{p.date}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Doctors quick view */}
        <div className="tbl-wrap">
          <div className="tbl-hdr"><div className="tbl-title">👨‍⚕️ Specialists</div></div>
          <table>
            <thead><tr><th>Doctor</th><th>Spec.</th><th>Fees</th></tr></thead>
            <tbody>
              {doctors.map((d,i)=>(
                <tr key={i}>
                  <td style={{ fontWeight:600 }}>{d.name}</td>
                  <td><SpecBadge spec={d.spec} /></td>
                  <td><Money v={d.fees} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Salary overview */}
      <div className="tbl-wrap fadeup4">
        <div className="tbl-hdr"><div className="tbl-title">💰 Monthly Payroll Summary</div></div>
        <table>
          <thead><tr><th>Category</th><th>Count</th><th>Total Monthly Salary</th><th>Avg. Salary</th></tr></thead>
          <tbody>
            {[
              { cat:"Doctors 👨‍⚕️", data:doctors },
              { cat:"Nurses ♡", data:nurses },
              { cat:"Support Staff ⚙", data:workers },
            ].map(({ cat, data })=>{
              const total = data.reduce((s,d)=>s+(+d.salary),0);
              const avg = data.length ? Math.round(total/data.length) : 0;
              return (
                <tr key={cat}>
                  <td style={{ fontWeight:600 }}>{cat}</td>
                  <td><span className="bdg" style={{ background:"#172554", color:"var(--c4)" }}>{data.length}</span></td>
                  <td><Money v={total} /></td>
                  <td><Money v={avg} /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─── GENERIC STAFF PAGE ─────────────────────────────────────────────────── */
function StaffPage({ title, icon, accentColor, data, columns, onDelete, FormModal }) {
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [delTarget, setDelTarget] = useState(null);

  const filtered = data.filter(r => JSON.stringify(r).toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="page">
      <div className="ph fadeup">
        <div className="ph-left">
          <div className="ph-title">{icon} {title}</div>
          <div className="ph-sub">{data.length} record{data.length!==1?"s":""} total</div>
        </div>
        <div className="ph-right">
          <input className="search" placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)} />
          <button className="btn btn-glow" onClick={()=>setShowForm(true)}>+ Add New</button>
        </div>
      </div>

      <div className="tbl-wrap fadeup2">
        <table>
          <thead><tr>{columns.map(c=><th key={c.key}>{c.label}</th>)}<th>Actions</th></tr></thead>
          <tbody>
            {filtered.length===0 && <tr className="empty-row"><td colSpan={columns.length+1}>No records found</td></tr>}
            {filtered.map((row,i)=>(
              <tr key={i}>
                {columns.map(c=>(
                  <td key={c.key}>{c.render ? c.render(row[c.key], row) : row[c.key]}</td>
                ))}
                <td>
                  <button className="btn btn-red btn-sm" onClick={()=>setDelTarget(row)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && <FormModal onClose={()=>setShowForm(false)} />}

      {delTarget && (
        <Modal title="Confirm Delete" onClose={()=>setDelTarget(null)} width={400}>
          <p style={{ color:"var(--muted)", marginBottom:20, lineHeight:1.7 }}>
            Delete <strong style={{ color:"var(--text)" }}>{delTarget.name}</strong> from the database? This cannot be undone.
          </p>
          <div style={{ display:"flex", gap:10 }}>
            <button className="btn btn-red" onClick={()=>{ onDelete(delTarget.name); setDelTarget(null); }}>Yes, Delete</button>
            <button className="btn btn-ghost" onClick={()=>setDelTarget(null)}>Cancel</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

/* ─── DOCTORS PAGE ───────────────────────────────────────────────────────── */
function DoctorsPage({ doctors, setDoctors, toast }) {
  const SPECS = ["NEUROLOGIST","CARDIOLOGIST","PLASTICS","PAEDIATRICS","PSYCHIATRIST","ORTHOPEDICS","DERMATOLOGIST","GENERAL PHYSICIAN"];
  const [f, setF] = useState({ name:"", spec:"", age:"", addr:"", contact:"", fees:"", salary:"" });
  const upd = k => e => setF(p=>({...p,[k]:e.target.value}));

  const cols = [
    { key:"name",    label:"Name",           render:v=><strong>{v}</strong> },
    { key:"spec",    label:"Specialisation", render:v=><SpecBadge spec={v} /> },
    { key:"age",     label:"Age" },
    { key:"contact", label:"Contact" },
    { key:"fees",    label:"Fees",          render:v=><Money v={v} /> },
    { key:"salary",  label:"Monthly Salary",render:v=><Money v={v} /> },
  ];

  const Form = ({ onClose }) => (
    <Modal title="Add New Doctor" onClose={onClose}>
      <div className="fgrid">
        <div className="field full"><label>Full Name</label><input value={f.name} onChange={upd("name")} placeholder="Dr. Full Name" /></div>
        <div className="field"><label>Specialisation</label>
          <select value={f.spec} onChange={upd("spec")}>
            <option value="">Select...</option>{SPECS.map(s=><option key={s}>{s}</option>)}
          </select>
        </div>
        <div className="field"><label>Age</label><input type="number" value={f.age} onChange={upd("age")} /></div>
        <div className="field full"><label>Address</label><input value={f.addr} onChange={upd("addr")} /></div>
        <div className="field"><label>Contact No.</label><input value={f.contact} onChange={upd("contact")} /></div>
        <div className="field"><label>Fees (₹)</label><input type="number" value={f.fees} onChange={upd("fees")} /></div>
        <div className="field full"><label>Monthly Salary (₹)</label><input type="number" value={f.salary} onChange={upd("salary")} /></div>
      </div>
      <div style={{ display:"flex", gap:10, marginTop:20 }}>
        <button className="btn btn-glow" onClick={()=>{
          if(!f.name||!f.spec){return;}
          setDoctors(p=>[...p,{...f,age:+f.age,fees:+f.fees,salary:+f.salary}]);
          toast("Doctor added successfully!","ok"); onClose();
          setF({ name:"",spec:"",age:"",addr:"",contact:"",fees:"",salary:"" });
        }}>Save Doctor</button>
        <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
      </div>
    </Modal>
  );

  return <StaffPage title="Doctors" icon="⚕" data={doctors} columns={cols}
    onDelete={name=>{ setDoctors(p=>p.filter(d=>d.name!==name)); toast("Doctor removed.","ok"); }}
    FormModal={Form} />;
}

/* ─── NURSES PAGE ────────────────────────────────────────────────────────── */
function NursesPage({ nurses, setNurses, toast }) {
  const [f, setF] = useState({ name:"", age:"", addr:"", contact:"", salary:"" });
  const upd = k => e => setF(p=>({...p,[k]:e.target.value}));
  const cols = [
    { key:"name",    label:"Name",          render:v=><strong>{v}</strong> },
    { key:"age",     label:"Age" },
    { key:"addr",    label:"Address" },
    { key:"contact", label:"Contact" },
    { key:"salary",  label:"Monthly Salary",render:v=><Money v={v} /> },
  ];
  const Form = ({ onClose }) => (
    <Modal title="Add Nurse" onClose={onClose}>
      <div className="fgrid">
        <div className="field full"><label>Full Name</label><input value={f.name} onChange={upd("name")} /></div>
        <div className="field"><label>Age</label><input type="number" value={f.age} onChange={upd("age")} /></div>
        <div className="field"><label>Contact</label><input value={f.contact} onChange={upd("contact")} /></div>
        <div className="field full"><label>Address</label><input value={f.addr} onChange={upd("addr")} /></div>
        <div className="field"><label>Monthly Salary (₹)</label><input type="number" value={f.salary} onChange={upd("salary")} /></div>
      </div>
      <div style={{ display:"flex", gap:10, marginTop:20 }}>
        <button className="btn btn-glow" onClick={()=>{
          if(!f.name) return;
          setNurses(p=>[...p,{...f,age:+f.age,salary:+f.salary}]);
          toast("Nurse added!","ok"); onClose();
          setF({ name:"",age:"",addr:"",contact:"",salary:"" });
        }}>Save Nurse</button>
        <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
      </div>
    </Modal>
  );
  return <StaffPage title="Nurses" icon="♡" data={nurses} columns={cols}
    onDelete={name=>{ setNurses(p=>p.filter(n=>n.name!==name)); toast("Nurse removed.","ok"); }}
    FormModal={Form} />;
}

/* ─── WORKERS PAGE ───────────────────────────────────────────────────────── */
function WorkersPage({ workers, setWorkers, toast }) {
  const [f, setF] = useState({ name:"", age:"", addr:"", contact:"", salary:"" });
  const upd = k => e => setF(p=>({...p,[k]:e.target.value}));
  const cols = [
    { key:"name",    label:"Name",          render:v=><strong>{v}</strong> },
    { key:"age",     label:"Age" },
    { key:"addr",    label:"Address" },
    { key:"contact", label:"Contact" },
    { key:"salary",  label:"Monthly Salary",render:v=><Money v={v} /> },
  ];
  const Form = ({ onClose }) => (
    <Modal title="Add Support Staff" onClose={onClose}>
      <div className="fgrid">
        <div className="field full"><label>Full Name</label><input value={f.name} onChange={upd("name")} /></div>
        <div className="field"><label>Age</label><input type="number" value={f.age} onChange={upd("age")} /></div>
        <div className="field"><label>Contact</label><input value={f.contact} onChange={upd("contact")} /></div>
        <div className="field full"><label>Address</label><input value={f.addr} onChange={upd("addr")} /></div>
        <div className="field"><label>Monthly Salary (₹)</label><input type="number" value={f.salary} onChange={upd("salary")} /></div>
      </div>
      <div style={{ display:"flex", gap:10, marginTop:20 }}>
        <button className="btn btn-glow" onClick={()=>{
          if(!f.name) return;
          setWorkers(p=>[...p,{...f,age:+f.age,salary:+f.salary}]);
          toast("Staff member added!","ok"); onClose();
          setF({ name:"",age:"",addr:"",contact:"",salary:"" });
        }}>Save</button>
        <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
      </div>
    </Modal>
  );
  return <StaffPage title="Support Staff" icon="⚙" data={workers} columns={cols}
    onDelete={name=>{ setWorkers(p=>p.filter(w=>w.name!==name)); toast("Staff removed.","ok"); }}
    FormModal={Form} />;
}

/* ─── PATIENTS PAGE ──────────────────────────────────────────────────────── */
function PatientsPage({ patients, setPatients, doctors, toast }) {
  const [f, setF] = useState({ name:"", sex:"M", age:"", addr:"", contact:"", doctor:"" });
  const upd = k => e => setF(p=>({...p,[k]:e.target.value}));
  const [showAdmit, setShowAdmit] = useState(false);
  const [discharge, setDischarge] = useState(null);
  const [search, setSearch] = useState("");

  const filtered = patients.filter(p=>JSON.stringify(p).toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="page">
      <div className="ph fadeup">
        <div className="ph-left">
          <div className="ph-title">▣ Patients</div>
          <div className="ph-sub">{patients.length} currently admitted</div>
        </div>
        <div className="ph-right">
          <input className="search" placeholder="Search patients..." value={search} onChange={e=>setSearch(e.target.value)} />
          <button className="btn btn-glow" onClick={()=>setShowAdmit(true)}>+ Admit Patient</button>
        </div>
      </div>

      <div className="tbl-wrap fadeup2">
        <table>
          <thead><tr><th>Name</th><th>Sex</th><th>Age</th><th>Contact</th><th>Assigned Doctor</th><th>Admit Date</th><th>Action</th></tr></thead>
          <tbody>
            {filtered.length===0 && <tr className="empty-row"><td colSpan={7}>No patients found</td></tr>}
            {filtered.map((p,i)=>(
              <tr key={i}>
                <td><strong>{p.name}</strong></td>
                <td><SexBadge sex={p.sex} /></td>
                <td>{p.age}</td>
                <td style={{ color:"var(--muted)", fontSize:13 }}>{p.contact}</td>
                <td><span style={{ color:"var(--c3)" }}>⚕ {p.doctor}</span></td>
                <td><span className="bdg" style={{ background:"#0c1f4a", color:"var(--c4)" }}>{p.date}</span></td>
                <td><button className="btn btn-green btn-sm" onClick={()=>setDischarge(p)}>Discharge</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Admit Modal */}
      {showAdmit && (
        <Modal title="Admit New Patient" onClose={()=>setShowAdmit(false)}>
          {/* show doctors list first */}
          <div style={{ background:"var(--s2)", borderRadius:12, padding:14, marginBottom:20 }}>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:1.5, textTransform:"uppercase", color:"var(--muted)", marginBottom:10 }}>Available Doctors</div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
              {doctors.map(d=>(
                <span key={d.name} className="bdg" style={{ background:SPEC_META[d.spec]?.bg||"#1e293b", color:SPEC_META[d.spec]?.color||"#94a3b8", cursor:"pointer" }}
                  onClick={()=>setF(p=>({...p,doctor:d.name}))}>
                  {d.name}
                </span>
              ))}
            </div>
          </div>
          <div className="fgrid">
            <div className="field full"><label>Patient Full Name</label><input value={f.name} onChange={upd("name")} /></div>
            <div className="field"><label>Sex</label>
              <select value={f.sex} onChange={upd("sex")}>
                <option value="M">Male</option><option value="F">Female</option>
              </select>
            </div>
            <div className="field"><label>Age</label><input type="number" value={f.age} onChange={upd("age")} /></div>
            <div className="field full"><label>Address</label><input value={f.addr} onChange={upd("addr")} /></div>
            <div className="field"><label>Contact</label><input value={f.contact} onChange={upd("contact")} /></div>
            <div className="field full"><label>Assign Doctor</label>
              <select value={f.doctor} onChange={upd("doctor")}>
                <option value="">Select doctor...</option>
                {doctors.map(d=><option key={d.name} value={d.name}>{d.name} ({d.spec})</option>)}
              </select>
            </div>
          </div>
          <div style={{ display:"flex", gap:10, marginTop:20 }}>
            <button className="btn btn-glow" onClick={()=>{
              if(!f.name||!f.doctor) return;
              setPatients(p=>[...p,{...f, age:+f.age, date:new Date().toISOString().split("T")[0]}]);
              toast("Patient admitted!","ok"); setShowAdmit(false);
              setF({ name:"",sex:"M",age:"",addr:"",contact:"",doctor:"" });
            }}>Confirm Admission</button>
            <button className="btn btn-ghost" onClick={()=>setShowAdmit(false)}>Cancel</button>
          </div>
        </Modal>
      )}

      {/* Discharge Modal */}
      {discharge && (
        <Modal title="Discharge Patient" onClose={()=>setDischarge(null)} width={420}>
          <div style={{ background:"#071e0f", border:"1px solid #16a34a55", borderRadius:12, padding:18, marginBottom:20 }}>
            <div style={{ fontSize:16, fontWeight:700, marginBottom:8 }}>{discharge.name}</div>
            <div style={{ fontSize:13, color:"var(--muted)" }}>Doctor: {discharge.doctor}</div>
            <div style={{ fontSize:13, color:"var(--muted)" }}>Admitted: {discharge.date}</div>
          </div>
          <p style={{ color:"var(--muted)", fontSize:14, marginBottom:20 }}>Confirm that all bills are cleared before discharge.</p>
          <div style={{ display:"flex", gap:10 }}>
            <button className="btn btn-green" onClick={()=>{
              setPatients(p=>p.filter(pt=>pt.name!==discharge.name));
              toast(`${discharge.name} discharged.`,"ok"); setDischarge(null);
            }}>✓ Confirm Discharge</button>
            <button className="btn btn-ghost" onClick={()=>setDischarge(null)}>Cancel</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

/* ─── APPOINTMENTS PAGE ──────────────────────────────────────────────────── */
function AppointmentsPage({ doctors }) {
  const [filter, setFilter] = useState("ALL");
  const [booking, setBooking] = useState(null);
  const [confirmed, setConfirmed] = useState(null);

  const specs = [...new Set(doctors.map(d=>d.spec))];
  const shown = filter==="ALL" ? doctors : doctors.filter(d=>d.spec===filter);

  const confirm = (doc) => {
    const m = SPEC_META[doc.spec] || { floor:1, days:3 };
    setConfirmed({ doc, date:addDays(m.days), floor:m.floor });
    setBooking(null);
  };

  return (
    <div className="page">
      <div className="ph fadeup">
        <div className="ph-left">
          <div className="ph-title">◷ Book Appointment</div>
          <div className="ph-sub">Choose a specialist and schedule your visit</div>
        </div>
      </div>

      {confirmed && (
        <div className="apt-confirm-panel fadeup">
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
            <span style={{ fontSize:22 }}>✅</span>
            <span style={{ fontFamily:"var(--display)", fontWeight:800, fontSize:18, color:"var(--c3)" }}>Appointment Confirmed!</span>
          </div>
          <div style={{ fontSize:15, fontWeight:600, marginBottom:6 }}>{confirmed.doc.name}</div>
          <div style={{ display:"flex", gap:20, flexWrap:"wrap" }}>
            <span style={{ fontSize:13, color:"var(--muted)" }}>📅 {confirmed.date}</span>
            <span style={{ fontSize:13, color:"var(--muted)" }}>🏥 Floor {confirmed.floor}</span>
            <span style={{ fontSize:13, color:"var(--c2)", fontWeight:600 }}>₹{confirmed.doc.fees} consultation</span>
          </div>
          <button className="btn btn-outline" style={{ marginTop:16, fontSize:13 }} onClick={()=>setConfirmed(null)}>Book Another →</button>
        </div>
      )}

      <div className="chips fadeup2">
        {["ALL",...specs].map(s=>(
          <div key={s} className={`chip ${filter===s?"on":""}`} onClick={()=>setFilter(s)}>{s}</div>
        ))}
      </div>

      <div className="apt-grid fadeup3">
        {shown.map((doc,i)=>{
          const m = SPEC_META[doc.spec] || { color:"#94a3b8", bg:"#1e293b", emoji:"⚕", floor:1, days:3 };
          return (
            <div key={i} className="apt-card" style={{ "--agrad":`linear-gradient(135deg,${m.color},transparent)`, "--ashadow":`${m.color}44`, color:m.color, background:`${m.bg}`, borderColor:`${m.color}33` }}
              onClick={()=>setBooking(doc)}>
              <div className="apt-emoji">{m.emoji}</div>
              <div className="apt-spec" style={{ color:m.color, opacity:.8 }}>{doc.spec}</div>
              <div className="apt-doc">{doc.name}</div>
              <div className="apt-meta">Age {doc.age} · Floor {m.floor}</div>
              <div style={{ marginTop:12, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <span className="bdg" style={{ background:`${m.color}22`, color:m.color }}>Next: {addDays(m.days)}</span>
                <span style={{ fontSize:13, fontWeight:700, color:"var(--c2)" }}>₹{doc.fees}</span>
              </div>
            </div>
          );
        })}
        {shown.length===0 && <div style={{ color:"var(--muted)", padding:32 }}>No doctors found.</div>}
      </div>

      {booking && (
        <Modal title="Confirm Appointment" onClose={()=>setBooking(null)} width={420}>
          {(() => {
            const m = SPEC_META[booking.spec] || { color:"#94a3b8", bg:"#1e293b", emoji:"⚕", floor:1, days:3 };
            return (
              <div>
                <div style={{ background:m.bg, border:`1px solid ${m.color}44`, borderRadius:14, padding:20, marginBottom:24 }}>
                  <div style={{ fontSize:28, marginBottom:10 }}>{m.emoji}</div>
                  <div style={{ fontFamily:"var(--display)", fontSize:18, fontWeight:800, marginBottom:4 }}>{booking.name}</div>
                  <SpecBadge spec={booking.spec} />
                  <div style={{ marginTop:14, display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                    <div style={{ fontSize:13, color:"var(--muted)" }}>📅 {addDays(m.days)}</div>
                    <div style={{ fontSize:13, color:"var(--muted)" }}>🏥 Floor {m.floor}</div>
                    <div style={{ fontSize:13, color:"var(--c2)", fontWeight:700 }}>₹{booking.fees} fees</div>
                    <div style={{ fontSize:13, color:"var(--muted)" }}>📞 {booking.contact}</div>
                  </div>
                </div>
                <div style={{ display:"flex", gap:10 }}>
                  <button className="btn btn-glow" onClick={()=>confirm(booking)}>✓ Book Appointment</button>
                  <button className="btn btn-ghost" onClick={()=>setBooking(null)}>Cancel</button>
                </div>
              </div>
            );
          })()}
        </Modal>
      )}
    </div>
  );
}

/* ─── ROOT APP ───────────────────────────────────────────────────────────── */
export default function App() {
  const [screen, setScreen] = useState("landing"); // landing | login | app
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("dash");
  const [doctors,  setDoctors]  = useState(SEED_DOCTORS);
  const [nurses,   setNurses]   = useState(SEED_NURSES);
  const [workers,  setWorkers]  = useState(SEED_WORKERS);
  const [patients, setPatients] = useState(SEED_PATIENTS);
  const [toastData, setToastData] = useState(null);

  const toast = (msg, type="ok") => setToastData({ msg, type });

  const counts = { doctors:doctors.length, nurses:nurses.length, workers:workers.length, patients:patients.length };

  const renderPage = () => {
    switch(page) {
      case "dash":         return <Dashboard doctors={doctors} nurses={nurses} workers={workers} patients={patients} />;
      case "doctors":      return <DoctorsPage doctors={doctors} setDoctors={setDoctors} toast={toast} />;
      case "nurses":       return <NursesPage nurses={nurses} setNurses={setNurses} toast={toast} />;
      case "workers":      return <WorkersPage workers={workers} setWorkers={setWorkers} toast={toast} />;
      case "patients":     return <PatientsPage patients={patients} setPatients={setPatients} doctors={doctors} toast={toast} />;
      case "appointments": return <AppointmentsPage doctors={doctors} />;
      default: return null;
    }
  };

  return (
    <>
      <style>{G}</style>
      {screen==="landing" && <Landing onEnter={()=>setScreen("login")} />}
      {screen==="login" && <Login onLogin={u=>{ setUser(u); setScreen("app"); }} onBack={()=>setScreen("landing")} />}
      {screen==="app" && (
        <div className="shell">
          <Sidebar page={page} setPage={setPage} user={user} counts={counts}
            onLogout={()=>{ setUser(null); setScreen("landing"); }} />
          <div className="main">{renderPage()}</div>
        </div>
      )}
      {toastData && <Toast msg={toastData.msg} type={toastData.type} onClose={()=>setToastData(null)} />}
    </>
  );
}
