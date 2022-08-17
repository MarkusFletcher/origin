import ThemeHandler from './ThemeHandler.js'

console.log('start script.js')

let themeConstrol = document.querySelector('.darkmode-control')
let themeToggler = themeConstrol.querySelector('.darkmode-control__toggler')
let themeHandler = new ThemeHandler()

themeConstrol.addEventListener('click', () => {
    themeHandler.changeTheme(ThemeHandler.getCurrentTheme() == 'dark' ? 'light' : 'dark')
    themeToggler.classList.toggle('active')
})




console.log('end script.js')