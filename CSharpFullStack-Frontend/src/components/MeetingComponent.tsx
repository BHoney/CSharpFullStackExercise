import React from "react";

interface MeetingComponentProps {
    meetingName?: string,
    description?: string,
    startTime?: Date,
    id?: React.Key
}

export default function MeetingComponent({meetingName, description, startTime, id}: MeetingComponentProps) {
    return (
        <div className="py-2" key={id}>
            <div className="flex border-4 rounded-xl h-25 py-1 border-gray-20">
                <div className="flex-2 px-8 py-3 border-r-4 text-xl text-center">
                    <h1>{startTime?.toLocaleTimeString()}</h1>
                    <p className="font-light">(in 45 minutes) </p>
                </div>
                <div className="px-8 border-r-4 flex-2 content-center">
                    <p className="">{ meetingName }</p>
                </div>
                <div className="px-9 font-light text-lg flex-6 flex-wrap">{description}
                </div>
                <div className="py-4">
                    <a href="">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                             stroke="currentColor" className="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"/>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    )
}