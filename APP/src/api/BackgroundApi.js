const url = "http://192.168.1.71:3000/backgrounds";

export function getAllBackground() {
    return fetch(url,{
      method: "GET",
    })
      .then((res) => res.json())
      .then((json) => json)
      .catch((e) => console.log(e));
  }

  export function getBackgroundWithId(id) {
    return fetch(url + "/" + id, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((json)=> json)
      .catch((e) => console.log(e));
  }
  // 192.168.0.105