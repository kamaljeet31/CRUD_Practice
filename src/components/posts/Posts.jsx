import { useEffect, useState } from "react"
import { deletePosts, fetchPosts } from "../../Api/Api"
import Form from "../form/Form"

const Posts = () => {
  const [data, setData] = useState([])

  const [updateApiData, setUpdateApiData] = useState({})
  // console.log(updateApiData)

  const posts = async () => {
    const data = await fetchPosts()
    setData(data?.data)
  }

  const handleClick = async (id) => {
    // console.log("clicked", id)
    try {
      const deleteSinglePost = await deletePosts(id)
      console.log(deleteSinglePost)
      if (deleteSinglePost.status === 200) {
        const deletePost = data?.filter((currItem) => currItem.id !== id)
        setData(deletePost)
        return deletePost
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdatePost = (curElem) => {
    setUpdateApiData(curElem)
  }

  useEffect(() => {
    posts()
  }, [])

  return (
    <>
      <section className="section-form">
        <Form
          data={data}
          setData={setData}
          updateApiData={updateApiData}
          setUpdateApiData={setUpdateApiData}
        />
      </section>
      <section className="section-post">
        <ol>
          {data?.map((curElem) => {
            const { body, title, id } = curElem
            return (
              <li key={id}>
                <p>Title: {title}</p>
                <p>Body: {body}</p>
                <button onClick={() => handleUpdatePost(curElem)}>Edit</button>
                <button className="btn-delete" onClick={() => handleClick(id)}>
                  Delete
                </button>
              </li>
            )
          })}
        </ol>
      </section>
    </>
  )
}

export default Posts
