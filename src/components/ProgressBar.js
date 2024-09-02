import {useState} from "react";

export default function ProgessBar({newTasks, allTasks}) {

    const [circle, setCircle] = useState({
        diameter: 200
    })

    return <>
        <svg width={circle.diameter * 2} height={circle.diameter * 2}>
            <circle cx={circle.diameter} cy={circle.diameter} r={circle.diameter / 2} fill="none"
                    stroke="lightgrey"
                    strokeWidth={circle.diameter / 5}/>
            <circle cx={circle.diameter} cy={circle.diameter} r={circle.diameter / 2} fill="none"
                    stroke="forestgreen"
                    strokeWidth={circle.diameter / 5}
                    strokeDasharray={`${(1 - newTasks / allTasks) * 618},99999`}
                    strokeLinecap={"round"}
                    transform={`rotate(-90, ${circle.diameter}, ${circle.diameter})`}/>
            <text x={circle.diameter * 0.9}
                  y={circle.diameter * 1.05}
                  fontSize={24}>
                {((1 - newTasks / allTasks) * 100).toFixed(2) } %
            </text>
        </svg>
    </>
}