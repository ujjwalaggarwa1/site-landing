let info = document.querySelectorAll('.info');
let highlight = document.querySelectorAll('.highlight');
let glow = document.querySelectorAll('.glow');
let pop = document.querySelectorAll('.pop');
let txt = document.querySelectorAll('.txt');
let g_btn = document.querySelectorAll('.g-btn');
const theme = document.getElementById('theme');
const icon = document.getElementById('icon');


const POP = `
shadow-xl/20 dark:shadow-xl/80
inset-shadow-sm dark:inset-shadow-whity/10 inset-shadow-charcoal/5
`;

const GLOW = `
before:absolute after:absolute
before:content-[''] after:content-['']
before:top-(--y) before:left-(--x) before:-translate-x-1/2 before:-translate-y-1/2
before:opacity-0 hover:before:opacity-100
after:inset-0.75 after:backdrop-filter after:backdrop-blur-[20px]
overflow-hidden
before:w-[120%] before:aspect-square
rounded-2xl after:rounded-2xl
dark:after:bg-charcoal/75 after:bg-whity/75 before:bg-[radial-gradient(var(--before-bg),transparent,transparent)]
transition-transform before:transition-opacity duration-300 ease-in-out
`;

const TXT = `
relative
col-span-1 lg:col-span-2
flex flex-auto justify-center items-start flex-col
gap-1
px-6 py-8 min-h-1/4 max-h-max min-w-auto
hover:scale-102
`;

const INFO = `
relative z-10
text-lg antialiased italic tracking-wide
`;

const HIGHLIGHT = `not-italic dark:text-green-400 text-blue-700`;

const G_BTN = `
p-2.5 rounded-2xl
absolute
cursor-pointer
`;

const THEME_BTN = `
absolute top-6 right-6 z-40 px-10
rounded-full after:rounded-full
flex items-center justify-center
`;

const ICON = `
relative 
z-50 w-6 h-6
dark:-translate-x-7 translate-x-7
transition-all duration-500 ease-in-out
`;



pop.forEach(element => { element.classList.add(...POP.trim().split(/\s+/).filter(Boolean)); })
glow.forEach(element => { element.classList.add(...GLOW.trim().split(/\s+/).filter(Boolean)); })
txt.forEach(element => { element.classList.add(...TXT.trim().split(/\s+/).filter(Boolean)); })
info.forEach(element => { element.classList.add(...INFO.trim().split(/\s+/).filter(Boolean)); })
highlight.forEach(element => { element.classList.add(...HIGHLIGHT.trim().split(/\s+/).filter(Boolean)); })
g_btn.forEach(element => { element.classList.add(...G_BTN.trim().split(/\s+/).filter(Boolean)); })
theme.classList.add(...THEME_BTN.trim().split(/\s+/).filter(Boolean));
icon.classList.add(...ICON.trim().split(/\s+/).filter(Boolean));