const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

let currentIndex = 0;
let cycleTimer = null;
let isReversing = false;

if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    document.documentElement.classList.add('dark');
} else {
    document.documentElement.classList.remove('dark');
    currentIndex = 6;
    cycleTimer = null;
    isReversing = true;
}


const toggleBtn = document.getElementById('theme');

toggleBtn.addEventListener('click',async () => {
    toggleSvgAnimation();
    
    await themeTransition();

    const isDark = document.documentElement.classList.toggle('dark');
    if (isDark) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }

    const ripple = document.getElementById('ripple');
    ripple.classList.add('before:opacity-0');

    setTimeout(() => {
        ripple.classList.remove('before:scale-[2.5]', 'before:opacity-0');
        ripple.classList.add('before:scale-0');
    }, 400);
});



let cards = document.querySelectorAll('.glow');
const customColors = [
    'oklch(0.6518 0.2536 22.87)', //red-ish
    'oklch(0.7587 0.1623 65.22)', //gold
    'oklch(0.6987 0.1784 147.81)', //green
    'oklch(54.502% 0.20673 264.202)', //blue
    // 'oklch(52.234% 0.26499 294.149)' //purple
];

cards.forEach(card => {
    card.onmousemove = function (e) {
        let x = e.pageX - card.offsetLeft;
        let y = e.pageY - card.offsetTop;

        card.style.setProperty('--x', x + 'px');
        card.style.setProperty('--y', y + 'px');
    }

    let currentColorIndex = 0;

    function setColor() {
        const randomIndex = Math.floor(Math.random() * customColors.length);
        const safeIndex = randomIndex % customColors.length;
        const selectedColor = customColors[safeIndex];

        card.style.setProperty('--before-bg', selectedColor);

    }
    card.addEventListener('mouseenter', setColor);
});

const svg = document.getElementById('icon');

const svg_paths = [
    //moon - index:0
    `<path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454l0 .008" />`,
    //moon-slashed - index:1
    `<path stroke="none" d="M0 0h24v24H0z" fill="none" />
	<path d="M7.962 3.949a8.97 8.97 0 0 1 4.038 -.957v.008h.393a7.478 7.478 0 0 0 -2.07 3.308m-.141 3.84c.186 .823 .514 1.626 .989 2.373a7.49 7.49 0 0 0 4.586 3.268m3.893 -.11c.223 -.067 .444 -.144 .663 -.233a9.088 9.088 0 0 1 -.274 .597m-1.695 2.337a9 9 0 0 1 -12.71 -12.749" />
	<path d="M3 3l18 18" />`,
    //sun-moon - index:2
    `<path stroke="none" d="M0 0h24v24H0z" fill="none" />
	<path d="M9.173 14.83a4 4 0 1 1 5.657 -5.657" />
	<path d="M11.294 12.707l.174 .247a7.5 7.5 0 0 0 8.845 2.492a9 9 0 0 1 -14.671 2.914" />
	<path d="M3 12h1" />
	<path d="M12 3v1" />
	<path d="M5.6 5.6l.7 .7" />
	<path d="M3 21l18 -18" />`,
    //sun-slashed - index:3
    `<path stroke="none" d="M0 0h24v24H0z" fill="none" />
	<path d="M3 3l18 18" />
	<path d="M16 12a4 4 0 0 0 -4 -4m-2.834 1.177a4 4 0 0 0 5.66 5.654" />
	<path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" />`,
    //low-sun - index:4
    `<path stroke="none" d="M0 0h24v24H0z" fill="none" />
	<path d="M8 12a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
	<path d="M4 12h.01" />
	<path d="M12 4v.01" />
	<path d="M20 12h.01" />
	<path d="M12 20v.01" />
	<path d="M6.31 6.31l-.01 -.01" />
	<path d="M17.71 6.31l-.01 -.01" />
	<path d="M17.7 17.7l.01 .01" />
	<path d="M6.3 17.7l.01 .01" />`,
    //sun - index:5
    `<path stroke="none" d="M0 0h24v24H0z" fill="none" />
	<path d="M8 12a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
	<path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" />`,
    //sun-high - index:6
    `<path stroke="none" d="M0 0h24v24H0z" fill="none" />
	<path d="M14.828 14.828a4 4 0 1 0 -5.656 -5.656a4 4 0 0 0 5.656 5.656" />
	<path d="M6.343 17.657l-1.414 1.414" />
	<path d="M6.343 6.343l-1.414 -1.414" />
	<path d="M17.657 6.343l1.414 -1.414" />
	<path d="M17.657 17.657l1.414 1.414" />
	<path d="M4 12h-2" />
	<path d="M12 4v-2" />
	<path d="M20 12h2" />
	<path d="M12 20v2" />`
];

svg.innerHTML = svg_paths[currentIndex];


const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function toggleSvgAnimation() {
    // 1. Check if the animation is currently busy running to prevent overlapping clicks
    if (toggleBtn.disabled) return;
    
    if (!isReversing) {
        svg.classList.add('rotate-180');
        svg.classList.remove('dark:-translate-x-7', '-translate-x-7');
        svg.classList.add('translate-x-7');

    } else {
        svg.classList.remove('rotate-180');
        svg.classList.remove('translate-x-7');
        svg.classList.add('dark:-translate-x-7', '-translate-x-7');
    }

    // Temporarily lock the button so multiple fast clicks don't break the frame loop
    toggleBtn.disabled = true;

    // 2. Determine our steps based on the current direction state
    const step = isReversing ? -1 : 1;
    const targetIndex = isReversing ? 0 : svg_paths.length - 1;

    // 3. Simple async loop that runs sequential frames step-by-step
    while (currentIndex !== targetIndex) {
        currentIndex += step;
        
        if (svg) svg.innerHTML = svg_paths[currentIndex];
        
        // Pause execution for [x] milliseconds asynchronously before updating the next frame
        await sleep(71); 
    }

    // 4. Clean up state variables once the loop finishes successfully
    isReversing = !isReversing;
    toggleBtn.disabled = false; // Re-enable the button for the next turn
};



async function themeTransition() {
    const transit_div = document.getElementById('transit');

    if (document.documentElement.classList.contains('dark')) {
        transit_div.style.setProperty('--c', 'oklch(0.8871 0.0266 5.93)');
    }
    else{
        transit_div.style.setProperty('--c', 'oklch(18.22% 0 0)');
    }

    ripple.classList.remove('before:scale-0');
    transit_div.classList.remove('-z-30');
    ripple.classList.add('before:scale-[2.5]');
    transit_div.classList.add('z-30');
    
    // Wait exactly matching the Tailwind 500ms transition duration
    await sleep(250);
    ripple.classList.remove('before:scale-[2.5]');
    transit_div.classList.remove('z-30');
    ripple.classList.add('before:scale-0');
    transit_div.classList.add('-z-30');


};