const video = document.getElementsByTagName('video')[0];
const controls = document.getElementsByClassName('player__controls')[0];
const sliderVolume = document.getElementsByName('volume')[0];
const sliderRate = document.getElementsByName('playbackRate')[0];
const progressBar = document.getElementsByClassName('progress__filled')[0];
const progressBarContainer = document.querySelector('.progress');
let scrubFlag = false;

function togglePlay() {
  const btnToggle = document.getElementsByClassName('toggle')[0];
  const pauseText = '❚❚';
  const playText = '►';
  if (video.paused) {
    video.play();
    btnToggle.textContent = pauseText;
  } else {
    video.pause();
    btnToggle.textContent = playText;
  }
}

function changeVolume() {
  video.volume = this.value;
}

function changeRate() {
  video.playbackRate = this.value;
}

function skip(seconds) {
  video.currentTime += seconds;
}

// update position of video progress bar
function updateProgressBar() {
  const progress = video.currentTime / video.duration || 0;
  progressBar.style['flex-basis'] = `${progress * 100}%`;
}

function changeProgress(event) {
  if (scrubFlag || event.type === 'click') {
    const { x, width } = this.getBoundingClientRect();
    video.currentTime = ((event.clientX - x) / width) * video.duration;
  }
}

function controlClick(event) {
  const control = event.target;
  if (control.hasAttribute('data-skip')) skip(parseInt(control.getAttribute('data-skip'), 10));
  if (control.classList.contains('toggle')) togglePlay();
}

// set progress bar to match current video playback time
updateProgressBar();

video.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', updateProgressBar);
sliderVolume.addEventListener('change', changeVolume);
sliderRate.addEventListener('change', changeRate);
controls.addEventListener('click', controlClick);
progressBarContainer.addEventListener('click', changeProgress);
progressBarContainer.addEventListener('mousemove', changeProgress);
progressBarContainer.addEventListener('mousedown', () => { scrubFlag = true; });
document.addEventListener('mouseup', () => { scrubFlag = false; });
