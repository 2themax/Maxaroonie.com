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


  // Background animation effect
  const body = document.body;
  const colors = ['#1a1a2e', '#16213e', '#0f3460', '#442b48', '#251b37', '#113537', '#1c2b2d'];
  let currentIndex = 0;

  // Change background color smoothly
  setInterval(() => {
      const nextIndex = (currentIndex + 1) % colors.length;
      body.style.background = `linear-gradient(45deg, ${colors[currentIndex]}, ${colors[nextIndex]})`;
      body.style.transition = 'background 3s ease';
      currentIndex = nextIndex;
  }, 8000);

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
});
