
const actionController = {
    action: async (req, res) => {
        try {
            res.json("Access Success")
        } catch (err) {
            res.status(500).json(err);
        }
    }
}

module.exports = actionController
