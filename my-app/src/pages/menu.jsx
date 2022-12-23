import styles from "./App.module.css";
import React, {Component} from 'react';
import { Radio, Tooltip } from 'antd';
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getMenu, getMeal, getOrder, postOrder, postChMenu, delOrder } from "./services/exp";
import { useReducer, useRef, useState } from "react";

var myoder = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var todmeals = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var whatday = [23, 12, 2022, 5];

function FoodMenu(props){
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [value3, setValue3] = useState('');
  let i = 0;
  if (props.time === "Завтрак"){
    i = 0;
  }
  else if (props.time === "Обед"){
    i = 3;
  }
  else {
    i = 6;
  }
  const onChange1 = ({ target: { value } }) => {
    myoder[i] = value;
    console.log(myoder);
    console.log('radio1 checked', value);
    setValue1(value);
  };
  const onChange2 = ({ target: { value } }) => {
    myoder[i + 1] = value;
    console.log('radio2 checked', value);
    setValue2(value);
  };
  const onChange3 = ({ target: { value } }) => {
    myoder[i + 2] = value;
    console.log('radio3 checked', value);
    setValue3(value);
  };
  let t;
  if (props.time === "Завтрак"){
    t = "br";
  }
  else if (props.time === "Обед"){
    t = "lu";
  }
  else {
    t = "di";
  }
  let n11, n12, n13, n21, n22, n23, n31, n32, n33;
  n11 = props.dat.br1;
  n12 = props.dat.br2;
  n13 = props.dat.br3;
  n21 = props.dat.lu1;
  n22 = props.dat.lu2;
  n23 = props.dat.lu3;
  n31 = props.dat.di1;
  n32 = props.dat.di2;
  n33 = props.dat.di3;
  todmeals[0] = useQuery(["meals11"],  () => getMeal(`"br1"`, n11)).data;
  todmeals[1] = useQuery(["meals12"],  () => getMeal(`"br2"`, n12)).data;
  todmeals[2] = useQuery(["meals13"],  () => getMeal(`"br3"`, n13)).data;
  todmeals[3] = useQuery(["meals21"],  () => getMeal(`"lu1"`, n21)).data;
  todmeals[4] = useQuery(["meals22"],  () => getMeal(`"lu2"`, n22)).data;
  todmeals[5] = useQuery(["meals23"],  () => getMeal(`"lu3"`, n23)).data;
  todmeals[6] = useQuery(["meals31"],  () => getMeal(`"di1"`, n31)).data;
  todmeals[7] = useQuery(["meals32"],  () => getMeal(`"di2"`, n32)).data;
  todmeals[8] = useQuery(["meals33"],  () => getMeal(`"di3"`, n33)).data;
  if (todmeals[0] === undefined || todmeals[1] === undefined || todmeals[2] === undefined || todmeals[3] === undefined || todmeals[4] === undefined || todmeals[5] === undefined || todmeals[6] === undefined || todmeals[7] === undefined || todmeals[8] === undefined){
    return (null);
  }
  let j = 0;
  if (t === "br"){
    j = 0;}
  else if (t === "lu"){
    j = 3;}
  else {
    j = 6;
  }

  const meals1 = [
    {
      label: todmeals[j][0].first,
      value: todmeals[j][0].first,
    },
    {
      label: todmeals[j][0].second,
      value: todmeals[j][0].second,
    },
    {
      label: todmeals[j][0].third,
      value: todmeals[j][0].third,
    },
  ];
  const meals2 = [
    {
      label: todmeals[j+1][0].first,
      value: todmeals[j+1][0].first,
    },
    {
      label: todmeals[j+1][0].second,
      value: todmeals[j+1][0].second,
    },
    {
      label: todmeals[j+1][0].third,
      value: todmeals[j+1][0].third,
    },
  ];
  const meals3 = [
    {
      label: todmeals[j+2][0].first,
      value: todmeals[j+2][0].first,
    },
    {
      label: todmeals[j+2][0].second,
      value: todmeals[j+2][0].second,
    },
    {
      label: todmeals[j+2][0].third,
      value: todmeals[j+2][0].third,
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

function OrderR(props){
  const todorder = useQuery(["ordeeer"], () => getOrder(whatday[0], 1)).data;
  if (todorder === undefined || todorder[0] === undefined){
    return(null);
  }
  let meals;
  if (props.time === "Завтрак"){
    meals = [todorder[0].br1, todorder[0].br2, todorder[0].br3];
  }
  else if (props.time === "Обед"){
    meals = [todorder[0].lu1, todorder[0].lu2, todorder[0].lu3];
  }
  else {
    meals = [todorder[0].di1, todorder[0].di2, todorder[0].di3];
  }
  return(<div>
    {props.time}
    {meals.map((meal) => {
              return <li>{meal}</li>;
            })}
    </div>
  )
}

function ButOk(dat){
  let st = 1;
  const quer = useQuery();
  let a1 = postOrder(whatday[0], 1, myoder[0], myoder[1], myoder[2], myoder[3], myoder[4], myoder[5], myoder[6], myoder[7], myoder[8]);
  let a2 = delOrder(whatday[0], 1);
  let a;
  if (myoder.indexOf(0) === -1){
    if (dat.ord === 1){
        let st = 0;
        a = a1;
    }else {
      st = 1;
      a = a2;
    }}
  else {
    st = 1;
    a = a2}
  const b1 = useQuery(["ChMenu"], () => postChMenu(whatday[0], 1 - dat.ord));
  const b2 = useQuery(["postord"], () => a);
}

function Changed(s){
  console.log(whatday[0]);
  if (s === "+"){
    whatday[0] += 1;
  }
  else{
    whatday[0] -= 1;
  }
  if (whatday[0] < 23){
    whatday[0] = 23;}
  if (whatday[0] > 26){
    whatday[0] = 26;}
}

export function MenuPage() {
  const [todaymenu, setTodaymenu] = useState(1);
  const menu = useQuery("menu", getMenu(whatday[0]));
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
          <button onClick={() => Changed("-")} >назад</button>
          <p> {whatday[0]}.{whatday[1]}.{whatday[2]} </p>
          <button onClick={() => Changed("+")}>вперед</button>
        </div>
        <FoodMenu time="Завтрак" dat={menu.data[0]} />
        <FoodMenu time="Обед" dat={menu.data[0]}/>
        <FoodMenu time="Ужин" dat={menu.data[0]}/>
        <div conteiner className={styles.foodcont}>
        <button onClick={() => ButOk(menu.data[0])}>подтвердить</button></div>
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
          <OrderR time="Завтрак"/><br />
          <OrderR time="Обед"/><br />
          <OrderR time="Ужин"/><br />
        </div>
        <div conteiner className={styles.foodcont}>
        <button onClick={() => ButOk(menu.data[0])}>изменить</button></div>
        </div>
        </div>
      </div>
      </div>
    )
  }
}
