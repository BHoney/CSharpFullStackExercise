import MeetingComponent from "./MeetingComponent.tsx";

const date = new Date()

// const room = {"id": 1, "roomName": "A Room With No Windows",};

const meetings = [
    {
        "id": 1,
        "meetingName": "A Meeting About Meetings!",
        "startTime": date,
        "Description": "This is a meeting about meetings. Please enjoy the irony of such an event. This text box keeps expanding. This isn't supposed to do that. Is there a maximum limit? Seems there is."
    },
    {
        "id": 2,
        "meetingName": "Layoffs!",
        "startTime": date,
        "Description": "We said there wouldn't be layoffs. We lied!!"
    },

]


interface RoomComponentProps {
    id?: React.Key
    roomName?: string
}

export default function RoomComponent({id, roomName}: RoomComponentProps) {
    return (
        <div className="" key={id}>
            <div className="
            text-black
            text-3xl 
            dark:text-grey-400 
            font-sans 
            flex-2">
                <h1>{roomName ?? "Missing Room"} </h1>
                <hr className="w-auto h-px my-6 bg-gray-100 border-0 dark:bg-gray-700"/>
            </div>
            {/*    For Each Day, create a table of meetings */}
            <div className="text-black dark:text-grey-400 text-2xl flex-2 flex-col">
                <h1 className="px-4 py-4">Today</h1>
                <table>
                    <tbody>
                    {
                        meetings.map(meeting => (
                            <tr key={meeting.id}>
                                <MeetingComponent meetingName={meeting.meetingName} description={meeting.Description}
                                                  startTime={meeting.startTime}/>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}