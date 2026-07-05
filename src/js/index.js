let cards = document.querySelectorAll('.txt');


const customColors = [
    'oklch(66.853% 0.19501 30.508)', //red-orange-ish
    'oklch(83.861% 0.14826 82.751)', //gold
    // 'oklch(87.477% 0.13438 195.02)', //green-ish
    'oklch(54.502% 0.20673 264.202)', //blue
    'oklch(52.234% 0.26499 294.149)' //purple
];

cards.forEach(card => {
    card.onmousemove = function (e) {
        let x = e.pageX - card.offsetLeft;
        let y = e.pageY - card.offsetTop;

        card.style.setProperty('--x', x + 'px');
        card.style.setProperty('--y', y + 'px');
    }

    let colorInterval = null;
    let currentColorIndex = 0;

    function setColor() {
        const randomIndex = Math.floor(Math.random() * customColors.length);
        let safeIndex = randomIndex % customColors.length;
        let selectedColor = customColors[safeIndex];

        card.style.setProperty('--before-bg', selectedColor);

        safeIndex = (randomIndex+1) % customColors.length;
        selectedColor = customColors[safeIndex]
        card.style.setProperty('--before-bg-s', selectedColor);
    }

    function resetColor() {
        card.style.removeProperty('--before-bg');

    }

    // Attach the event listeners to the element
    card.addEventListener('mouseenter', setColor);
    card.addEventListener('mouseleave', resetColor);


})


// let colorInterval = null;
// let currentColorIndex = 0;

// function startColorCycle() {
//     box.style.backgroundColor = customColors[currentColorIndex];

//     // 2. Set up a loop to softly cycle to the next colors
//     colorInterval = setInterval(() => {
//         // Increment index, looping back to 0 at the end of the array
//         currentColorIndex = (currentColorIndex + 1) % customColors.length;

//         // Changing this inline style triggers the Tailwind 'transition-colors' smoothly
//         box.style.backgroundColor = customColors[currentColorIndex];
//     }, 1000); // Cycles to a new color every 1000ms (1 second)
// }

// // Function to stop cycling and reset when mouse leaves
// function stopColorCycle() {
//     clearInterval(colorInterval);
//     currentColorIndex = 0;
//     box.style.backgroundColor = ''; // Resets to original Tailwind CSS background
// }

// // Attach the event listeners to the element
// box.addEventListener('mouseenter', startColorCycle);
// box.addEventListener('mouseleave', stopColorCycle);