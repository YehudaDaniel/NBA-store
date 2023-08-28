const video = document.getElementById('background-video');
const overlay = document.getElementById('video-overlay');

video.addEventListener('timeupdate', () => {
  const scrollPoint = 10; // נקודת הגלילה שבה נעצור את הוידאו
  if (video.currentTime >= scrollPoint) {
    video.pause();
    overlay.style.display = 'block';
  }
});
