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
    const result = await db.all("SELECT * FROM orders WHERE date = " + (data / 1000 / 60 / 60 / 24 - (data / 1000 / 60 / 60 / 24 % 1)) + " AND place = " + place);
    res.send(result);
  });

app.get("/orders", async (req, res) => {
    const data = req.query.data;
    const parsedData = Number(data)
    
    if(!data){
      res.send("Data is undefined");
      return;
    }

    if(Number.isNaN(parsedData)){
      res.send("Data not a digit");
      return;
    }

    const result = await db.all(`SELECT * FROM orders WHERE date = ${(data / 1000 / 60 / 60 / 24 - (data / 1000 / 60 / 60 / 24 % 1))}`);
    res.send(result);
  });

app.get("/meal", async (req, res) => {
    const time = req.query.time;
    const num = req.query.num;
    const result = await db.all("SELECT * FROM meals WHERE foodtime = " + time + " AND number = " + num);
    res.send(result);
  });

app.get("/post_order", async (req, res) => {
    const { date, place, bri, brt, brj, lui, lut, luj, dii, dit, dij, name } = req.query;
    const result = await db.all("INSERT INTO orders (date, place, br1, br2, br3, lu1, lu2, lu3, di1, di2, di3, name) VALUES (" + (date / 1000 / 60 / 60 / 24 - (date / 1000 / 60 / 60 / 24 % 1)) + ", " + place + ", " + bri + ", " + brt + ", " + brj + ", " + lui + ", " + lut + ", " + luj + ", " + dii + ", " + dit + ", " + dij + ", " + name + ")");
    res.send({"result": "ok"});
  });

app.get("/del_order", async (req, res) => {
  const data = req.query.data;
  const place = req.query.place;
  console.log(data);
  const result = await db.all(`DELETE FROM orders WHERE date = ${(data / 1000 / 60 / 60 / 24 - (data / 1000 / 60 / 60 / 24 % 1))} AND place = ` + place);
  res.send({"result": "ok"});
  });

app.get("/getcount", async (req, res) => {
    const data = req.query.data;
    const meal = req.query.meal;
    const time = req.query.time;
    const result = await db.all(`SELECT Count(*) as count FROM orders WHERE ${time} = "${meal}" AND date LIKE ${data}`);
    res.send(result);
    });

app.get("/getlogins", async (req, res) => {
    const result = await db.all("SELECT login FROM people");
    res.send(result);
     });

app.get("/getname", async (req, res) => {
    const login = req.query.login;
    const result = await db.all(`SELECT * FROM people WHERE login = "${login}"`);
    res.send(result);
    });     

     
app.listen(5000, ()=>{
    console.log(123);
});
