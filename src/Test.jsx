import { useEffect, useState } from "react"
import { fetchPosts } from "./Api/Api"

const Test = () => {
  const [data, setData] = useState([])

  const posts = async () => {
    const allData = await fetchPosts()
    setData(allData?.data)
  }
  console.log(data)

  useEffect(() => {
    posts()
  }, [])

  return (
    <>
      <ol>
        {data?.map((currItem) => {
          return (
            <>
              <li key={currItem.id}>
                <p>Title: {currItem.title}</p>
                <p>Body: {currItem.body}</p>
              </li>
            </>
          )
        })}
      </ol>
    </>
  )
}

export default Test
