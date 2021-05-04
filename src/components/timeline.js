import React, {useState} from "react";
import TimelineEvent from './timeline/event'

export default function Timeline({ events, ...props }) {
    const [timelineWidth, setTimelineWidth] = useState(500)
    const [timelineStart, setTimelineStart] = useState(0) 

    const eventComps = events.map((ev, i) => 
        <TimelineEvent event={ev} key={i} timelineWidth={timelineWidth} timelineStart={timelineStart}/>
    )

    const onWheelHandler = (e) => {
        setTimelineWidth(timelineWidth + e.deltaY)
    }

    return (
        <div className="bg-gray-100 flex-1 h-24 overflow-hidden" onWheel={onWheelHandler}>
            <div className="relative h-24">
                {eventComps}
            </div>
        </div>
    );
}