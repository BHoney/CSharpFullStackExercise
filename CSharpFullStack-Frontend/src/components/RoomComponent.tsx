import MeetingComponent, {Meeting} from "./MeetingComponent.tsx";

export interface Room {
    id: number;
    name: string;
    meetings: Meeting[]
}

interface RoomComponentProps extends Room{}

export default function RoomComponent({name, meetings}: RoomComponentProps) {
    return (
        <div className="">
            <div className="bg-sky-700 dark:bg-purple-700 text-gray-200 text-3xl dark:text-grey-400 font-sans flex
            ">
                <h1 className="p-5">{name ?? "Missing Room"} </h1>
                <hr className="w-auto h-px my-6 bg-gray-100 border-0 dark:bg-gray-700"/>
            </div>
            {/*    For Each Day, create a table of meetings */}
            <div className="text-black dark:text-grey-400 text-2xl flex-2 flex-col max-w-9/10">
                <h1 className="px-4 py-4 dark:text-white">Today</h1>
                <hr/>
                {
                    meetings?.map(meeting => (
                        <div className="py-2">
                            <MeetingComponent
                                key={meeting.id}
                                id={meeting.id}
                                name={meeting.name}
                                description={meeting.description}
                                startTime={meeting.startTime}/>
                        </div>
                    ))
                }
                </div>
            </div>
       
    )
}