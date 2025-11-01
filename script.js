document.addEventListener('DOMContentLoaded', () => {

// --- Audio Button Setup ---
  function setupAudioButton(buttonId, audioId) {
      const button = document.getElementById(buttonId);
      const audio = document.getElementById(audioId);
      if (!button || !audio) return;

      // --- Create Volume Slider ---
      const slider = document.createElement('input');
      slider.type = 'range';
      slider.min = '0';
      slider.max = '1';
      slider.step = '0.01';
      slider.value = '1'; // Default volume
      slider.className = 'volume-slider';
      
      // Insert slider into the container, after the button
      button.parentNode.insertBefore(slider, button.nextSibling);

      // Add event listener to change volume
      slider.addEventListener('input', (e) => {
          audio.volume = e.target.value;
      });

      // --- Play/Pause Logic ---
      let isPlaying = false;
      button.addEventListener('click', (e) => {
          e.preventDefault(); e.stopPropagation();
          if (!isPlaying) {
              audio.play().then(() => {
                  isPlaying = true;
                  button.textContent = 'Pause Audio';
              }).catch(error => {
                  console.error('Audio playback failed:', error);
                  isPlaying = false;
                  button.textContent = 'Play Audio';
              });
          } else {
              audio.pause();
              isPlaying = false;
              button.textContent = 'Play Audio';
          }
      });
  }
  setupAudioButton('play-home-audio', 'home-audio');
  setupAudioButton('play-about-audio', 'about-audio');


  // ---------------------------------
  // STARFIELD ANIMATION ENGINE
  // ---------------------------------
  const canvas = document.getElementById('starfield-canvas');
  if (canvas) {
      const ctx = canvas.getContext('2d');
      let width, height;
      let stars = [];
      const starCount = 1000;
      const speed = 1.5;

      function Star() {
          this.x = Math.random() * width - width / 2;
          this.y = Math.random() * height - height / 2;
          this.z = Math.random() * width;
          this.update = function() {
              this.z = this.z - speed;
              if (this.z < 1) {
                  this.z = width;
                  this.x = Math.random() * width - width / 2;
                  this.y = Math.random() * height - height / 2;
              }
          };
          this.draw = function() {
              const x = (this.x / this.z) * width / 2 + width / 2;
              const y = (this.y / this.z) * height / 2 + height / 2;
              const radius = Math.max(0, (1 - this.z / width) * 1.5);
              ctx.beginPath();
              ctx.arc(x, y, radius, 0, Math.PI * 2);
              ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
              ctx.fill();
          };
      }

      function resize() {
          width = window.innerWidth;
          height = window.innerHeight;
          canvas.width = width;
          canvas.height = height;
          ctx.translate(width / 2, height / 2);
      }

      function animate() {
          ctx.clearRect(-width / 2, -height / 2, width, height);
          for (let star of stars) {
              star.update();
              star.draw();
          }
          requestAnimationFrame(animate);
      }

      function init() {
          resize();
          for (let i = 0; i < starCount; i++) {
              stars.push(new Star());
          }
          animate();
      }

      window.addEventListener('resize', resize);
      init();
  }

}); // End of DOMContentLoaded
