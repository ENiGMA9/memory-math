class Hello {
    mainAction(req, res) {
        res.send("Hello");
    }
}

module.exports = new Hello();