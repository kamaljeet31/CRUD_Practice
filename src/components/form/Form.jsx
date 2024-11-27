/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { postData, updateData } from "../../Api/Api"

// eslint-disable-next-line react/prop-types
const Form = ({ data, setData, updateApiData, setUpdateApiData }) => {
  const [addData, setAddData] = useState({
    title: "",
    body: "",
  })
  let isEmpty = Object.keys(updateApiData).length === 0

  useEffect(() => {
    updateApiData &&
      setAddData({
        title: updateApiData.title || "",
        body: updateApiData.body || "",
      })
  }, [updateApiData])

  const handleInputChange = (event) => {
    event.preventDefault()
    const name = event.target.name
    const value = event.target.value

    setAddData((prev) => {
      return { ...prev, [name]: value }
    })
  }

  const addPostData = async () => {
    const res = await postData(addData)
    console.log("res", res.data)

    if (res.status === 201) {
      setData([...data, res.data])
      setAddData({ title: "", body: "" })
    }
  }

  const updatePostData = async () => {
    try {
      const res = await updateData(updateApiData.id, addData)
      console.log("res", res.data)
      console.log("res", res)

      setData((prev) => {
        return prev.map((curElem) => {
          return curElem.id === res.data.id ? res.data : curElem
        })
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()
    const action = event.nativeEvent.submitter.value
    if (action === `Add`) {
      addPostData()
    } else if (action === `Edit`) {
      updatePostData()
      setAddData({ title: "", body: "" })
      setUpdateApiData({})
    }
  }

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="title"></label>
          <input
            htmlFor="text"
            placeholder="Add Title"
            id="title"
            name="title"
            autoComplete="off"
            value={addData.title}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="body"></label>
          <input
            htmlFor="text"
            placeholder="Add Title"
            id="body"
            name="body"
            autoComplete="off"
            value={addData.body}
            onChange={handleInputChange}
          />
        </div>
        {/* <button disabled={isDisabled} type="submit"> */}
        <button type="submit" value={isEmpty ? `Add` : `Edit`}>
          {isEmpty ? `Add` : `Edit`}
        </button>
      </form>
    </>
  )
}

export default Form
