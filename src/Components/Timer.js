import React from "react";
import { useTimer } from "use-timer";


export default function Timer(props) {

    const { time, reset } = useTimer({
        initialTime: 90,
        endTime:0,
        autostart:true,
        timerType: 'DECREMENTAL',
        onTimeOver: () => {
            props.checkAnswers()
            reset()
          }
      });
      
    return(
        <div className="Timer">
            {time}
        </div>
    )
}