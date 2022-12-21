import styles from "./App.module.css";
import React, {Component} from 'react';
import { Link } from "react-router-dom";
import { Menu, Table, Checkbox, Col, Row } from 'antd';
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getMenu, getMeal, getOrders, getTest } from "./services/exp";
import { useReducer, useRef, useState } from "react";

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
      const orders = useQuery(["orders"], () => getOrders(13));
      let datasplaces = [];
      console.log(orders.data);
      if (orders.data === undefined){
      }
      else {
        orders.data.map((order) => {;
        datasplaces.push(
          {
            key: '1',
            place: order.place,
            name: 'Mike',
            breakfast:   <Checkbox.Group style={{ width: '100%' }}>
              <div className={styles.checkboxcont}><Checkbox value="A">{order.br1}</Checkbox>
              <Checkbox value="B">{order.br2}</Checkbox><Checkbox value="C">{order.br3}</Checkbox></div>
              </Checkbox.Group>,
            lunch:  <Checkbox.Group style={{ width: '100%' }}>
            <div className={styles.checkboxcont}><Checkbox value="A">{order.lu1}</Checkbox>
            <Checkbox value="B">{order.lu2}</Checkbox><Checkbox value="C">{order.lu3}</Checkbox></div>
            </Checkbox.Group>,
            dinner:  <Checkbox.Group style={{ width: '100%' }}>
            <div className={styles.checkboxcont}><Checkbox value="A">{order.di1}</Checkbox>
            <Checkbox value="B">{order.di2}</Checkbox><Checkbox value="C">{order.di3}</Checkbox></div>
            </Checkbox.Group>,

          })})
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
    
      const datasmeals = [
        {
          key: '1',
          name: 'Завтрак',
          places: "1, 4, 6",
          first: <div className={styles.checkboxcont}><div>meat</div><div>meat</div><div>meat</div></div>,
          first_c: <div className={styles.checkboxcont}><div>5</div><div>3</div><div>8</div></div>,
          second: <div className={styles.checkboxcont}><div>meat</div><div>meat</div><div>meat</div></div>,
          second_c: <div className={styles.checkboxcont}><div>5</div><div>3</div><div>8</div></div>,
          therd: <div className={styles.checkboxcont}><div>meat</div><div>meat</div><div>meat</div></div>,
          therd_c: <div className={styles.checkboxcont}><div>5</div><div>3</div><div>8</div></div>,

        },
        {
            key: '1',
            name: 'Обед',
            places:  "1, 9, 3",
            first: <div className={styles.checkboxcont}><div>meat</div><div>meat</div><div>meat</div></div>,
            first_c: <div className={styles.checkboxcont}><div>5</div><div>3</div><div>8</div></div>,
            second: <div className={styles.checkboxcont}><div>meat</div><div>meat</div><div>meat</div></div>,
            second_c: <div className={styles.checkboxcont}><div>5</div><div>3</div><div>8</div></div>,
            therd: <div className={styles.checkboxcont}><div>meat</div><div>meat</div><div>meat</div></div>,
            therd_c: <div className={styles.checkboxcont}><div>5</div><div>3</div><div>8</div></div>,
        },
        {
            key: '1',
            name: 'Ужин',
            places:  "1, 9, 3",
            first: <div className={styles.checkboxcont}><div>meat</div><div>meat</div><div>meat</div></div>,
            first_c: <div className={styles.checkboxcont}><div>5</div><div>3</div><div>8</div></div>,
            second: <div className={styles.checkboxcont}><div>meat</div><div>meat</div><div>meat</div></div>,
            second_c: <div className={styles.checkboxcont}><div>5</div><div>3</div><div>8</div></div>,
            therd: <div className={styles.checkboxcont}><div>meat</div><div>meat</div><div>meat</div></div>,
            therd_c: <div className={styles.checkboxcont}><div>5</div><div>3</div><div>8</div></div>,
        }        
      ];

      const columnsmeals = [
        {
          title: '',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'места',
          dataIndex: 'places',
          key: 'places',
        },
        {
          title: 'первое',
          dataIndex: 'first',
          key: 'first',
        },
        {
          title: 'кол-во',
          dataIndex: 'first_c',
          key: 'first_c',
        },
        {
          title: 'второе',
          dataIndex: 'second',
          key: 'second',
        },
        {
          title: 'кол-во',
          dataIndex: 'second_c',
          key: 'second_c',
        },
        {
          title: 'третье',
          dataIndex: 'therd',
          key: 'therd',
        },
        {
          title: 'кол-во',
          dataIndex: 'therd_c',
          key: 'therd_c',
        },
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
                <button>назад</button>
                <p> день недели и число </p>
                <button>вперед</button>
            </div>
            <Table className={styles.tableandt} dataSource={tabledata} columns={tablecolumn} pagination={false} />
            </div>
            </div>
        </div>
    )
}
