import { nanoid } from "nanoid"
import React from "react"
import Question from "./Components/Question"
import GameOptions from "./Components/GameOptions"
import Timer from "./Components/Timer"


export default function App(){
    const [on,setOn] = React.useState(false)
    const [questions,setQuestions] = React.useState([])
    const [buttonClicked,setButtonClicked] = React.useState(false)
    const [correctAnswers,setCorrectAnswers] = React.useState([])
    const [newGame,setNewGame]  = React.useState(false)
    const [options,setOptions] = React.useState({
        game_category:"",
        game_difficulty:"",
        counter:"without",
        resetCounter:false
    })


    function handleChange(event) {
        const {name, value, type, checked} = event.target
        setOptions(prevOption => {
            return {
                ...prevOption,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }

    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle...
        while (currentIndex !== 0) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
      }

    
    React.useEffect(()=>{
        function convertData(data) {
            let arr = data.map(d => {
                let answers = [{answer:d.correct_answer,correct:true,id:nanoid(),selected:false,color:""}]
                d.incorrect_answers.forEach(answer => {
                    answers.push({answer:answer,correct:false,id:nanoid(),selected:false,color:""})
                });
                shuffle(answers)
                return {
                    question : d.question,
                    id:nanoid(),
                    answers:answers
                }
            })
            return arr
        }
        const category = options.game_category !== "any" ? "&category="+options.game_category:"" 
        const difficulty = options.game_difficulty !== "any" ? "&difficulty="+options.game_difficulty:"" 
        fetch("https://opentdb.com/api.php?amount=10"+category+difficulty)
            .then(res => res.json())
            .then(data => {setQuestions(convertData(data.results)); })
        // setQuestions(convertData(data.results))
    },[newGame,options])


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

    const questionComponents = questions.map((question,index) => (
        <Question 
            key={question.id} 
            id={question.id} 
            rank={index + 1} 
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

        setButtonClicked(true)
    }

    function resetGame() {
        setNewGame(prev =>!prev)
        setCorrectAnswers([])
        setOptions(prev=>{return{...prev,resetCounter:true}})
        setButtonClicked(prev =>!prev)
    }

    function startGame() {
        setOn(true)
    }
    
    return(
        on ? <main>
            {options.counter === "with" && !buttonClicked  && <Timer checkAnswers={checkAnswers} reset={options.resetCounter} />}
            {questionComponents}
            <div className="temp">
                {!buttonClicked && 
                    <><button className="button" onClick={checkAnswers}>Check Answers</button>
                    <button className="button" onClick={()=>setOn(false)}>Main Menu</button>   </> 
                }
                {buttonClicked && 
                <div className="endGame--container">
                    <p>You scored {correctAnswers.length}/{questions.length} correct answers</p>
                    <button className="button" onClick={resetGame}>Play again</button>
                </div>}
                
            </div>
        </main> : 
        <main className="startGame--container">
            <h1>Quizzical</h1>
            <p>A small quizz game made by Wassim Jhinaoui</p>
            <GameOptions options={options} handleChange={handleChange} />
            <button className="button" onClick={startGame}>Start Quiz</button>
        </main>
    )
}