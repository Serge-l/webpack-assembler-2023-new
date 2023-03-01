function createAnalytics() {
    let counter = 0
    let destroyed = false
    console.log('test')
    const listener = () => counter++
    document.addEventListener('click', listener)

    return {
        destroy() {
            document.removeEventListener('click', listener)
            isDestroyed = true
        },
        getClicks() {
            if(destroyed) {
                return 'Analytics is destroyed'
            }
            return counter
        }
    }
}

window.analytics = createAnalytics()