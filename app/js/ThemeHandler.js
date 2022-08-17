export default class ThemeHandler {
    constructor(themesList = {light: 'light', dark: 'dark'}, themeDefault = 'light') {
        this.themesList = themesList
        this.themeDefault = themeDefault
        this.html = document.querySelector('html')
    }

    changeTheme(id) {
        this.html.setAttribute('data-theme', this.themesList[id])
    }

    setDefaultTheme() {
        this.html.setAttribute('data-theme', this.themeDefault)
    }

    static getCurrentTheme() {
        return document.querySelector('html').getAttribute('data-theme')
    }
}