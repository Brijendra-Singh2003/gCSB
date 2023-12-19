require("dotenv").config();

const protectAPI = (req, res, next) => {
    if(req.query?.apikey === process.env.API_KEY) {
        next();
    } else {
        res.status(403).send("unauthorized");
    }
}

module.exports = protectAPI;