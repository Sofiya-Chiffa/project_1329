import { useMutation, useQuery, useQueryClient } from "react-query";
import { getMenu, getMeal, getOrder, getTest } from "./services/exp";
import { useReducer, useRef, useState } from "react";

export function TestPage() {
  const data = useQuery("menu", getMenu(13));
  console.log(data);
  return(<div>
    <MenuShow data={data}/>
  </div>)
}

function MenuShow(props) {
  const { data } = props;

  return (
    <div>
      {data.map((dat) => {
        return (
          <h5>{dat.day}</h5>
        )
        })}
    </div>
  )
}
