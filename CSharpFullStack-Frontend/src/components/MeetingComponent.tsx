export interface Meeting {
    name: string,
    description?: string,
    startTime: Date,
    id: number
}

interface MeetingComponentProps extends Meeting{}

export default function MeetingComponent({name, description, startTime, id}: MeetingComponentProps) {
    
    const convertStartTime = (startTime: string | number | Date) => {
        const convertedStartTime = new Date(startTime);
        return convertedStartTime.toLocaleTimeString();
    }
    
    
    return (
        <div className="hover:bg-gray-200 transition duration-100 overflow-hidden rounded-lg shadow-lg bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 flex-auto" key={id}> 
            <div className="px-6 py-4">
                <h4 className="mb-3 text-xl font-semibold tracking-tight text-gray-800 dark:text-gray-300">
                    {name}
                </h4>
                <h5 className="mb-3 text-sm tracking-tight text-gray-400 font-light">
                    {
                        convertStartTime(startTime)
                    } (In 45 Minutes)
                </h5>
                <hr/>
                <p className="leading-normal text-base text-grey-700 dark:text-gray-300">
                    {description}
                </p>
            </div>
        </div>
    )
}