export default class ThemeHandler {
    constructor(themesList = {light: 'light', dark: 'dark'}) {
        this.themesList = themesList
        this.themeDefault = this.getFromLocalStorage()
        this.html = document.querySelector('html')
    }

    changeTheme(id) {
        this.html.setAttribute('data-theme', this.themesList[id])
        this.saveOnLocalStorage(id)
    }

    setDefaultTheme(cb) {
        document.addEventListener("DOMContentLoaded", () => {
            this.html.setAttribute('data-theme', this.themeDefault)
            if(typeof cb == 'function'){
                cb()
            }
        });
    }

    saveOnLocalStorage(id) {
        localStorage.setItem('site-theme', id)
    }

    getFromLocalStorage() {
        return localStorage.getItem('site-theme')
    }

    static getCurrentTheme() {
        return document.querySelector('html').getAttribute('data-theme')
    }
}