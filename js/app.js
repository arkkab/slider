import '../sass/style.scss';

document.addEventListener('DOMContentLoaded', () => {
    const imagesContainerEl = document.querySelector('.slider__images-container');
    const img1El = document.querySelector('.slider__image-container--first img');
    const img2El = document.querySelector('.slider__image-container--second img');
    let dragging = false;
    const imagesContainerLeftOffset = imagesContainerEl.offsetLeft;
    const imgContainer1El = document.querySelector('.slider__image-container--first');
    const imgContainer2El = document.querySelector('.slider__image-container--second');
    const handleEl = document.querySelector('.slider__handle');
    const dividerEl = document.querySelector('.slider__divider');
    let imageContainerWidth;

    function getOffset(clientX) {
        const offset = clientX - imagesContainerLeftOffset;
        if(offset<0) {
            return 0;
        } else if (offset > imageContainerWidth) {
            return imageContainerWidth;
        } else {
            return offset;
        }
    }

    function move(clientX) {
        const offset = getOffset(clientX);
        const percent = offset/imageContainerWidth*100;
        dividerEl.style.left = `${percent}%`;
        imgContainer2El.style.width = `${percent}%`;
    }

    function initEvents() {
        handleEl.addEventListener('mousedown', ()=> {
            dragging = true;
        });
        handleEl.addEventListener('mouseup', ()=> {
            dragging = false;
        });
        window.addEventListener('mousemove', event => {
            if(dragging) {
                move(event.clientX);
            }
        })
    }

    function adjustImagesSize() {
        imageContainerWidth = imagesContainerEl.offsetWidth;
        img1El.style.width = imageContainerWidth + 'px';
        img2El.style.width = imageContainerWidth + 'px';
    }
    window.addEventListener('resize', adjustImagesSize);
    adjustImagesSize();
    initEvents();
})