const { isAllowedOrigin } = require("./whiteList");
const corsOptions = {
    origin: (origin, callback) => {
        if (isAllowedOrigin(origin)) {
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