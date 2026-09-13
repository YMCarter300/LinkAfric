const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => navLinks.classList.toggle("open"));
}

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => navLinks?.classList.remove("open"));
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

// --- Contact form → WhatsApp ---
document.addEventListener('DOMContentLoaded', function () {
  const WHATSAPP_NUMBER = '447570190890'; // digits only — no +, no spaces

  const form = document.querySelector('[data-contact-form]');
  if (!form) return;

  const statusEl = form.querySelector('.form-status');

  function setStatus(msg) {
    if (statusEl) statusEl.textContent = msg || '';
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // FormData avoids the form.name / form.email DOM trap
    const data    = new FormData(form);
    const name    = (data.get('name')    || '').trim();
    const email   = (data.get('email')   || '').trim();
    const company = (data.get('company') || '').trim();
    const message = (data.get('message') || '').trim();

    if (!name) {
      setStatus('Please enter your name.');
      return;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('Please enter a valid email address.');
      return;
    }
    if (!message) {
      setStatus('Please tell us about your project.');
      return;
    }

    const lines = [
      '*New Project Enquiry*',
      '',
      '*Name:* ' + name,
      '*Email:* ' + email
    ];
    if (company) lines.push('*Company:* ' + company);
    lines.push('', '*Message:*', message);

    const url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(lines.join('\n'));

    setStatus('Opening WhatsApp…');

    // Open in new tab; fall back to same tab only if truly blocked
    const win = window.open(url, '_blank');
    if (win) { win.opener = null;               // sever opener manually — same security as 'noopener'
    } else { window.location.href = url;      // popup was genuinely blocked
    }
  });
});