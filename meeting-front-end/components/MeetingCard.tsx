import {Card, CardHeader, CardBody, CardFooter} from "@heroui/card";
import {Button} from "@heroui/button";
import {getLocalTimeZone, now} from "@internationalized/date";
import {Divider} from "@heroui/divider";

const meeting = {
    "name": "Meeting Name Goes Here",
    "room": "Room 1A",
    "description": " \n" +
        "\n" +
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce elit nunc, viverra ut laoreet sed, malesuada vitae ex. Donec sit amet tellus convallis est laoreet molestie eget ut leo. Suspendisse ut volutpat tortor. Donec arcu orci, convallis nec ante vitae, fermentum consequat enim. Suspendisse vitae elit lorem. Vestibulum nec erat sed nisl ornare dictum at ut felis. Morbi non euismod mauris, id elementum metus. Suspendisse eu ante a tellus blandit aliquam sit amet sit amet neque. Morbi porta, ligula vel volutpat euismod, massa nunc consequat purus, at feugiat tortor justo eu mi. Nulla viverra et dui quis tincidunt. Pellentesque accumsan arcu id augue facilisis facilisis. Suspendisse nec ex in dui luctus faucibus.\n" +
        "\n" +
        "Donec in lorem ex. Nam id ultrices dolor. Sed volutpat ipsum volutpat, cursus nisi placerat, blandit leo. Fusce bibendum ipsum nec eleifend pharetra. Vestibulum vel euismod lectus, et efficitur ex. Quisque aliquam viverra congue. Pellentesque sagittis dignissim lorem. ",
    "startTime": now(getLocalTimeZone())
}


export function MeetingCard() {

    const onClick = () => {
        console.log("Edit");
    }

    return (
        <Card className="max-w-[400px] ">
            <CardHeader className="">
                <div className="flex gap-12">
                    <div className="pl-2">
                        <h1 className="text-2xl font-extrabold">{meeting.name}</h1>
                        <h3 className="font-light text-xs text-gray-400">{meeting.startTime.toDate().toLocaleTimeString()} (In {45} minutes)</h3>
                    </div>
                </div>
            </CardHeader>
            <Divider/>
            <CardBody>
                <p className="p-4">{meeting.description}</p>
            </CardBody>
            <Divider/>
            <CardFooter>
                <Button variant="bordered" className="border-green-300 hover:text-white hover:bg-green-600 transition delay-300 duration-300 ease-in-out" onPress={onClick}>Edit</Button>
            </CardFooter>
        </Card>
    )
}