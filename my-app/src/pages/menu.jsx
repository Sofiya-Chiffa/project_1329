import styles from "./App.module.css";
import { useQuery } from "react-query";
import React, {Component} from 'react';
import { useState, useRef } from 'react';
import { Radio, Tooltip } from 'antd';
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getMenu, getMeal, getOrder } from "./services/exp";


function FoodMenu(){
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
  const meals = [
    {
      label: 'суп',
      value: 'суп',
    },
    {
      label: 'каша',
      value: 'каша',
    },
    {
      label: 'оливье',
      value: 'оливье',
    },
  ];
  return (
    <div conteiner className={styles.foodcont}>
    <p>Завтрак</p>
      <Tooltip placement="bottom" 
      trigger={['hover']} 
      anchorId="someId"
      title={value1}
      overlay={value1 + " рецепт"}>
        <Radio.Group options={meals} size="large" onChange={onChange1} value={value1} className={styles.foodrad} optionType="button" />
        </Tooltip>
      <br />
      <br />
      <Radio.Group options={meals} size="large" onChange={onChange2} value={value2} className={styles.foodrad} optionType="button" />
      <br />
      <br />
      <Radio.Group options={meals} size="large" onChange={onChange3} value={value3} className={styles.foodrad} optionType="button" />
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
  const [todaymenu, setTodaymenu] = useState(true);
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
        <FoodMenu />
        <FoodMenu />
        <FoodMenu />
        <div conteiner className={styles.foodcont}>
        <button onClick={() => setTodaymenu(false)}><Link to={"/menu"}>подтвердить</Link></button></div>
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
        <button onClick={() => setTodaymenu(true)}><Link to={"/menu"}>изменить</Link></button></div>
        </div>
        </div>
      </div>
      </div>
    )
  }
}
