const textHolder = document.getElementById('auto-type');
const bodyBackground = document.querySelector('body').style;
const preloader = document.getElementById('preloader');
const backDrop = document.querySelector('.backdrop');
// const openMenu = document.querySelector('.open-menu');
const sidebar = document.querySelector('aside');

const text = 'JavaScript SuperApp ...'

let count = 0;
let letter = ''

window.onload = () => {
    setTimeout(() => {
        preloader.style.opacity = '0';

        setInterval(() => {
            letter = text.slice(0, count)
            count = count + 1;

            textHolder.innerHTML = letter

            if (count === text.length) {
                setTimeout(() => {
                    count = 0
                }, 1500)
            }
        }, 100)
    }, 1000)
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 1300)
}

document.addEventListener('mousemove', (e) => {
    bodyBackground.backgroundPositionX = (e.clientX / 50).toFixed(1) + '%';
    bodyBackground.backgroundPositionY = (e.clientY / 50).toFixed(1) + '%';
})

const openMenu = () => {
    backDrop.style.display = 'block';
    sidebar.style.left = '0';
    setTimeout(()=>sidebar.children[0].style.left = '0', 100)
    setTimeout(()=>sidebar.children[1].style.left = '0', 200)
    setTimeout(()=>sidebar.children[2].style.left = '0', 300)
}

const closeMenu = () => {
    backDrop.style.display = 'none';
    sidebar.children[2].style.left = '-85%';
    setTimeout(()=>sidebar.children[1].style.left = '-90%', 100)
    setTimeout(()=>sidebar.children[0].style.left = '-95%', 200)
    setTimeout(()=>sidebar.style.left = '-20rem', 300)
}
