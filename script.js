document.addEventListener('DOMContentLoaded', () => {

  function setupAudioButton(buttonId, audioId) {
      const button = document.getElementById(buttonId);
      const audio = document.getElementById(audioId);

      if (!button || !audio) {
          console.error(`Audio elements not found for button ID: ${buttonId}, audio ID: ${audioId}`);
          return;
      }

      let isPlaying = false;

      // Button click feedback
      button.addEventListener('mousedown', () => {
          button.style.transform = 'scale(0.95)';
      });

      button.addEventListener('mouseup', () => {
          button.style.transform = 'scale(1)';
      });

      button.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();

          if (!isPlaying) {
              audio.play()
                  .then(() => {
                      isPlaying = true;
                      button.textContent = 'Pause Audio';
                  })
                  .catch(error => {
                      console.error('Audio playback failed:', error);
                      alert('Could not play audio: ' + error.message);
                      isPlaying = false;
                      button.textContent = 'Play Audio'; // Correct the text on failure
                  });
          } else {
              audio.pause();
              isPlaying = false;
              button.textContent = 'Play Audio';
          }
      });

      // Create volume control
      const volumeControl = document.createElement('input');
      volumeControl.type = 'range';
      volumeControl.min = 0;
      volumeControl.max = 1;
      volumeControl.step = 0.1;
      volumeControl.value = 0.5;
      volumeControl.className = 'volume-slider';

      volumeControl.addEventListener('input', () => {
          audio.volume = volumeControl.value;
      });

      // Insert volume control after the button
      button.parentNode.insertBefore(volumeControl, button.nextSibling);
  }

  setupAudioButton('play-home-audio', 'home-audio');
  setupAudioButton('play-about-audio', 'about-audio');


  // Add subtle header animation on scroll
  const header = document.querySelector('header');
  if (header) {
      window.addEventListener('scroll', () => {
          const scrollValue = window.scrollY;
          if (scrollValue > 50) {
              header.style.backgroundColor = 'rgba(17, 17, 17, 0.95)';
              header.style.boxShadow = '0 4px 10px rgba(0,0,0,0.3)';
          } else {
              header.style.backgroundColor = '#111';
              header.style.boxShadow = 'none';
          }
      });
  }

  // Check for image load errors
  const images = document.querySelectorAll('img');
  images.forEach(img => {
      img.addEventListener('error', () => {
          img.src = 'placeholder-image.jpg'; // Replace with a placeholder
          img.alt = 'Image not found';
      });
  });
// ---------------------------------
  // STARFIELD ANIMATION ENGINE
  // ---------------------------------
  const canvas = document.getElementById('starfield-canvas');
  if (canvas) {
      const ctx = canvas.getContext('2d');

      let width, height;
      let stars = [];
      const starCount = 1000; // Number of stars
      const speed = 1.5;     // Speed of stars

      // Star object
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
              ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'; // Star color
              ctx.fill();
          };
      }

      // Resize canvas to fill window
      function resize() {
          width = window.innerWidth;
          height = window.innerHeight;
          canvas.width = width;
          canvas.height = height;
          ctx.translate(width / 2, height / 2); // Center the origin
      }

      // Animation loop
      function animate() {
          ctx.clearRect(-width / 2, -height / 2, width, height); // Clear canvas
          
          for (let star of stars) {
              star.update();
              star.draw();
          }
          
          requestAnimationFrame(animate); // High-performance loop
      }

      // Initialization
      function init() {
          resize(); // Set initial size
          
          // Create stars
          for (let i = 0; i < starCount; i++) {
              stars.push(new Star());
          }
          
          animate(); // Start animation
      }

      window.addEventListener('resize', resize); // Re-run resize on window change
      init();
  }});
