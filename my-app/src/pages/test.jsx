import { useMutation, useQuery, useQueryClient } from "react-query";
import { getMenu, getMeal, getOrder, getTest } from "./services/exp";
import { useReducer, useRef, useState } from "react";

export function TestPage() {
  const data = useQuery("menu", () => getMeal(`"di1"`, 1));
  console.log(data);
  return(<div>
    <MenuShow data={data?.data}/>
  </div>)
}

function MenuShow(props) {
  const { data } = props;
  if (data === undefined){
    return (null);
  }
  else{
  return (
    <div>
      {data.map((dat) => {
        return (
          <h5>{dat.first}</h5>
        )
        })}
    </div>
  )}
}
