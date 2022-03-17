import React from "react";

export default function Question(props) {

    return(
        <>
        <div className="question--container">
            <h2 className="question" dangerouslySetInnerHTML={{__html: props.question}}></h2>
            <div className="answers">
                {props.answers.map(answer => (
                    <div 
                        className={props.buttonClicked ? "done" : ""}
                        style={{backgroundColor: answer.selected && answer.color ==="" ? "#D6DBF5" :
                                                 answer.color,
                                border:answer.selected && "none",
                                color:props.buttonClicked && answer.correct && "#293264"
                            }}
                        onClick={() => props.handelClick(props.id,answer.id)} 
                        key={answer.id}
                    >
                        {answer.answer}
                    </div>
                    ))}
            </div>
        </div>
        <hr/>
        </>
    )
}