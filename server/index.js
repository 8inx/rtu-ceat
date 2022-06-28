const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8080;
const FileRoute = require('./routes/File.route')
const MediaRoute = require('./routes/Media.route')


app.use(express.json());
app.use(helmet());
app.use(cors());

app.use("/api/file", FileRoute);
app.use("/api/media", MediaRoute);

app.listen(port, (err) => {
    console.log(`Service starts at port:${port}`);
});
