// Scroll animation for sections
window.addEventListener('scroll', function() {
    document.querySelectorAll('section').forEach(function(section) {
        let sectionTop = section.getBoundingClientRect().top;
        let windowHeight = window.innerHeight;
        if (sectionTop < windowHeight - 100) {
            section.classList.add('visible');
        }
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll(".art-image");
    const dots = document.querySelectorAll(".dot");
    let currentIndex = 0;

    function updateSlideshow(index) {
        // Update active image
        images.forEach((img, i) => {
            img.classList.toggle("active", i === index);
        });

        // Update active dot
        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === index);
        });

        // Update current index
        currentIndex = index;
    }

    // Auto-slide every 2 seconds
    let interval = setInterval(() => {
        let nextIndex = (currentIndex + 1) % images.length;
        updateSlideshow(nextIndex);
    }, 2000);

    // Handle dot click
    dots.forEach((dot) => {
        dot.addEventListener("click", () => {
            clearInterval(interval); // Stop auto-sliding on manual interaction
            const index = parseInt(dot.dataset.index);
            updateSlideshow(index);
            interval = setInterval(() => {
                let nextIndex = (currentIndex + 1) % images.length;
                updateSlideshow(nextIndex);
            }, 2000);
        });
    });

    // Initial setup
    updateSlideshow(0);
});

// Modal functionality for My Art and Contest images
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const closeBtn = document.getElementById('close');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const artImages = document.querySelectorAll('.art-img');
const contestImages = document.querySelectorAll('.contest-img');
const allImages = [...artImages, ...contestImages];
let currentIndex = 0;
let currentCategory = " "; // Track current category

// Function to open the modal
function openModal(index, category) {
    modal.style.display = 'block';
    let selectedImage;

    if (category === 'art') {
        selectedImage = artImages[index];
        modalImg.src = selectedImage.src;
        document.getElementById('art-name').textContent = selectedImage.getAttribute('data-name'); // Get art name from data attribute
        currentCategory = 'art';
        currentIndex = index;
    } else if (category === 'contest') {
        selectedImage = contestImages[index - artImages.length]; // Offset by the number of art images
        modalImg.src = selectedImage.src;
        document.getElementById('art-name').textContent = selectedImage.getAttribute('data-name'); // Get art name from data attribute
        currentCategory = 'contest';
        currentIndex = index - artImages.length;
    }

    modalImg.style.animation = "fadeIn 0.5s"; // Optional fade-in effect
}

// Attach click event to My Art images
artImages.forEach((img, index) => {
    img.addEventListener('click', () => {
        openModal(index, 'art');
    });
});

// Attach click event to Contest images
contestImages.forEach((img, index) => {
    img.addEventListener('click', () => {
        openModal(index + artImages.length, 'contest'); // Offset by the number of art images
    });
});

// Close modal button event
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Next button event
nextBtn.addEventListener('click', () => {
    if (currentCategory === 'art') {
        currentIndex = (currentIndex + 1) % artImages.length;
        modalImg.src = artImages[currentIndex].src;
        document.getElementById('art-name').textContent = artImages[currentIndex].getAttribute('data-name');
    } else if (currentCategory === 'contest') {
        currentIndex = (currentIndex + 1) % contestImages.length;
        modalImg.src = contestImages[currentIndex].src;
        document.getElementById('art-name').textContent = contestImages[currentIndex].getAttribute('data-name');
    }
});

// Previous button event
prevBtn.addEventListener('click', () => {
    if (currentCategory === 'art') {
        currentIndex = (currentIndex - 1 + artImages.length) % artImages.length;
        modalImg.src = artImages[currentIndex].src;
        document.getElementById('art-name').textContent = artImages[currentIndex].getAttribute('data-name');
    } else if (currentCategory === 'contest') {
        currentIndex = (currentIndex - 1 + contestImages.length) % contestImages.length;
        modalImg.src = contestImages[currentIndex].src;
        document.getElementById('art-name').textContent = contestImages[currentIndex].getAttribute('data-name');
    }
});

// Close modal when clicking outside of it
window.addEventListener('click', (event) => {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const scrollContainer = document.querySelector(".reels-container");
    const videos = document.querySelectorAll(".autoplay-reel");

    // Function to detect mobile screens
    function isMobile() {
        return window.innerWidth <= 768;
    }

    if (isMobile()) {
        // Function to check if a video is fully visible
        function checkVisibleVideos() {
            videos.forEach(video => {
                const rect = video.getBoundingClientRect();
                const fullyVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;

                if (fullyVisible) {
                    if (video.paused) {
                        video.muted = false; // Enable audio
                        video.play();
                    }
                } else {
                    video.pause();
                }
            });
        }

        // Ensure user interaction before playing videos (fixes autoplay restriction)
        function enableVideoInteraction() {
            videos.forEach(video => {
                video.muted = false; // Unmute
            });
            document.removeEventListener("click", enableVideoInteraction);
        }
        document.addEventListener("click", enableVideoInteraction);

        // Listen for scroll and resize events
        scrollContainer.addEventListener("scroll", checkVisibleVideos);
        window.addEventListener("resize", checkVisibleVideos);
        checkVisibleVideos(); // Initial check on load

    } else {
        // Desktop: Enable horizontal scrolling using the mouse wheel
        scrollContainer.addEventListener("wheel", (event) => {
            event.preventDefault();
            scrollContainer.scrollBy({
                left: event.deltaY * 2, // Horizontal scrolling
                behavior: "smooth"
            });
        });

        // Desktop: Enable smooth click & drag scrolling
        let isDown = false;
        let startX;
        let scrollLeft;

        scrollContainer.addEventListener("mousedown", (event) => {
            isDown = true;
            startX = event.pageX - scrollContainer.offsetLeft;
            scrollLeft = scrollContainer.scrollLeft;
        });

        scrollContainer.addEventListener("mouseleave", () => {
            isDown = false;
        });

        scrollContainer.addEventListener("mouseup", () => {
            isDown = false;
        });

        scrollContainer.addEventListener("mousemove", (event) => {
            if (!isDown) return;
            event.preventDefault();
            const x = event.pageX - scrollContainer.offsetLeft;
            const walk = (x - startX) * 2; // Adjust for sensitivity
            scrollContainer.scrollLeft = scrollLeft - walk;
        });

        // Desktop: Auto-play videos on hover with sound
        videos.forEach(video => {
            video.addEventListener("mouseenter", () => {
                video.muted = false;
                video.play();
            });

            video.addEventListener("mouseleave", () => {
                video.pause();
                video.muted = true;
            });

            // Open video in fullscreen on click
            video.addEventListener("click", () => {
                openFullscreen(video);
            });
        });

        // Function to open video in fullscreen mode
        function openFullscreen(video) {
            const fullscreenDiv = document.createElement("div");
            fullscreenDiv.classList.add("fullscreen-video");

            const fullscreenVideo = video.cloneNode(true);
            fullscreenVideo.controls = true;
            fullscreenVideo.muted = false;
            fullscreenVideo.autoplay = true;
            fullscreenDiv.appendChild(fullscreenVideo);

            const closeButton = document.createElement("div");
            closeButton.classList.add("close-fullscreen");
            closeButton.innerHTML = "&#10005;";
            closeButton.addEventListener("click", () => {
                fullscreenDiv.remove();
            });

            fullscreenDiv.appendChild(closeButton);
            document.body.appendChild(fullscreenDiv);
        }
    }
});