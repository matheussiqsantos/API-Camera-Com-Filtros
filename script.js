const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const buttons = document.querySelectorAll('.btn');

async function startCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { width: { ideal: 1280 }, height: { ideal: 720 } },
      audio: false
    });
    video.srcObject = stream;
  } catch (err) {
    console.error("Erro ao acessar a câmera: ", err);
    alert("Não foi possível acessar a câmera. Verifique as permissões no navegador.");
  }
}

function drawFrame() {
  if (video.readyState === video.HAVE_ENOUGH_DATA) {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  }
  requestAnimationFrame(drawFrame);
}

video.addEventListener('play', () => {
  drawFrame();
});

buttons.forEach(button => {
  button.addEventListener('click', () => {
    buttons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const filterType = button.getAttribute('data-filter');
    canvas.className = '';

    if (filterType !== 'normal') {
      canvas.classList.add(`filter-${filterType}`);
    }
  });
});

startCamera();