class Demo {
    async test () {
        return new Promise((resolve) => {
            setTimeout(resolve, 2000)
        })
    }
}

if (typeof window !== undefined) {
    window.Demo = Demo
} else {
    module.exports = Demo
}