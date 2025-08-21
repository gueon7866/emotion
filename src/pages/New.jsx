...
import {useContext, useState} from 'react'
import {DiaryDispatchContext} from '../App'
const New = () => {

  const {onCreate}=useContext(DiaryDispatchContext)

  const onSubmit =(input)=>{
    onCreate(
      input.createdDate.getTime(),
      input.emotionId,
      input.content
    )
  }

  return (
    <div>
      <Header 
      title={"새 일기 쓰기"}
      leftChild={<Button text={"< 뒤로가기"}/>}
      />
      <Editor onSubmit={onSubmit}/>
    </div>
  )
}

export default New