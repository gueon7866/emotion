import React, { useState,useEffect } from 'react'
import "./Editor.css"
import Button from './Button'
import EmotionItem from './EmotionItem'
import { useNavigate } from 'react-router-dom'
const emotionList = [
    { emotionId: 1, emotionName: "완전 좋음" },
    { emotionId: 2, emotionName: "좋음" },
    { emotionId: 3, emotionName: "그럭저럭" },
    { emotionId: 4, emotionName: "나쁨" },
    { emotionId: 5, emotionName: "끔찍함" },
];

const getString=(targetDate)=>{
    let year = targetDate.getFullYear()
    let month = targetDate.getFullMonth()+1
    let date = targetDate.getDate()

    if(month<10){
        month `0${month}`
    }
    if(date<10){
        date=`0${date}`
    }

    return `${year}-${month}-${date}`
} 

const Editor = ({ onSubmit,initData }) => {
    // const emotionId = 4

    const nav = useNavigate()

    useEffect(()=>{

        if(initData){
            setInput({
                ...initData,
                createdDate:new(Number(initData.createdDate))
            })
        }
        
    } ,[initData])

    const [input, setInput] = useState({
        createdDate: new Date(),
        emotionId: 3,
        content: ""
    })

    const onChangeInput = (e) => {
        let name = e.target.name;
        let value = e.target.value

        if (name === 'createdDate') {
            value = new Date(value)
        }

        setInput({
            ...input,
            [name]: value
        })
    }

    const onSubmitButtonClick = () => {
        onSubmit(input)
    }
    return (
        <div className='Editor'>
            <section className="date-section">
                <h4>오늘의 날짜</h4>
                <input
                    name='createdDate'
                    onChange={onChangeInput}
                    type="date"
                    value={getStringDate(input.createdDate)}
                />
            </section>
            <section className="emotion-section">
                {emotionList.map((item) => (
                    <EmotionItem
                        key={item.emotionId}
                        {...item}
                        isSelected={item.emotionId == input.emotionId}
                        onClick={() =>
                            onChangeInput({
                                target: {
                                    name: 'emotionId',
                                    value: item.emotionId
                                }
                            })
                        }
                    />

                ))}


            </section>
            <section className="content-section">
                <h4>오늘의 일기</h4>
                <textarea
                    name="content"
                    value={input.content}
                    onChange={onChangeInput}
                    placeholder='오늘은 어땠나요?'>

                </textarea>
            </section>
            <section className="button-section">
                <Button text={"취소하기"} onClick={() => nav(-1)} />
                <Button text={"작성완료"}
                    onClick={onSubmitButtonClick}
                    type={'POSITIVE'} />
            </section>
        </div>
    )
}

export default Editor