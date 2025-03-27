// Parallax Effect for Background and Hearts
const parallaxBg = document.getElementById('parallaxBg');
document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20; // Subtle movement
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    anime({
        targets: parallaxBg,
        translateX: x,
        translateY: y,
        duration: 800,
        easing: 'easeOutQuad'
    });
});

// Floating Hearts Animation with Parallax
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '♥';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.dataset.depth = Math.random() * 0.5 + 0.5; // Depth for parallax
    document.getElementById('hearts').appendChild(heart);

    anime({
        targets: heart,
        translateY: [window.innerHeight, -50],
        translateX: [0, anime.random(-50, 50)],
        scale: [0.5, 1.5],
        opacity: [0, 0.7, 0],
        duration: anime.random(3000, 6000),
        easing: 'easeInOutQuad',
        complete: () => heart.remove()
    });
}
setInterval(createHeart, 300);

// Add click event to category titles
document.querySelectorAll('.category-title').forEach(title => {
title.addEventListener('click', () => {
const subcategories = title.nextElementSibling; // Current subcategories
const buttons = subcategories.querySelectorAll('.dashboard-btn');
const isVisible = subcategories.style.display === 'flex';

// Hide all other subcategories
document.querySelectorAll('.subcategories').forEach(otherSub => {
    if (otherSub !== subcategories && otherSub.style.display === 'flex') {
        const otherButtons = otherSub.querySelectorAll('.dashboard-btn');
        anime({
            targets: otherButtons,
            opacity: 0,
            translateY: 20,
            duration: 400,
            easing: 'easeInQuad',
            complete: () => {
                otherSub.style.display = 'none';
            }
        });
    }
});

// Toggle current subcategory
if (isVisible) {
    anime({
        targets: buttons,
        opacity: 0,
        translateY: 20,
        duration: 400,
        easing: 'easeInQuad',
        complete: () => {
            subcategories.style.display = 'none';
        }
    });
} else {
    subcategories.style.display = 'flex';
    anime({
        targets: buttons,
        opacity: [0, 1],
        translateY: [20, 0],
        delay: anime.stagger(100),
        duration: 600,
        easing: 'easeOutBack'
    });
}
});
});
// Parallax on Scroll for Hearts
document.getElementById('sidebar').addEventListener('scroll', () => {
const scrollTop = document.getElementById('sidebar').scrollTop;
document.querySelectorAll('.heart').forEach(heart => {
const depth = parseFloat(heart.dataset.depth);
anime({
    targets: heart,
    translateY: `-=${scrollTop * depth * 0.1}`, // Parallax effect
    duration: 100,
    easing: 'linear'
});
});
});

// Dashboard and Sidebar Entrance Animation
anime({
targets: '.dashboard',
scale: [0.9, 1],
opacity: [0, 1],
duration: 1000,
easing: 'easeOutElastic(1, .8)'
});

anime({
    targets: '.category',
    translateY: [50, 0],
    opacity: [0, 1],
    delay: anime.stagger(200),
    duration: 800,
    easing: 'easeOutQuad'
});

anime({
    targets: '.dashboard-btn',
    translateX: [-20, 0],
    opacity: [0, 1],
    delay: anime.stagger(100, { start: 500 }),
    duration: 600,
    easing: 'easeOutBack'
});

// Button Hover Animation
document.querySelectorAll('.dashboard-btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        anime({
            targets: btn,
            scale: 1.05,
            rotate: '5deg',
            duration: 300,
            easing: 'easeOutQuad'
        });
    });
    btn.addEventListener('mouseleave', () => {
        anime({
            targets: btn,
            scale: 1,
            rotate: '0deg',
            duration: 300,
            easing: 'easeOutQuad'
        });
    });
});

// Toggle Sidebar
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const isCollapsed = sidebar.classList.toggle('collapsed');
    anime({
        targets: sidebar,
        width: isCollapsed ? 60 : 250,
        duration: 500,
        easing: 'easeInOutSine'
    });
}

// Store the redirect URL globally
let redirectUrl = '';

// Modal Animation with URL Parameter
function showModal(event, title, content, url = '') {
event.preventDefault();
const modal = document.getElementById('previewModal');
const modalContent = document.getElementById('modalContent');
const modalBody = document.getElementById('modalBody');

// Set modal content
modalBody.innerHTML = `<h2>${title}</h2>${content}`;
modal.style.display = 'flex';
redirectUrl = url; // Store the href for redirection

// Anime.js animation for modal opening
anime({
targets: modalContent,
scale: [0, 1.1, 1],
rotate: [0, 10, 0],
opacity: [0, 1],
duration: 800,
easing: 'easeOutElastic(1, .6)'
});
}

// Redirect After Closing Modal
function closeModal() {
const modal = document.getElementById('previewModal');
const modalContent = document.getElementById('modalContent');

anime({
targets: modalContent,
scale: [1, 0],
opacity: [1, 0],
duration: 400,
easing: 'easeInQuad',
complete: () => {
    modal.style.display = 'none';
    
    // Ensure a valid redirect URL is present before redirecting
    if (redirectUrl && redirectUrl !== '') {
        setTimeout(() => {
            window.location.href = redirectUrl; // Redirect to the stored URL
            redirectUrl = ''; // Clear the URL after redirect
        }, 300); // Delay to ensure smooth transition
    }
}
});
}

// Close modal when clicking outside
window.addEventListener('click', (event) => {
        const modal = document.getElementById('previewModal');
        const modalContent = document.getElementById('modalContent');
        
        if (event.target === modal) {
                closeModal();
        }
});

// Close modal on Escape key
window.addEventListener('keydown', (event) => {
        if (event.key === "Escape") {
                closeModal();
        }
});
