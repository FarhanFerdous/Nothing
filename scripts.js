// Matrix Rain Effect
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nums = '0123456789';
const hearts = '❤💕💖'; // Added hearts for the theme
const alphabet = katakana + latin + nums + hearts;

const fontSize = 16;
const columns = canvas.width / fontSize;

const rainDrops = [];

for (let x = 0; x < columns; x++) {
    rainDrops[x] = 1;
}

const draw = () => {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#ff00ff'; // Neon Pink Text
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            rainDrops[i] = 0;
        }
        rainDrops[i]++;
    }
};

let matrixInterval = setInterval(draw, 30);

// Window Resize for Matrix
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Create background floating hearts
setInterval(() => {
    const heart = document.createElement('div');
    heart.innerHTML = '❤';
    heart.className = 'floating-heart';
    heart.style.left = Math.random() * window.innerWidth + 'px';
    heart.style.top = window.innerHeight + 'px';
    heart.style.fontSize = (10 + Math.random() * 20) + 'px';
    heart.style.animationDuration = (3 + Math.random() * 5) + 's';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 8000);
}, 1000);

// Mobile Compatibility
document.addEventListener('DOMContentLoaded', () => {
    setupMobileCompatibility();
});

function setupMobileCompatibility() {
    // Prevent zoom on double tap
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function (event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);

    // Prevent pull-to-refresh on mobile
    document.body.addEventListener('touchmove', function (e) {
        if (e.target.tagName !== 'BUTTON') { // Allow button interactions
            e.preventDefault();
        }
    }, { passive: false });
}


// Personalization
const urlParams = new URLSearchParams(window.location.search);
const name = urlParams.get('name');
if (name) {
    document.getElementById('main-heading').innerHTML = `CRITICAL: VALENTINE PROTOCOL FOR <span style="color:#fff">${name}</span>`;
}

// Button Logic
const noButton = document.getElementById('no-button');
const yesButton = document.getElementById('yes-button');

// Reject Counter
let rejectCount = 0;

function hoverNoButton() {
    // Play error sound
    playErrorSound();

    rejectCount++;

    // If tried 10 times, remove the button
    if (rejectCount >= 10) {
        noButton.style.display = 'none';

        // Optional: Show a specific message when it disappears
        const log = document.getElementById('message-log');
        const div = document.createElement('div');
        div.innerText = "> SYSTEM OVERRIDE: REJECTION OPTION DELETED";
        div.style.color = 'var(--error-color)';
        div.style.textAlign = 'left';
        div.style.marginTop = '5px';
        log.appendChild(div);

        return;
    }

    // Glitch move
    const container = document.querySelector('.button-container');
    const maxX = container.offsetWidth - noButton.offsetWidth;
    const maxY = container.offsetHeight - noButton.offsetHeight;

    // Teleport logic with overlap check
    noButton.style.position = 'absolute';

    let newX, newY;
    let overlap = true;
    let attempts = 0;

    // Get Yes button rect relative to container
    const yesRect = {
        left: yesButton.offsetLeft,
        top: yesButton.offsetTop,
        right: yesButton.offsetLeft + yesButton.offsetWidth,
        bottom: yesButton.offsetTop + yesButton.offsetHeight
    };

    while (overlap && attempts < 10) {
        newX = Math.random() * maxX;
        newY = Math.random() * maxY;

        // Define new No button rect
        const noRect = {
            left: newX,
            top: newY,
            right: newX + noButton.offsetWidth,
            bottom: newY + noButton.offsetHeight
        };

        // Check collision with buffer
        const buffer = 50; // 50px safety buffer
        if (noRect.right < yesRect.left - buffer ||
            noRect.left > yesRect.right + buffer ||
            noRect.bottom < yesRect.top - buffer ||
            noRect.top > yesRect.bottom + buffer) {
            overlap = false;
        }

        attempts++;
    }

    // Fallback if overlap keeps happening (e.g. small screen)
    if (overlap) {
        // Force to a corner? Or just let it overlap slightly but try to minimize
        // If we failed 10 times, let's try to put it far right
        if (Math.random() > 0.5) newX = maxX; else newX = 0;
        if (Math.random() > 0.5) newY = maxY; else newY = 0;
    }

    noButton.style.left = newX + 'px';
    noButton.style.top = newY + 'px';

    // Show system error
    showSystemError();
}


