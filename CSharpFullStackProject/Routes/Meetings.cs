using static CSharpFullStackProject.Models.MeetingDB;

namespace CSharpFullStackProject.Routes;

public static class Meetings
{
    public static RouteGroupBuilder MapMeetingRoutesApi(this RouteGroupBuilder group)
    {
        group.MapGet("/", GetMeetings);
        group.MapGet("/{id}", GetMeetingById);
        group.MapPost("/{id}", AddMeeting);
        group.MapPut("/", UpdateMeeting);
        group.MapDelete("/{id}", DeleteMeeting);
        return group;
    }
}