const body = document.querySelector('body');
const all: Element = document.querySelector('.alll');

window.addEventListener('load', () => { setTimeout(stopLoading, 2173); })

function stopLoading() {
  document.getElementById("loader").style.display="none";
  document.documentElement.scrollTop = 0;
  document.getElementById('title').style.animation = "focus-in-expand 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both";
}