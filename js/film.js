// Hero film: muted autoplay, played once, with pause and sound buttons.
// With reduced motion it starts paused; the Play button starts it.
(function () {
  const video = document.querySelector('[data-film]');
  if (!video || !video.querySelector('source')) return;

  const play = document.querySelector('[data-film-play]');
  const sound = document.querySelector('[data-film-sound]');

  function sync() {
    play.textContent = video.paused ? 'Play' : 'Pause';
    sound.textContent = video.muted ? 'Sound on' : 'Sound off';
  }

  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    video.removeAttribute('autoplay');
    video.pause();
  }

  // play() after the end starts the film again from the top.
  play.addEventListener('click', () => (video.paused ? video.play() : video.pause()));
  sound.addEventListener('click', () => {
    video.muted = !video.muted;
    // Turning the sound on means they want to watch: start from the top.
    if (!video.muted) { video.currentTime = 0; video.play(); }
  });
  ['play', 'pause', 'ended', 'volumechange'].forEach((e) => video.addEventListener(e, sync));
  sync();
})();