function showSystemError() {
    const errors = [
        "ERROR: I LOVE YOU TOO MUCH",
        "WARNING: YOU ARE TOO CUTE TO SAY NO",
        "SYSTEM SAYS: PLEASE SAY YES 🥺",
        "HEART FIREWALL: BLOCKED",
        "CRITICAL ALERT: MY HEART NEEDS YOU",
        "RETRYING... WITH MORE LOVE",
        "ERROR 404: REJECTION NOT FOUND"
    ];

    const msg = errors[Math.floor(Math.random() * errors.length)];
    const log = document.getElementById('message-log');

    const div = document.createElement('div');
    div.innerText = `> ${msg}`;
    div.style.color = 'var(--error-color)';
    div.style.textAlign = 'left';
    div.style.marginTop = '5px';
    log.appendChild(div);

    // Auto scroll
    if (log.children.length > 5) log.removeChild(log.firstChild);
}

function clickYesButton() {
    // Stop matrix rain reset to hearts only? Or just speed it up?
    clearInterval(matrixInterval);

    // Clear screen
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Infinite Heart Matrix

    // Reset columns for hearts if needed or reuse existing rainDrops
    // rainDrops is global so we can reuse it

    const drawHearts = () => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#ff69b4'; // Hot Pink
        ctx.font = '24px monospace';

        for (let i = 0; i < rainDrops.length; i++) {
            const text = heartAlphabet.charAt(Math.floor(Math.random() * heartAlphabet.length));
            ctx.fillText(text, i * 24, rainDrops[i] * 24);

            if (rainDrops[i] * 24 > canvas.height && Math.random() > 0.975) {
                rainDrops[i] = 0;
            }
            rainDrops[i]++;
        }
    };
    setInterval(drawHearts, 30);

    // Update UI
    document.querySelector('.main-interaction-container').innerHTML = `
        <h1 class="glitch">SYSTEM INTEGRATION SUCCESSFUL</h1>
        <div class="success-message">
            <p>> CONNECTION ESTABLISHED</p>
            <p>> HEART SYNCHRONIZATION: 100%</p>
            <p>> STATUS: TOGETHER FOREVER</p>
            <p>> HAPPY VALENTINE'S DAY</p>
        </div>
    `;

    // Play success song: Ham_Tere_Pyaar_Main.mp3
    if (audio) {
        audio.pause();
        audio.currentTime = 0;
    }
    audio = new Audio('Ham_Tere_Pyaar_Main.mp3');
    audio.loop = true;
    audio.play().then(() => {
        isMusicPlaying = true;
        document.getElementById('music-toggle').innerText = '🔊';
    }).catch(e => console.log("Audio play failed", e));

    // Photo Heartbeat Gallery
    const photos1 = [
        "ChatGPT Image Mar 31, 2025, 05_34_05 AM.png",
        "ChatGPT Image Mar 31, 2025, 06_00_27 AM.png",
        "IMG_20250216_010831_644.jpg",
        "IMG_20250216_010833_454.jpg",
        "IMG_20250414_123459.jpg",
        "IMG_20250414_123724.jpg",
        "IMG_20250414_140114.jpg",
        "IMG_20250414_140927.jpg",
        "IMG_20250414_140931.jpg",
        "IMG_20250414_141030.jpg",
        "IMG_20250414_141031.jpg",
        "IMG_20250414_143115.jpg"
    ];

    const photos2 = [
        "411158261_683906883725239_3561457040239128784_n.jpg",
        "440272402_410140811957551_3883885678684487569_n.jpg",
        "441924934_496218419502990_8051793836093454135_n_upscayl_5x_ultrasharp.png",
        "447893487_1691998128241266_2975985061263598882_n.jpg",
        "448435280_1928886987551325_3860062647938482913_n.jpg",
        "ChatGPT Image Mar 31, 2025, 05_22_18 AM.png",
        "IMG_5909.jpeg"
    ];

    const photos3 = [
        "423619282_387864730523051_5854811615276221169_n.jpg",
        "434688267_964530155373124_4823091170064980517_n.jpg",
        "434694656_364281185946333_6979166614510310049_n.jpg",
        "IMG-20240114-WA0001.jpg",
        "IMG_20240214_162918.jpg",
        "IMG_20240214_164321.jpg",
        "IMG_20240214_165813.jpg",
        "received_1079449349799554.jpeg"
    ];

    // Combine them with paths
    const allPhotos = [
        ...photos1.map(p => `PICTURES-1/${p}`),
        ...photos2.map(p => `PICTURES-2/${p}`),
        ...photos3.map(p => `PICTURES-3/${p}`)
    ];

    // Photo Heartbeat Gallery
    const maxAttempts = 50;
    const placedPhotos = [];

    allPhotos.forEach((photoPath, index) => {
        const img = document.createElement('img');
        img.src = photoPath;
        img.className = 'heartbeat-photo';

        let validPosition = false;
        let attempts = 0;
        let left, top;
        // Estimated size
        const w = 150;
        const h = 150; // Assume square for placement, auto height in CSS

        while (!validPosition && attempts < maxAttempts) {
            left = Math.random() * (window.innerWidth - w);
            top = Math.random() * (window.innerHeight - h);

            // Check collision with existing photos
            let collision = false;
            for (let p of placedPhotos) {
                if (left < p.right &&
                    left + w > p.left &&
                    top < p.bottom &&
                    top + h > p.top) {
                    collision = true;
                    break;
                }
            }

            if (!collision) validPosition = true;
            attempts++;
        }

        // If we really can't place it without overlap (too many photos), place it anyway randomly
        if (!validPosition) {
            left = Math.random() * (window.innerWidth - w);
            top = Math.random() * (window.innerHeight - h);
        }

        placedPhotos.push({ left, top, right: left + w, bottom: top + h });

        img.style.left = left + 'px';
        img.style.top = top + 'px';

        // Random Delay for pulse
        img.style.animationDelay = Math.random() + 's';

        // Random Rotation
        const rot = (Math.random() - 0.5) * 40;
        img.style.setProperty('--rot', rot + 'deg');

        document.body.appendChild(img);
    });
}

