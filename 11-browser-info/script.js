const info = navigator.userAgent

let browser = '';

if (info.match(/edg/i)) {
    browser = 'edge'
} else if (info.match(/opr/i)) {
    browser = 'opera'
} else if (info.match(/firefox/i)) {
    browser = 'firefox'
} else if (info.match(/chrome/i)) {
    browser = 'chrome'
}

const matchImage = document.querySelector(`.container .${browser}`);

matchImage.style.opacity = '1';

document.querySelector('h2 span').innerHTML =
    browser.charAt(0).toUpperCase() + browser.slice(1, browser.length)