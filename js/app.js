import '../sass/style.scss';

document.addEventListener('DOMContentLoaded', () => {
    const imagesContainerEl = document.querySelector('.slider__images-container');
    const img1El = document.querySelector('.slider__image-container--first img');
    const img2El = document.querySelector('.slider__image-container--second img');
    let dragging = false;
    const imgContainer1El = document.querySelector('.slider__image-container--first');
    const imgContainer2El = document.querySelector('.slider__image-container--second');
    const handleEl = document.querySelector('.slider__handle');
    const dividerEl = document.querySelector('.slider__divider');
    let imageContainerWidth;
    let imagesContainerLeftOffset;

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
        handleEl.addEventListener('touchstart', ()=> {
            dragging = true;
        });
        handleEl.addEventListener('touchend', ()=> {
            dragging = false;
        });
        window.addEventListener('mousemove', event => {
            if(dragging) {
                move(event.clientX);
            }
        });
        window.addEventListener('touchmove', event => {
            if(dragging) {
                move(event.touches[0].clientX);
            }
        })
    }

    function adjustImagesSize() {
        imageContainerWidth = imagesContainerEl.offsetWidth;
        imagesContainerLeftOffset = imagesContainerEl.offsetLeft;
        img1El.style.width = imageContainerWidth + 'px';
        img2El.style.width = imageContainerWidth + 'px';
    }
    window.addEventListener('resize', adjustImagesSize);
    adjustImagesSize();
    initEvents();
})