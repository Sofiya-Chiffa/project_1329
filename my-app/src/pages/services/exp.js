export const getTest = () => {
  console.log("hi");
  return fetch(`http://localhost:5000/`).then((e) => e.json());
};

export const getMenu = (time) => {
  return () => {
    console.log("asd");
    return fetch(`http://localhost:5000/menu?data=${time}`).then((e) =>
      e.json()
    );
  };
};


export const getMeal = (time, num) => {
  return fetch(`http://localhost:5000/order?time=${time}&num=${num}`).then((e) => e.json());
};

export const getOrder = (data, place) => {
  return fetch(`http://localhost:5000/order?data=${data}&place=${place}`).then((e) => e.json());
};
