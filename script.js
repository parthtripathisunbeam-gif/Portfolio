
// Footer year
document.addEventListener('DOMContentLoaded', () => {
  const yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();
});

// --- Typing effect: loops the word "Student"
(function typingEffect(){
  const el = document.getElementById('typeTarget');
  if(!el) return;
  const text = "Student";
  const speed = 90;      // ms per character
  const pause = 700;     // pause at full word
  const erase = 60;      // ms per backspace
  let i = 0, dir = 1;    // 1 = typing, -1 = deleting

  function step(){
    if(dir === 1){
      el.textContent = text.slice(0, i++);
      if(i <= text.length) return setTimeout(step, speed);
      dir = -1;
      return setTimeout(step, pause);
    } else {
      el.textContent = text.slice(0, i--);
      if(i >= 0) return setTimeout(step, erase);
      dir = 1; i = 0;
      return setTimeout(step, 250);
    }
  }
  step();
})();

// --- Creative progress bars (observe + animate)
const skillObserver = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      const box = entry.target;
      const pct = parseInt(box.getAttribute('data-progress')||'0',10);
      box.style.setProperty('--pct', pct);
      if(!box.querySelector('.bubble')){
        const b = document.createElement('div');
        b.className = 'bubble';
        b.textContent = pct + '%';
        box.appendChild(b);
      }
      skillObserver.unobserve(box);
    }
  });
},{threshold:0.35});

document.querySelectorAll('.skill2').forEach(el=>skillObserver.observe(el));

// --- Feedback modal
const form = document.getElementById('feedbackForm');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('closeModal');

if(form){
  form.addEventListener('submit', e=>{
    e.preventDefault();
    if(modal) modal.classList.remove('hidden');
    form.reset();
  });
}
if(closeModal){ closeModal.addEventListener('click', ()=> modal.classList.add('hidden')); }
if(modal){ modal.addEventListener('click', e=>{ if(e.target===modal) modal.classList.add('hidden'); }); }

// --- Smooth page exit on internal links
document.querySelectorAll('a[href]').forEach(a=>{
  const href = a.getAttribute('href');
  if(href && !href.startsWith('#') && !href.startsWith('http')){
    a.addEventListener('click', e=>{
      e.preventDefault();
      document.documentElement.classList.add('is-exiting');
      setTimeout(()=>{ window.location.href = href; },180);
    });
  }
});
function checkDesktopView() {
  let minDesktopWidth = 1024; // adjust as needed
  let existingWarning = document.getElementById("desktop-warning");

  if (window.innerWidth < minDesktopWidth) {
    // if warning not already shown
    if (!existingWarning) {
      document.body.innerHTML = "";

      let warning = document.createElement("div");
      warning.id = "desktop-warning";
      warning.style.position = "fixed";
      warning.style.top = "0";
      warning.style.left = "0";
      warning.style.width = "100%";
      warning.style.height = "100%";
      warning.style.background = "#111";
      warning.style.color = "#fff";
      warning.style.display = "flex";
      warning.style.justifyContent = "center";
      warning.style.alignItems = "center";
      warning.style.fontSize = "1.5rem";
      warning.style.textAlign = "center";
      warning.style.padding = "20px";
      warning.innerText = "⚠️ Please open the web page in Desktop or Laptop ";

      document.body.appendChild(warning);
    }
  } else {
    // reload page if resized back to desktop view
    if (existingWarning) {
      location.reload();
    }
  }
}

// Run check on load
document.addEventListener("DOMContentLoaded", checkDesktopView);

// Run check on resize
window.addEventListener("resize", checkDesktopView);

  


