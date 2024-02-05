export default function setBodyColor({ imageUrl }) {
    document.body.style.backgroundImage = `url('${imageUrl}')`;
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundSize = 'cover';
    console.log(imageUrl);
}