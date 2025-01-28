using Microsoft.AspNetCore.Mvc;
using static CSharpFullStackProject.Models.RoomDB;

namespace CSharpFullStackProject.Routes;

public static class Rooms
{
    public static RouteGroupBuilder MapRoomRoutesApi(this RouteGroupBuilder group)
    {
        group.MapGet("/", GetRooms);
        group.MapGet("/{id}", GetRoomByID);
        group.MapPost("/", AddRoom);
        group.MapPut("/", UpdateRoom);
        group.MapDelete("/{id}", DeleteRoom);

        group.MapPost("/addMeeting/{id}", async (HttpRequest req) =>
        {
            int roomId = (int)(req?.RouteValues["id"] ?? throw new InvalidOperationException());
            var meetingId = (int)(req?.RouteValues["meetingId"] ?? throw new InvalidOperationException());
            AddMeetingToRoom(roomId, meetingId);
        });

        return group;
    }
    
    
}