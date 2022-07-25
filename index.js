#!/usr/bin/env node
const fs = require("fs");
const Papa = require("papaparse");
const parser = require("xml2json");
const express = require("express");

const app = express();
const port = 4000;

app.get("/", (req, res, next) => {
  // // fetch json data
  // fs.readFile("./mock-data/json-users.json", (err, data) => {
  //   if (err) throw err;
  //   let users = JSON.parse(data);

  //   res.statusCode = 200;
  //   res.setHeader("Content-Type", "text/html");
  //   res.render("index.pug", {
  //     data: users,
  //   });
  // });

  // read csv data
  // fs.readFile("./mock-data/csv_users.csv", "utf8", (err, data) => {
  //   if (err) throw err;
  //   const userData = Papa.parse(data, { header: true, skipEmptyLines: true });
  //   console.log(userData);

  //   res.statusCode = 200;
  //   res.setHeader("Content-Type", "text/html");
  //   res.render("index.pug", {
  //     data: userData.data,
  //   });
  // });

  // read xml data
  fs.readFile("./mock-data/xml_users.xml", function (err, data) {
    var dataset = parser.toJson(data);
    const {
      dataset: { record },
    } = JSON.parse(dataset);
    res.render("index.pug", {
      data: record,
    });
  });
});

app.use("/user", (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.render("user-form.pug");
});

app.put("/user", (req, res) => {
  res.send("Got a PUT request at /user");
});

app.listen(port, function () {
  console.log(`Listening to Port ${port}`);
});
