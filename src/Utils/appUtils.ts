const getRandomInt = (maxx: number): number => {
    // since this can return 0, we want a random puzzle from 0 to 1
    return Math.floor(Math.random() * Math.floor(maxx)) + 1
}


export {
    getRandomInt,
}