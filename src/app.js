const logger = require("winston");
const { app } = require("./appConfiguration");

const port = app.get("port");

app.listen(port, () => {
    logger.info(`Sandbox is now running, and is listening on port ${port}`);
});