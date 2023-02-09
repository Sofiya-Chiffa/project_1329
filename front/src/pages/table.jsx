import styles from "./App.module.css";
import React, {Component} from 'react';
import { Link } from "react-router-dom";
import { Menu, Table, Checkbox, Col, Row } from 'antd';
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getMenu, getMeal, getOrders, getTest, getCount, getName } from "./services/exp";
import { useReducer, useRef, useState } from "react";
import { UserName } from "./login";

function Header(){
    return(
    <div><div conteiner className={styles.header1}>
      <h1>Заказное меню</h1>
      <h1>имя пользователя</h1>
      </div>
      <div conteiner className={styles.header2}>
      <button conteiner className={styles.headbut}> Столовая </button>
      </div></div>)
  }


export function TablePage() {
  console.log(UserName());
  const newDay = 24 * 60 * 60 * 1000
      const currentDate = new Date().getTime()
      const [date, setDate] = useState(Math.floor(currentDate))
      const orders = useQuery(["orders"], () => getOrders(date));
      let datasplaces = [];
      let todfoodlist = {
      br1: {}, br2: {}, br3: {}, lu1: {},
      lu2: {}, lu3: {}, di1: {}, di2: {}, di3: {}}
      let br1list = [];
      let br2list = [];
      let br3list = [];
      let lu1list = [];
      let lu2list = [];
      let lu3list = [];
      let di1list = [];
      let di2list = [];
      let di3list = [];
      console.log(br1list.join('\n'));
      if (orders.data === undefined){
      }
      else {
        orders.data.map((order) => {;
        datasplaces.push(
          {
            key: '1',
            place: order.place,
            name: order.name,
            breakfast:   <div>
              <div className={styles.checkboxcont}><div>-{order.br1}</div>
              <div>-{order.br2}</div><div>-{order.br3}</div></div>
              </div>,
            lunch:  <div>
            <div className={styles.checkboxcont}><div>-{order.lu1}</div>
            <div>-{order.lu2}</div><div>-{order.lu3}</div></div>
            </div>,
            dinner:  <div>
            <div className={styles.checkboxcont}><div>-{order.di1}</div>
            <div>-{order.di2}</div><div>-{order.di3}</div></div>
            </div>,
          });
        
        if (todfoodlist["br1"][order.br1] !== undefined){
          todfoodlist["br1"][order.br1] += 1}
        else{
          todfoodlist["br1"][order.br1] = 1;
        }
        if (todfoodlist["br2"][order.br2] !== undefined){
          todfoodlist["br2"][order.br2] += 1}
        else{
          todfoodlist["br2"][order.br2] = 1;
        }
        if (todfoodlist["br3"][order.br3] !== undefined){
          todfoodlist["br3"][order.br3] += 1}
        else{
          todfoodlist["br3"][order.br3] = 1;
        }

        if (todfoodlist["lu1"][order.lu1] !== undefined){
          todfoodlist["lu1"][order.lu1] += 1}
        else{
          todfoodlist["lu1"][order.lu1] = 1;
        }
        if (todfoodlist["lu2"][order.lu2] !== undefined){
          todfoodlist["lu2"][order.lu2] += 1}
        else{
          todfoodlist["lu2"][order.lu2] = 1;
        }
        if (todfoodlist["lu3"][order.lu3] !== undefined){
          todfoodlist["lu3"][order.lu3] += 1}
        else{
          todfoodlist["lu3"][order.lu3] = 1;
        }

        if (todfoodlist["di1"][order.di1] !== undefined){
          todfoodlist["di1"][order.di1] += 1}
        else{
          todfoodlist["di1"][order.di1] = 1;
        }
        if (todfoodlist["di2"][order.di2] !== undefined){
          todfoodlist["di2"][order.di2] += 1}
        else{
          todfoodlist["di2"][order.di2] = 1;
        }
        if (todfoodlist["di3"][order.di3] !== undefined){
          todfoodlist["di3"][order.di3] += 1}
        else{
          todfoodlist["di3"][order.di3] = 1;
        }
        
      })
        }
      
      for (let key in todfoodlist["br1"]){
        br1list.push(`${key} ${todfoodlist["br1"][key]}`)     
      }
      for (let key in todfoodlist["br2"]){
        br2list.push(`${key} ${todfoodlist["br2"][key]}`)     
      }
      for (let key in todfoodlist["br3"]){
        br3list.push(`${key} ${todfoodlist["br3"][key]}`)     
      }

      for (let key in todfoodlist["lu1"]){
        lu1list.push(`${key} ${todfoodlist["lu1"][key]}`)     
      }
      for (let key in todfoodlist["lu2"]){
        lu2list.push(`${key} ${todfoodlist["lu2"][key]}`)     
      }
      for (let key in todfoodlist["lu3"]){
        lu3list.push(`${key} ${todfoodlist["lu3"][key]}`)     
      }
      
      for (let key in todfoodlist["di1"]){
        di1list.push(`${key} ${todfoodlist["di1"][key]}`)     
      }
      for (let key in todfoodlist["di2"]){
        di2list.push(`${key} ${todfoodlist["di2"][key]}`)     
      }
      for (let key in todfoodlist["di3"]){
        di3list.push(`${key} ${todfoodlist["di3"][key]}`)     
      }

      const columnsplaces = [
        {
          title: 'место',
          dataIndex: 'place',
          key: 'place',
        },
        {
          title: 'ФИО',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'завтрак',
          dataIndex: 'breakfast',
          key: 'breakfast',
        },
        {
          title: 'обед',
          dataIndex: 'lunch',
          key: 'lunch',
        },
        {
          title: 'ужин',
          dataIndex: 'dinner',
          key: 'dinner',
        },
      ];

      var datasmeals;
      if (todfoodlist === undefined){
      }
      else{
      console.log(todfoodlist);
      datasmeals = [
        {
          key: '1',
          name: 'Завтрак',
          first: <div>-{br1list[0]}<br/>-{br1list[1]}<br/>-{br1list[2]}</div>,
          second: <div>-{br2list[0]}<br/>-{br2list[1]}<br/>-{br2list[2]}</div>,
          therd: <div>-{br3list[0]}<br/>-{br3list[1]}<br/>-{br3list[2]}</div>,

        },
        {
            key: '1',
            name: 'Обед',
            first: <div>-{lu1list[0]}<br/>-{lu1list[1]}<br/>-{lu1list[2]}</div>,
            second: <div>-{lu2list[0]}<br/>-{lu2list[1]}<br/>-{lu2list[2]}</div>,
            therd: <div>-{lu3list[0]}<br/>-{lu3list[1]}<br/>-{lu3list[2]}</div>,
          },
        {
            key: '1',
            name: 'Ужин',
            first: <div>-{di1list[0]}<br/>-{di1list[1]}<br/>-{di1list[2]}</div>,
            second: <div>-{di2list[0]}<br/>-{di2list[1]}<br/>-{di2list[2]}</div>,
            therd: <div>-{di3list[0]}<br/>-{di3list[1]}<br/>-{di3list[2]}</div>,
        }        
      ];}

      const columnsmeals = [
        {
          title: '',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'первое',
          dataIndex: 'first',
          key: 'first',
        },
        {
          title: 'второе',
          dataIndex: 'second',
          key: 'second',
        },
        {
          title: 'третье',
          dataIndex: 'therd',
          key: 'therd',
        }
      ];
    
    const [tablecolumn, setTablecolumn] = useState(columnsplaces);
    const [tabledata, setTabledata] = useState(datasplaces);

    function but(coll){
        if (coll === "places"){
            setTabledata(datasplaces);
            setTablecolumn(columnsplaces);
        }
        if (coll === "meals"){
            setTabledata(datasmeals);
            setTablecolumn(columnsmeals);
        }
    }

    const itemsforbutoons = [
      {
        key: 1,
        label: <Link to={"/table"} onClick={() => but("places")}>столики</Link>,
        value: 'столики',
      },
      {
        key: 2,
        label: <Link to={"/table"} onClick={() => but("meals")}>блюда</Link>,
        value: 'блюда',
      }]

    function incDate(){
        setDate(date + newDay)
      }
    
    function decDate(){
        setDate(date - newDay)
      }

    return(
        <div>
            <Header />
            <div conteiner className={styles.content}>
                <Menu
                className={styles.menuandt}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                items={itemsforbutoons}/>
            <br />
            <div conteiner className={styles.menu}>
            <div conteiner className={styles.days}>
              <button onClick={decDate} >назад</button>
              <p> {(new Date(date)).toLocaleDateString("ru")} </p>
              <button onClick={incDate}>вперед</button>
            </div>
            <Table className={styles.tableandt} dataSource={tabledata} columns={tablecolumn} pagination={false} />
            </div>
            </div>
        </div>
    )
}
