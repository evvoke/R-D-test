// modules
const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const data_service = require('./data_service.js');

// global Analysis and Building data for tables (express handlebars)
var allData;

// server - listen on port/localhost 8080
let HTTP_PORT = process.env.PORT || 8080;

// successful server connection will output this to console
function onHttpStart() {
    console.log("Express HTTP server listening on: " + HTTP_PORT);
}

// allow .hbs extensions to be handled correctly
// set the global default layout to our layout.hbs file
app.engine(".hbs", exphbs({
    extname: ".hbs",
    defaultLayout: 'layout',
    helpers: { 
        equal: function(v1, v2, options) {
            if(v1 === v2) {
              return options.fn(this);
            }
            return options.inverse(this);
        }
    }
}));
app.set("view engine", ".hbs");

// routes
    // task1
    app.get("/", (req, res) => {
        data_service.task1()
        .then((task) => {
            res.render("task1", { data: allData.Analytics, task: task });
        })
        .catch((reason) => {
            res.render("task1", { error: reason });
        });
    });
    // task2
    app.get("/task2", (req, res) => {
        data_service.task2()
        .then((task) => {
            res.render("task2", { data: allData.Analytics, task: task });
        })
        .catch((reason) => {
            res.render("task2", { error: reason });
        });
    });
    // task3
    app.get("/task3", (req, res) => {
        data_service.task3()
        .then((task) => {
            res.render("task3", { data: allData.Analytics, task: task });
        })
        .catch((reason) => {
            res.render("task3", { error: reason });
        });
    });
    // task4
    app.get("/task4", (req, res) => {
        data_service.task4()
        .then((task) => {
            res.render("task4", { data: allData, task: task });
        })
        .catch((reason) => {
            res.render("task4", { error: reason });
        });
    });
    // task5
    app.get("/task5", (req, res) => {
        data_service.task5()
        .then((task) => {
            res.render("task5", { data: allData, task: task });
        })
        .catch((reason) => {
            res.render("task5", { error: reason });
        });
    });
    // task6
    app.get("/task6", (req, res) => {
        data_service.task6()
        .then((task) => {
            res.render("task6", { data: allData, task: task });
        })
        .catch((reason) => {
            res.render("task6", { error: reason });
        });
    });
    // unidentified route
    app.use((req, res) => {
        res.status(404).send("Page Not Found!");
    });

// setup http server (listen to HTTP_PORT)
data_service.initialize()
    .then((data) => {
        allData = data;
        app.listen(HTTP_PORT, onHttpStart);
    });