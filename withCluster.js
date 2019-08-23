const os = require("os");
const cluster = require("cluster");

if (cluster.isMaster) {
    const n_cpus = os.cpus().length;
    console.log(`Forking ${n_cpus} CPUS`);
    for (let i = 0; i < n_cpus; i++) {
        cluster.fork();
    }
} else {
    const express = require("express");
    const app = express();
    const dotenv = require("dotenv");

    dotenv.config({ "path": ".env" });

    const port = process.env.PORT;
    const { spawn } = require("child_process");
    const pid = process.pid;
    const server = app.listen(port, () => {
        console.log(`Server: process ${pid} is running on port: ${port}`);
    });

    app.get("/", (req, res, next) => {
        for (var i = 0; i < 2e6; i++) { }
        res.send(`process ${pid} hello world`);
    });

}