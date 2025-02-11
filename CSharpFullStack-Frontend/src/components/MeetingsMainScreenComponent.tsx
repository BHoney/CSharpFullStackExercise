import {useEffect, useState} from "react";
import RoomComponent, {Room} from "./RoomComponent.tsx";
import axios from "axios";

export default function MeetingsMainScreenComponent (){
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<Room[]>([]);
    useEffect(() => {
        async function getData() {
            const response = await axios.get("http://localhost:5114/public/rooms");
            console.log(response.data);
            setData(response.data);
            setLoading(false);
        }
        getData();
    }, []);

    return (
        <div className="dark:bg-gray-950">
            <div className="">
                {!isLoading ? (
                    data.map((r) => (
                        <RoomComponent key={r.id} id={r?.id} name={r?.name} meetings={r?.meetings}/>
                    ))) : (<div>Loading...</div>)
                }
            </div>
        </div>
    )
}