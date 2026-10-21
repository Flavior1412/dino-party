import { useEffect } from 'react';

export default function useScrollMotion(containerRef) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let stopMotion = () => {};

    function setup() {
      stopMotion();
      if (preference.matches) return;

      const sections = [...container.querySelectorAll(':scope > section')];
      const dinosaurs = [...container.querySelectorAll('.scroll-dino')];
      let frame = null;
      let observer;

      function reveal(section) {
        section.classList.remove('section-pending');
        observer?.unobserve(section);
      }

      // Chỉ ẩn phần chưa vào màn hình; nội dung đầu trang luôn hiện ngay.
      if ('IntersectionObserver' in window) {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) reveal(entry.target);
            });
          },
          { threshold: 0, rootMargin: '0px 0px -24px 0px' },
        );
        sections.forEach((section) => {
          section.classList.add('section-reveal');
          if (section.getBoundingClientRect().top >= window.innerHeight) {
            section.classList.add('section-pending');
            observer.observe(section);
          }
        });
      }

      function updateDinosaurs() {
        frame = null;
        const viewportHeight = window.innerHeight;
        dinosaurs.forEach((dino) => {
          const bounds = dino.parentElement.getBoundingClientRect();
          if (bounds.bottom < 0 || bounds.top > viewportHeight) return;
          const progress = Math.max(
            -1,
            Math.min(
              1,
              (viewportHeight / 2 - bounds.top - bounds.height / 2) / (viewportHeight / 2),
            ),
          );
          dino.style.setProperty('--dino-x', `${(progress * 18).toFixed(2)}px`);
          dino.style.setProperty('--dino-y', `${(progress * -12).toFixed(2)}px`);
        });
      }

      function scheduleUpdate() {
        if (frame === null) frame = window.requestAnimationFrame(updateDinosaurs);
      }

      // Tab đến một nút cũng làm hiện phần chứa nút đó.
      function handleFocus(event) {
        const section = event.target.closest('.section-pending');
        if (section) reveal(section);
      }

      window.addEventListener('scroll', scheduleUpdate, { passive: true });
      window.addEventListener('resize', scheduleUpdate);
      container.addEventListener('focusin', handleFocus);
      updateDinosaurs();

      stopMotion = () => {
        observer?.disconnect();
        if (frame !== null) window.cancelAnimationFrame(frame);
        window.removeEventListener('scroll', scheduleUpdate);
        window.removeEventListener('resize', scheduleUpdate);
        container.removeEventListener('focusin', handleFocus);
        sections.forEach((section) => {
          section.classList.remove('section-reveal', 'section-pending');
        });
        dinosaurs.forEach((dino) => {
          dino.style.removeProperty('--dino-x');
          dino.style.removeProperty('--dino-y');
        });
      };
    }

    setup();
    preference.addEventListener('change', setup);
    return () => {
      preference.removeEventListener('change', setup);
      stopMotion();
    };
  }, [containerRef]);
}
