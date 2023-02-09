import styles from "./App.module.css";
import React, {Component} from 'react';
import { Link } from "react-router-dom";
import { Menu, Table, Checkbox, Col, Row } from 'antd';
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getMenu, getMeal, getOrders, getTest, getCount, getName, getLogins } from "./services/exp";
import { useReducer, useRef, useState } from "react";

var username;
const wokers = ['bigboss'];

export function LoginPage() {
    const logins =  useQuery(["logins"], () => getLogins()).data;
    const [login, setLogin] = useState("");
    // username = useQuery(["name"], () => getName(login)).data;
    if (logins === undefined){
        return(null);
    }
    var loginslist = [];
    for (let i = 0; i < logins.length; ++i){
        loginslist.push(logins[i].login)
    }
    return(
        <div conteiner className={styles.content}>
        <div conteiner className={styles.menu}>
        <div conteiner className={styles.foodcont}>
            <h1>Вход</h1>
            <br /><br />
            <input type="text" onChange={(e) => setLogin(e.target.value)}/>
            <br />
            <button onClick={() => loginfunck(login, loginslist)}>войти</button>                  
        </div></div></div>
    )
}


export function loginfunck(login, loginslist){
    if (loginslist.includes(login)){
        username = login;
        console.log(username);
        if (wokers.includes(username)){
            window.location.assign('http://localhost:3000/table');}
        else{
        window.location.assign('http://localhost:3000/menu');}
    }
    else if (loginslist.includes(login)){
    }
    else{
        alert("wrong login");
    }
}

export function UserName(){
    console.log(username);
    return(username);
}