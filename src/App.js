import { nanoid } from "nanoid"
import React from "react"
import Question from "./Components/Question"


export default function App(){
    const [on,setOn] = React.useState(false)
    const [questions,setQuestions] = React.useState([])
    const [buttonClicked,setButtonClicked] = React.useState(false)
    const [correctAnswers,setCorrectAnswers] = React.useState([])
    const [newGame,setNewGame]  = React.useState(false)
    function convertData(data) {
        let arr = data.map(d => {
            let answers = [{answer:d.correct_answer,correct:true,id:nanoid(),selected:false,color:""}]
            d.incorrect_answers.forEach(answer => {
                answers.push({answer:answer,correct:false,id:nanoid(),selected:false,color:""})
            });
            return {
                question : d.question,
                id:nanoid(),
                answers:answers
            }
        })
        return arr
    }
    React.useEffect(()=>{
        fetch("https://opentdb.com/api.php?amount=10")
            .then(res => res.json())
            .then(data => {setQuestions(convertData(data.results))})
        // setQuestions(convertData(data.results))
    },[newGame])
     function handelClick(Qid,Aid) {
         setQuestions(prevQuestions => {
            let abc = []
             for (const question of prevQuestions) {
                 if (question.id === Qid) {
                     let arr = []
                     for (const answer of question.answers) {
                         if (answer.id === Aid) {

                             arr.push(
                                 {
                                     ...answer,
                                     selected:!answer.selected
                                 }
                             )
                         } else {
                             arr.push(
                                 {
                                     ...answer,
                                     selected:false
                                 }
                             )
                         }
                     }
                     abc.push( {
                         ...question,
                         answers:arr
                     })
                 }else{
                    abc.push(question)
                 }
             }
             return abc
         })
     }

    const questionComponents = questions.map(question => (
        <Question 
            key={question.id} 
            id={question.id} 
            question={question.question} 
            answers={question.answers} 
            handelClick={handelClick} 
            buttonClicked={buttonClicked} 
        />
    ))

    function checkAnswers() {

        setQuestions(prevQuestions => {
            let abc = []
             for (const question of prevQuestions) {
                     let arr = []
                     for (const answer of question.answers) {
                        if (answer.selected && answer.correct) {
                            setCorrectAnswers(prevValue => [...prevValue,answer.id])
                         }
                         if ( answer.correct) {
                             arr.push(
                                 {
                                     ...answer,
                                     color:"#94D7A2"
                                 }
                             )
                         } else if(answer.selected && !answer.correct) {
                             arr.push(
                                 {
                                     ...answer,
                                     color:"#F8BCBC"
                                 }
                             )
                         }else{
                             arr.push(answer)
                         }
                     }
                     abc.push( {
                         ...question,
                         answers:arr
                     })
             }
             return abc
         })

        // questions.forEach(question => {
        //     question.answers.forEach(answer => {
        //         if (answer.selected && answer.correct) {
        //             setCorrectAnswers(prevValue => [...prevValue,answer.id])
        //             setQuestions(prevQuestions => {
        //                 prevQuestions.map(q => {
        //                     q.answers.map(prevAnswer =>(
        //                         prevAnswer.id === answer.id ?
        //                             {...prevAnswer , color:"green"} :
        //                             prevAnswer
        //                     ))
        //                 })
        //             })
        //         }
        //     })
        // });
        setButtonClicked(true)
    }

    function resetGame() {
        setNewGame(prev =>!prev)
        setCorrectAnswers([])
        setButtonClicked(prev =>!prev)
    }

    return(
        on ? <main>
        {questionComponents}
        {!buttonClicked && <button className="button" onClick={checkAnswers}>Check Answers</button>}
        {buttonClicked && 
            <div className="endGame--container">
                <p>You scored {correctAnswers.length}/{questions.length} correct answers</p>
                <button className="button" onClick={resetGame}>Play again</button>
            </div>}
        </main> : 
        <main className="startGame--container">
            <h1>Quizzical</h1>
            <p>A small quizz game made by Wassim Jhinaoui</p>
            <button className="button" onClick={()=> setOn(true)}>Start Quiz</button>
        </main>
    )
}