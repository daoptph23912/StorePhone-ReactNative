const url = "http://192.168.1.71:3000/posts";

export function addPosts(post) {
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  })
    // .then((res) => res.json())
    // .then((json) => console.log(json))
    .catch((e) => {
      console.log(e);
    });
}

export function getAllPost() {
  return fetch(
    url + "?_expand=user&_expand=background&_sort=createdAt&_order=desc",
    {
      method: "GET",
    }
  )
    .then((res) => res.json())
    .catch((e) => console.log(e));
}

export function getAllPostWithUserId(userId) {
  return fetch(
    url +
      "?userId=" +
      userId +
      "&_expand=background&_sort=createdAt&_order=desc",
    {
      method: "GET",
    }
  )
    .then((res) => res.json())
    .catch((e) => console.log(e));
}

export function updatePost(postId, post) {
  fetch(url + "/" + postId, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  }).catch((e) => console.log(e));
}

export function getPostWithId(postId) {
  return fetch(url + "/" + postId, {
    method: "GET",
  })
    .then((res) => res.json())
    .catch((e) => console.log(e));
}

export function deletePostWithId(postId) {
  fetch(url + "/" + postId, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((json) => console.log(json))
    .catch((e) => console.log(e));
}
