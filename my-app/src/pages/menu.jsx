import styles from "./App.module.css";
import React, {Component} from 'react';
import { Radio, Tooltip } from 'antd';
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getMenu, getMeal, getOrder } from "./services/exp";
import { useReducer, useRef, useState } from "react";


function FoodMenu(props){
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [value3, setValue3] = useState('');
  const onChange1 = ({ target: { value } }) => {
    console.log('radio1 checked', value);
    setValue1(value);
  };
  const onChange2 = ({ target: { value } }) => {
    console.log('radio2 checked', value);
    setValue2(value);
  };
  const onChange3 = ({ target: { value } }) => {
    console.log('radio3 checked', value);
    setValue3(value);
  };
  let t;
  if (props.time == "Завтрак"){
    t = "br";
  }
  else if (props.time == "Обед"){
    t = "lu";
  }
  else {
    t = "di";
  }
  let v1, v2, v3;
  let n1, n2, n3;
  if (t == "br"){
    n1 = props.dat.br1;
    n2 = props.dat.br2;
    n3 = props.dat.br3;
  }
  else if (t == "lu"){
    n1 = props.dat.lu1;
    n2 = props.dat.lu2;
    n3 = props.dat.lu3;
  }
  else {
    n1 = props.dat.di1;
    n2 = props.dat.di2;
    n3 = props.dat.di3;
  }
  const a1 = useQuery("meals1", () => getMeal(`"${t}1"`, n1));
  const a2 = useQuery("meals2", () => getMeal(`"${t}2"`, n2));
  const a3 = useQuery("meals3", () => getMeal(`"${t}3"`, n3));
  if (a1?.data === undefined){
      return (null);}
  else{
    v1 = a1.data;
  }
  if (a2?.data === undefined){
    return (null);}
  else{
    v2 = a2.data;
  }
  if (a3?.data === undefined){
    return (null);}
  else{
    v3 = a3.data;
  }
  console.log(t);
  console.log(v1);
  console.log(v2);
  console.log(v3);
  const meals1 = [
    {
      label: v1[0].first,
      value: v1[0].first,
    },
    {
      label: v1[0].second,
      value: v1[0].second,
    },
    {
      label: v1[0].third,
      value: v1[0].third,
    },
  ];
  const meals2 = [
    {
      label: v2[0].first,
      value: v2[0].first,
    },
    {
      label: v2[0].second,
      value: v2[0].second,
    },
    {
      label: v2[0].third,
      value: v2[0].third,
    },
  ];
  const meals3 = [
    {
      label: v3[0].first,
      value: v3[0].first,
    },
    {
      label: v3[0].second,
      value: v3[0].second,
    },
    {
      label: v3[0].third,
      value: v3[0].third,
    },
  ];
  return (
    <div conteiner className={styles.foodcont}>
    <p>{props.time}</p>
      <Tooltip placement="bottom" 
      trigger={['hover']} 
      anchorId="someId"
      title={value1}
      overlay={value1 + " рецепт"}>
        <Radio.Group options={meals1} size="large" onChange={onChange1} value={value1} className={styles.foodrad} optionType="button" />
        </Tooltip>
      <br />
      <br />
      <Radio.Group options={meals2} size="large" onChange={onChange2} value={value2} className={styles.foodrad} optionType="button" />
      <br />
      <br />
      <Radio.Group options={meals3} size="large" onChange={onChange3} value={value3} className={styles.foodrad} optionType="button" />
      <br />
      <br />
    </div>
    )
};

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

function OrderR(){
  let meals1 = ['суп', 'каша', 'оливье'];
  return(<div>
    Завтрак
    {meals1.map((meal) => {
              return <li>{meal}</li>;
            })}
    </div>
  )
}

export function MenuPage() {
  const [todaymenu, setTodaymenu] = useState(1);
  const menu = useQuery("menu", getMenu(13));
  console.log(menu?.data);
  if (menu?.data === undefined){
    return (null);}
  else if (todaymenu !== menu?.data[0]?.ord){
    setTodaymenu(menu.data[0].ord);
  }
  if (todaymenu){
  return (
    <div>
    <Header />
    <div conteiner className={styles.content}>
      <div conteiner className={styles.menu}>
        <div conteiner className={styles.days}>
          <button>назад</button>
          <p> день недели и число </p>
          <button>вперед</button>
        </div>
        <FoodMenu time="Завтрак" dat={menu.data[0]} />
        <FoodMenu time="Обед" dat={menu.data[0]}/>
        <FoodMenu time="Ужин" dat={menu.data[0]}/>
        <div conteiner className={styles.foodcont}>
        <button onClick={() => setTodaymenu(0)}><Link to={"/menu"}>подтвердить</Link></button></div>
      </div>
    </div>
    </div>
  );}
  else{
    return(
      <div><Header />
      <div conteiner className={styles.content}>
      <div conteiner className={styles.menu}>
        <div conteiner className={styles.days}>
          <button>назад</button>
          <p> день недели и число </p>
          <button>вперед</button>
        </div>
        <p>Ваш Заказ</p>
      <div conteiner className={styles.foodcont}>
        <div conteiner className={styles.food}>
          <OrderR /><br />
          <OrderR /><br />
          <OrderR /><br />
        </div>
        <div conteiner className={styles.foodcont}>
        <button onClick={() => setTodaymenu(1)}><Link to={"/menu"}>изменить</Link></button></div>
        </div>
        </div>
      </div>
      </div>
    )
  }
}
