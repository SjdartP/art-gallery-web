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
// Like and Dislike Counters
let likeCount = 0;
let dislikeCount = 0;

const likeButton = document.getElementById('likeButton');
const dislikeButton = document.getElementById('dislikeButton');
const likeDislikeCount = document.getElementById('likeDislikeCount');
const feedbackForm = document.getElementById('feedbackForm');
const feedbackList = document.getElementById('feedbackList');
const submitButton = feedbackForm.querySelector('button[type="submit"]');

function disableBothButtons() {
    likeButton.disabled = true;
    dislikeButton.disabled = true;
    likeButton.style.backgroundColor = '#ccc';
    dislikeButton.style.backgroundColor = '#ccc';
}

// Event listener for Like button
likeButton.addEventListener('click', function() {
    likeCount++;
    document.getElementById('likeCount').textContent = likeCount;
    likeDislikeCount.style.display = 'flex';
    disableBothButtons();
});

// Event listener for Dislike button
dislikeButton.addEventListener('click', function() {
    dislikeCount++;
    document.getElementById('dislikeCount').textContent = dislikeCount;
    likeDislikeCount.style.display = 'flex';
    disableBothButtons();
});

// Feedback Form Handling
submitButton.addEventListener('click', function(event) {
    event.preventDefault();
    const userName = document.getElementById('name').value;
    const userFeedback = document.getElementById('feedbackText').value;

    if (!userName || !userFeedback) {
        alert('Please fill in both your name and feedback.');
        return;
    }

    const feedbackItem = document.createElement('div');
    feedbackItem.classList.add('feedback-item');
    feedbackItem.innerHTML = `
        <h4>${userName}</h4>
        <p>${userFeedback}</p>
    `;

    if (feedbackList.style.display === 'none') {
        feedbackList.style.display = 'block';
    }

    feedbackList.appendChild(feedbackItem);

    document.getElementById('name').value = '';
    document.getElementById('feedbackText').value = '';

    feedbackForm.style.display = 'none';

    const thankYouMessage = document.createElement('div');
    thankYouMessage.classList.add('thank-you-message');
    thankYouMessage.innerHTML = `
        <p>Thank you for your feedback, <strong>${userName}</strong>!</p>
        <h4>Your feedback:</h4>
        <p>"${userFeedback}"</p>
    `;

    feedbackForm.parentNode.insertBefore(thankYouMessage, feedbackForm);
});