import axios from "axios"

const api = axios.create({
  // baseURL: "https://jsonplaceholder.typicode.com",
  baseURL: "http://localhost:3000",
})

export const fetchPosts = () => {
  const allPosts = api.get("/posts")
  return allPosts
}

//Delete Method
export const deletePosts = (id) => {
  const allPosts = api.delete(`/posts/${id}`)
  return allPosts
}

//Post Method
export const postData = (post) => {
  const Post = api.post("/posts/", post)
  return Post
}

//Post Method
export const updateData = (id, post) => {
  const Post = api.put(`/posts/${id}`, post)
  return Post
}
