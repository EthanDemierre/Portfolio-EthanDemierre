<template>
  <page-nav />

  <iframe
    class="cables-iframe"
    allow="autoplay;"
    src="https://cables.gl/view/tduqhJ"
  ></iframe>

  <main class="page-main">
    <section class="hero-content">
      <div class="hero-text">
        <div class="name-section">
          <img src="/img/fleur.svg" alt="fleur" class="flower-icon">
          <h1>Ethan Demierre</h1>
        </div>
        <div class="role-box">
          <h4>Interactive Media Designer.</h4>
        </div>
      </div>
    </section>

    <section class="quote-section">
      <p><b>factotum</b> \fak.tɔ.tɔm\</p>
      <p>
        Emprunté au latin de la Renaissance <b>factotum</b> («fais tout»),
        du latin facere («faire») et <b>totum</b> («tout»).
      </p>
    </section>
  </main>
</template>

<script>
export default {
  mounted() {
    const iframe = document.querySelector('.cables-iframe');
    if (iframe) {
      iframe.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent('mousedown', {
          bubbles: true,
          cancelable: true,
          view: window,
          clientX: touch.clientX,
          clientY: touch.clientY
        });
        iframe.dispatchEvent(mouseEvent);
      });

      iframe.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent('mousemove', {
          bubbles: true,
          cancelable: true,
          view: window,
          clientX: touch.clientX,
          clientY: touch.clientY
        });
        iframe.dispatchEvent(mouseEvent);
      });

      iframe.addEventListener('touchend', (e) => {
        e.preventDefault();
        const mouseEvent = new MouseEvent('mouseup', {
          bubbles: true,
          cancelable: true,
          view: window
        });
        iframe.dispatchEvent(mouseEvent);
      });
    }
  }
};
</script>

<style scoped>
.cables-iframe {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  border: 0;
  z-index: 2;
  pointer-events: auto;
  touch-action: auto;
}

@media (hover: none) and (pointer: coarse) {
  .cables-iframe {
    pointer-events: auto !important;
    touch-action: manipulation;
  }
}

@media (max-width: 768px) {
  .cables-iframe {
    display: none;
  }
}

.page-main {
  position: relative;
  z-index: 20;
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  padding: 2rem;
  border: 1rem solid var(--blue);
  pointer-events: none;
}

.page-main > * {
  pointer-events: auto;
}

@media (max-width: 1440px) {
  .page-main {
    padding: 1.75rem;
    border-width: 0.9rem;
  }
}

@media (max-width: 1024px) {
  .page-main {
    padding: 1.5rem;
    border-width: 0.75rem;
  }
}

@media (max-width: 768px) {
  .page-main {
    padding: 1rem;
    border-width: 0.5rem;
  }
}

@media (max-width: 480px) {
  .page-main {
    padding: 0.75rem;
    border-width: 0.35rem;
  }
}

.hero-content {
  grid-column: 4 / span 6;
  grid-row: 6 / span 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  pointer-events: auto;
}

@media (max-width: 1440px) {
  .hero-content {
    grid-column: 4 / span 5;
    grid-row: 5 / span 3;
  }
}

@media (max-width: 1024px) {
  .hero-content {
    grid-column: 3 / span 7;
    grid-row: 5 / span 3;
  }
}

@media (max-width: 768px) {
  .hero-content {
    grid-column: 2 / span 10;
    grid-row: 4 / span 4;
  }
}

@media (max-width: 480px) {
  .hero-content {
    grid-column: 1 / -1;
    grid-row: 2 / span 5;
    padding: 1rem;
  }
}

.hero-text {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0;
  align-items: center;
  text-align: center;
}

.name-section {
  position: relative;
  display: inline-block;
  width: 100%;
}

.flower-icon {
  position: absolute;
  width: 8rem;
  height: 8rem;
  top: -1.5rem;
  left: 2.5rem;
  z-index: 2;
}

@media (max-width: 1440px) {
  .flower-icon {
    width: 7.5rem;
    height: 7.5rem;
    left: 2.25rem;
  }
}

@media (max-width: 1024px) {
  .flower-icon {
    width: 6.5rem;
    height: 6.5rem;
    left: 2rem;
  }
}

@media (max-width: 768px) {
  .flower-icon {
    width: 5rem;
    height: 5rem;
    left: 1.5rem;
    top: -1rem;
  }
}

@media (max-width: 480px) {
  .flower-icon {
    position: fixed;
    width: 3rem;
    height: 3rem;
    top: 0.75rem;
    left: 1.1rem;
    z-index: 30;
  }
}

.role-box {
  display: inline-block;
  padding: 1.3rem;
  border: 1px solid;
  width: 33%;
  background-color: white;
  margin-top: 1.5rem;
  text-align: center;
}

@media (max-width: 1440px) {
  .role-box {
    margin-top: 1.2rem;
  }
}

@media (max-width: 1024px) {
  .role-box {
    width: 40%;
    padding: 1.1rem;
    margin-top: 1rem;
  }
}

@media (max-width: 768px) {
  .role-box {
    width: 55%;
    padding: 1rem;
    margin-top: 0.8rem;
  }
}

@media (max-width: 480px) {
  .role-box {
    width: 90%;
    padding: 0.75rem;
    margin-top: 0.75rem;
  }
}

.quote-section {
  grid-column: 10 / span 3;
  grid-row: 10 / span 2;
  align-self: end;
  justify-self: start;
  pointer-events: auto;
}

@media (max-width: 1440px) {
  .quote-section {
    grid-column: 9 / span 4;
    grid-row: 10 / span 2;
  }
}

@media (max-width: 1024px) {
  .quote-section {
    grid-column: 8 / span 5;
    grid-row: 9 / span 2;
  }
}

@media (max-width: 768px) {
  .quote-section {
    grid-column: 1 / span 12;
    grid-row: 8 / span 2;
    align-self: auto;
    justify-self: auto;
  }
}

@media (max-width: 480px) {
  .quote-section {
    grid-column: 1 / -1;
    grid-row: 8 / span 3;
    padding: 0 1rem;
  }
}

.quote-section p {
  width: 75%;
  margin-bottom: 0.5rem;
  font-size: 0.8rem;
  text-align: left;
}

@media (max-width: 1024px) {
  .quote-section p {
    width: 85%;
    font-size: 0.8rem;
  }
}

@media (max-width: 768px) {
  .quote-section p {
    width: 100%;
    font-size: 0.75rem;
  }
}

@media (max-width: 480px) {
  .quote-section p {
    width: 100%;
    font-size: 0.7rem;
    margin-bottom: 0.25rem;
  }
}
</style>
