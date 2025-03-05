import {Form} from "@heroui/form"
import {Input, Textarea} from "@heroui/input";
import {Button} from "@heroui/button";
import {useState} from "react";
import {Select, SelectItem} from "@heroui/select";
import {DatePicker} from "@heroui/date-picker";
import {getLocalTimeZone, now} from "@internationalized/date";
import {Divider} from "@heroui/divider";

const rooms = [
    {"name": "Room 1A"},
    {"name": "Room 1B"},
    {"name": "Room 2A"},
    {"name": "Room 2B"},
]


export function MeetingForm() {
    const [submitted, setSubmitted] = useState(null);

    const onSubmit = (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.currentTarget));

        // @ts-ignore
        setSubmitted(data);
    };

    return (
        <Form
            className="w-full max-w-xs border-1 rounded-lg border-black p-2"
            onSubmit={onSubmit}
            validationBehavior="native">
            <Input
                label="Meeting Name"
                labelPlacement="outside"
                isRequired
                name="name"
                placeholder="Enter meeting name"
                type="text"
            />
            <Select
                items={rooms}
                label="Select room"
                labelPlacement="outside"
                placeholder="Select a room"
                >
                {rooms.map((room) => <SelectItem>{room.name}</SelectItem>)}
            </Select>
            <Textarea
                label="Description"
                labelPlacement="outside"
                placeholder="Enter meeting description"
            />
            <DatePicker
                showMonthAndYearPickers
                label="Meeting date"
                defaultValue={now(getLocalTimeZone())}
                labelPlacement="outside"
            />
            <Divider/>
            <div className="grid grid-cols-2 gap-2">
            <Button className="border-1 border-green-300 hover:bg-green-300" type="submit" variant="bordered">Submit</Button>
            <Button className="border-red-300 border-1 hover:bg-red-300" variant="bordered">Cancel</Button>
            </div>
        </Form>
    );
} 