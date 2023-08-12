const url = "http://192.168.1.71:3000/users";

export function getUserWithPhone(phone) {
  return fetch(url + "?phone=" + phone, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((json) => json[0])
    .catch((e) => console.log(e));
}

export function getUserWithId(id) {
  return fetch(url + "/" + id, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((json) => json)
    .catch((e) => console.log(e));
}

export function getUserWithPosts(id){
  return fetch(url + "/" + id+"?_embed=posts", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((json) => json)
    .catch((e) => console.log(e));
}

export function addUser(user) {
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((json) => console.log(json))
    .catch((e) => console.log(e));
}

export function searchUserByNickName(nickName, userId) {
  return fetch(url + "?nickName_like=" + nickName + "&id_ne=" + userId, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((json) => json)
    .catch((e) => console.log(e));
}

export function updateInfoUser(user, id) {
  return fetch(url + "/" + id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
    })
    .catch((e) => console.log(e));
}

export function getUserWithArr(arr) {
  return fetch(url, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((json) => 
      json.filter((item) => {
        return arr.includes(item.id);
      })
    )
    .catch((e) => console.log(e));
}
