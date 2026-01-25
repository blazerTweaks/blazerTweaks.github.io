// script.js
document.addEventListener('DOMContentLoaded', function () {
  // 1. ENVOLVE LETRAS DO USERNAME EM <span> + ADICIONA HOVER
  document.querySelectorAll('.username-text').forEach(el => {
    const text = el.textContent;
    el.innerHTML = '';
    for (const char of text) {
      const span = document.createElement('span');
      span.innerHTML = char === ' ' ? '&nbsp;' : char;
      span.style.display = 'inline-block';
      span.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2)';
      
      // 👇 ALTERE AQUI O VALOR DE SCALE
      span.addEventListener('mouseenter', () => {
        span.style.transform = 'scale(1.15)'; // ← ajuste este número
      });
      span.addEventListener('mouseleave', () => {
        span.style.transform = 'scale(1)';
      });
      
      el.appendChild(span);
    }
  });

  // 2. EFEITO NO AVATAR
  const avatar = document.querySelector('.avatar');
  if (avatar) {
    avatar.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2)';
    avatar.addEventListener('mouseenter', () => {
      avatar.style.transform = 'scale(1.05)';
    });
    avatar.addEventListener('mouseleave', () => {
      avatar.style.transform = 'scale(1)';
    });
  }

  // 3. EFEITO NOS ÍCONES (opcional, se não estiver no CSS)
  document.querySelectorAll('.social-icon').forEach(icon => {
    icon.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2)';
    icon.addEventListener('mouseenter', () => {
      icon.style.transform = 'scale(1.1)';
    });
    icon.addEventListener('mouseleave', () => {
      icon.style.transform = 'scale(1)';
    });
  });
});

// script.js
document.addEventListener('DOMContentLoaded', function () {
  const originalTitle = 'interlude';
  let index = 1; // Começa com "i"
  let isDeleting = false;
  const speed = 700;        // Velocidade entre letras
  const pauseAtEnd = 1200;  // Pausa quando completo
  const pauseAtStart = 800; // Pausa quando só tem "i"

  function animateTitle() {
    if (isDeleting) {
      // Apagando: vai de "interlude" até "i"
      document.title = originalTitle.slice(0, index);
      index--;

      if (index < 1) {
        // Chegou em "i" → começa a escrever
        index = 1;
        isDeleting = false;
        setTimeout(animateTitle, pauseAtStart);
        return;
      }
    } else {
      // Escrevendo: vai de "i" até "interlude"
      document.title = originalTitle.slice(0, index);
      index++;

      if (index > originalTitle.length) {
        // Chegou ao final → começa a apagar
        isDeleting = true;
        setTimeout(animateTitle, pauseAtEnd);
        return;
      }
    }

    setTimeout(animateTitle, speed);
  }

  animateTitle();
});

document.querySelectorAll('.social-icon, .avatar').forEach(el => {
  el.addEventListener('touchstart', () => {
    el.style.transform = 'scale(0.95)';
  });
  el.addEventListener('touchend', () => {
    el.style.transform = 'scale(1)';
  });
});