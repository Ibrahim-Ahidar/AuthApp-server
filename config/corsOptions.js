const whitelist = require("./whiteList");
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
}
// app.use(cors(corsOptions));

module.exports = corsOptions;