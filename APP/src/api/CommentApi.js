const url = "http://192.168.1.71:3000/comments";

export function addComment(comment) {
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  })
    // .then((res) => res.json())
    // .then((json) => console.log(json))
    .catch((e) => {
      console.log(e);
    });
}

export function getAllCommentWithPostId(postId) {
  return fetch(url + "?postId=" + postId+"&_sort=createdAt&_order=desc", {
    method: "GET",
  })
    .then((res) => res.json())
    .catch((e) => console.log(e));
}

export function deleteCommentWithPostId(postId){
  return fetch(url + "?postId="+postId,{
    method: "DELETE"
  })
  .catch(e => console.log(e));
}
