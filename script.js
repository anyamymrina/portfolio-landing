(() => {
  const container = document.querySelector('.start-words');
  if (!container) return;

  const words = container.querySelectorAll('.start-word');

  words.forEach((w) => {
    w.addEventListener('mouseenter', () => {
      words.forEach((x) => x.classList.toggle('is-active', x === w));
    });
    w.addEventListener('mouseleave', () => {
      w.classList.remove('is-active');
    });
  });
})();

(() => {
  const flipBoxes = document.querySelectorAll('.flip-box');
  if (!flipBoxes) return;

  const CLICK_THRESHOLD = 200;
  const THROTTLE_TIME = 400;
  let mouseDownTime = 0;
  let lastToggleTime = 0;

  flipBoxes.forEach((flipBox) => {
    flipBox.addEventListener('mousedown', () => {
      mouseDownTime = Date.now();

      flipBox.classList.add('flip-box--entered');
    });

    flipBox.addEventListener('mouseup', (e) => {
      if (e.button !== 0) return;

      const mouseUpTime = Date.now();
      const clickDuration = mouseUpTime - mouseDownTime;

      if (clickDuration > CLICK_THRESHOLD) return;

      flipBox.classList.toggle('flip-box--flipped');
      flipBox.classList.remove('flip-box--entered');
      lastToggleTime = Date.now();
    });

    flipBox.addEventListener('mouseleave', (e) => {
      if (flipBox.classList.contains('flip-box--entered')) {
        flipBox.classList.remove('flip-box--entered');

        return;
      }

      const mouseLeaveTime = Date.now();
      const deltaTime = mouseLeaveTime - lastToggleTime;

      if (deltaTime < THROTTLE_TIME) return;

      flipBox.classList.remove('flip-box--flipped');
    });
  });
})();
