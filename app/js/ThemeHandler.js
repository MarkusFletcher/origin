export default class ThemeHandler {
    constructor(themesList = {light: 'light', dark: 'dark'}, themeDefault = 'light') {
        this.themesList = themesList
        this.themeDefault = this.getOnLocalStorage()
        this.html = document.querySelector('html')
    }

    changeTheme(id) {
        this.html.setAttribute('data-theme', this.themesList[id])
        this.saveOnLocalStorage(id)
    }

    setDefaultTheme() {
        document.addEventListener("DOMContentLoaded", () => {
            this.html.setAttribute('data-theme', this.themeDefault)
        });
    }

    saveOnLocalStorage(id) {
        localStorage.setItem('site-theme', id)
    }

    getOnLocalStorage() {
        return localStorage.getItem('site-theme')
    }

    static getCurrentTheme() {
        return document.querySelector('html').getAttribute('data-theme')
    }
}