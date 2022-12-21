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
  console.log(time, num);
  return fetch(`http://localhost:5000/meal?time=${time}&num=${num}`).then((e) => e.json());
};

export const getOrder = (data, place) => {
  return fetch(`http://localhost:5000/order?data=${data}&place=${place}`).then((e) => e.json());
};

export const getOrders = (data) => {
  return fetch(`http://localhost:5000/orders?data=${data}`).then((e) => e.json());
};
