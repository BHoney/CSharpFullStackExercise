namespace CSharpFullStackProject.Models;

public record Room
{
    public int Id { get; set; }
    public string Name { get; set; }
    public List<Meeting> Meetings { get; set; }
}

public class RoomDB
{
    private static List<Room> _rooms = new List<Room>()
    {
        new Room { Id = 1, Name = "A1", Meetings = new List<Meeting>() },
        new Room { Id = 2, Name = "A2", Meetings = new List<Meeting>() },
        new Room { Id = 3, Name = "A3", Meetings = new List<Meeting>() },
    };

    public static List<Room> GetRooms()
    {
        return _rooms;
    }

    public static Room? GetRoomByID(int id)
    {
        return _rooms.FirstOrDefault(x => x.Id == id);
    }

    public static void AddRoom(Room room)
    {
        _rooms.Add(room);
    }

    public static Room UpdateRoom(Room update)
    {
       _rooms = _rooms.Select(room =>
       {
           if (room.Id == update.Id)
           {
               room.Name = update.Name;
               room.Meetings = update.Meetings;
           }
           return room;
       }).ToList();
       return update;
    }

    public static Room AddMeetingToRoom(int roomId, int meetingId)
    {
        var meeting = GetMeetingById(meetingId);
        
        _rooms = _rooms.Select(room =>
        {
            if (room.Id == roomId)
            {
                room.Meetings.Add(meeting);
            }

            return room;
        }).ToList();
        return _rooms.FirstOrDefault(x => x.Id == roomId);
    }

    public static Room RemoveMeetingFromRoom(int roomId, int meetingId)
    {
        var meeting = GetMeetingById(meetingId);
        
        _rooms = _rooms.Select(room =>
        {
            if (room.Id == roomId)
            {
                if (room.Meetings.Contains(meeting))
                {
                    room.Meetings.Remove(meeting);
                }
            }
            return room;
        }).ToList();
        return _rooms.FirstOrDefault(x => x.Id == roomId);
    }

    public static void DeleteRoom(int roomId)
    {
        _rooms = _rooms.FindAll(room => room.Id != roomId).ToList();
    }

    private static Meeting GetMeetingById(int id)
    {
        var meeting = MeetingDB.GetMeetingById(id);
        if (meeting == null)
        {
            throw new ArgumentException($"No meeting with the given ID {id} was found");
        }
        return meeting;
    }
}

