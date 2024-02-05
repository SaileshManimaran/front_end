export default function setBodyBackground({ videoUrl }) {
    const videoElement = document.createElement('video');
    videoElement.src = videoUrl;
    videoElement.autoplay = true;
    videoElement.loop = true;
    videoElement.muted = true;
    videoElement.style.position = 'fixed';
    videoElement.style.top = '0';
    videoElement.style.left = '0';
    videoElement.style.width = '100%';
    videoElement.style.height = '100%';
    videoElement.style.objectFit = 'cover';
    videoElement.style.zIndex = '-1'; // Ensure the video is behind other elements

    document.body.appendChild(videoElement);
}
