body { background-color: #000000; }

<img src="Screenshot 2023-02-14 1.01.39 PM" style="width:100%; height:auto;" />
<p>Hello, world!</p>

<img src="IMG_4195.GIF" style="display:block; autoplay: true; loop: true; preload: auto; width: 450px; height: 600px;" />

<script>
window.onload = function() {
  // Trigger animation
  document.querySelector("img").play();
}
</script>

<audio src="Audio 1.m4a" autoplay loop> </audio>
<button onclick="playAudioLoop()">Play Audio</button>

<audio id="audio" src="Audio 1.m4a" loop="true"></audio>

<script>
function playAudioLoop() {
  // Play audio
  var audio = document.getElementById("audio"); 
  audio.play();
}
</script>
