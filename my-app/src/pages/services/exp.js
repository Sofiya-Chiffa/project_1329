export const getTest = () => {
  console.log("hi");
  return fetch(`http://localhost:5000/`).then((e) => e.json());
};

export const getMenu = (time) => {
    return () => {
    return fetch(`http://localhost:5000/menu?day=${time}`).then((e) =>
      e.json());
  };
};


export const getMeal = (time, num) => {
  return fetch(`http://localhost:5000/meal?time=${time}&num=${num}`).then((e) => e.json());
};

export const getOrder = (data, place) => {
  return fetch(`http://localhost:5000/order?data=${data}&place=${place}`).then((e) => e.json());
};

export const getOrders = (data) => {
  return fetch(`http://localhost:5000/orders?data=${data}`).then((e) => e.json());
};

export const postOrder = (date, place, br1, br2, br3, lu1, lu2, lu3, di1, di2, di3) => {
  console.log(date, place, br1, br2, br3, lu1, lu2, lu3, di1, di2, di3);
  return fetch(`http://localhost:5000/post_order?date=${date}&place=${place}&bri="${br1}"&brt="${br2}"&brj="${br3}"&lui="${lu1}"&lut="${lu2}"&luj="${lu3}"&dii="${di1}"&dit="${di2}"&dij="${di3}"`).then((e) => e.json());
};

export const postChMenu = (data, st) => {
  return fetch(`http://localhost:5000/chmenu?data=${data}&st=${st}`).then((e) => e.json());
};

export const delOrder = (data, place) => {
  return fetch(`http://localhost:5000/del_order?data=${data}&place=${place}`).then((e) => e.json());
};

export const getCount = (data, st) => {
  return fetch(`http://localhost:5000/getcount?data=${data}&st=${st}`).then((e) => e.json());
};