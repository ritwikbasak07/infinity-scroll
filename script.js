const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
function setAttribute(element,attributes){
    for(const key in attributes){
        element.setAttribute(key,attributes[key]);
    }
}

// Create Elements for Links & Photos

function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    photosArray.forEach((photos) => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttribute(item, {
            href:photos.links.html,
            target:'blank',
        });
        // Create <img> for photo
        const img = document.createElement('img');;
        setAttribute(img, {
            src:photos.urls.raw,
            alt : photos.alt_description,
            title : photos.alt_description,
        });
        img.addEventListener('load', imageLoaded());
        // Put <img> inside <a> element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Unsplash API
const count = 30;
const apiKey = 'NZ7yMKixflTMbDxka9TMIdHDXJ6F0Z5Tv0zcdu0VWXo';
// 2UYNOxQ4_5xjYcll6JRozDTcxvU3ddRjUt8NpSZl348
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

function imageLoaded(){
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
    }
}

// Get photos from unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (err) {
        console.log(err);
    }
}
//Check to see if scrolling near bottom of Page, Load more
window.addEventListener('scroll',() => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 & ready){
        ready = false;
        getPhotos();
    }
}) 


// On load
getPhotos();