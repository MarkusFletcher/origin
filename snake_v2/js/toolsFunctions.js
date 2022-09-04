export default function getRandomInt(min, max) {
    let rand = Math.floor( Math.random() * ( max - min ) + min )
    console.log(rand)
    console.log(min + ' - ' + max)
    return rand
}