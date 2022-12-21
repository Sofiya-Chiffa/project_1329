import express from "express";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import cors from "cors";

async function openDB() {
    return open({
      filename: "sqlite.db",
      driver: sqlite3.Database,
    });
  }
  
const db = await openDB();
const app = express();

app.use(cors());

app.get("/", async (req, res) => {
    res.send({"data": "somedata"});
  });

app.get("/menu", async (req, res) => {
    const day = req.query.day;
    const result = await db.all("SELECT * FROM menu WHERE day = " + day);
    res.send(result);
  });

app.get("/order", async (req, res) => {
    const data = req.query.data;
    const place = req.query.place;
    const result = await db.all("SELECT * FROM orders WHERE date = " + data + " AND place = " + place);
    res.send(result);
  });

app.get("/orders", async (req, res) => {
    const data = req.query.data;
    const result = await db.all("SELECT * FROM orders WHERE date = " + data);
    res.send(result);
  });

app.get("/meal", async (req, res) => {
    const time = req.query.time;
    const num = req.query.num;
    const result = await db.all("SELECT * FROM meals WHERE foodtime = " + time + " AND number = " + num);
    res.send(result);
  });

app.listen(5000);