// Audio logic
let audio = null;
let isMusicPlaying = false;
const toggle = document.getElementById('music-toggle');

function toggleMusic() {
    if (!audio) {
        audio = new Audio('romantic_music.mp3');
        audio.loop = true;
    }

    if (isMusicPlaying) {
        audio.pause();
        toggle.innerText = '🔇';
        isMusicPlaying = false;
    } else {
        playMusic();
    }
}

function playMusic(force = false) {
    if (!audio) {
        audio = new Audio('romantic_music.mp3');
        audio.loop = true;
    }
    audio.play().then(() => {
        isMusicPlaying = true;
        toggle.innerText = '🔊';
    }).catch(e => {
        console.log("Audio play failed", e);
    });
}

// Function to play error sounds without overlap
let funnyAudio = null;

function playErrorSound() {
    // Stop previous funny sound if playing
    if (funnyAudio) {
        funnyAudio.pause();
        funnyAudio.currentTime = 0;
    }

    // Play funny sounds at normal speed
    const sounds = ['Funny 1.mpeg', 'Funny 2.mpeg', 'Funny 3.mpeg'];
    funnyAudio = new Audio(sounds[Math.floor(Math.random() * sounds.length)]);
    funnyAudio.play().catch(e => { console.log("Audio play failed", e); });
}