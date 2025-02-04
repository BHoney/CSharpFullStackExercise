using CSharpFullStackProject.Models;
using Microsoft.EntityFrameworkCore;
using static CSharpFullStackProject.Models.RoomDb;

namespace CSharpFullStackProject.Routes;

public static class MeetingsRoute
{
    public static RouteGroupBuilder MapMeetingRoutesApi(this RouteGroupBuilder group)
    {
        group.MapGet("/", async (RoomDb db) => await db.Meetings.ToListAsync());

        group.MapGet("/{id}", async (RoomDb db, int id) => await db.Meetings.FirstOrDefaultAsync(m => m.Id == id));

        group.MapPost("/", async (RoomDb db, Meeting meeting) =>
        {
            var room = await db.Rooms.FindAsync(meeting.RoomId);
            if (room == null) return Results.NotFound();

            await db.Meetings.AddAsync(new Meeting(
                0,
                meeting.Name, 
                meeting.Description, 
                meeting.StartTime, 
                meeting.EndTime,
                meeting.RoomId)
            {
                Room = room
            });
            
            room.Meetings.Add(meeting);
            
            await db.SaveChangesAsync();
            return Results.Created($"/Meetings/{meeting.Id}", meeting);
        });

        group.MapPut("/", async (RoomDb db, Meeting update, int id) =>
        {
            var meeting = await db.Meetings.FindAsync(id);
            if (meeting == null) return Results.NotFound();
            meeting.Name = update.Name;
            meeting.Description = update.Description;
            meeting.StartTime = update.StartTime;
            meeting.EndTime = update.EndTime;
            await db.SaveChangesAsync();
            return Results.Ok(meeting);
        });
        
        group.MapDelete("/{id}", async (RoomDb db, int id) =>
        {
            var meeting = await db.Meetings.FindAsync(id);
            if (meeting == null) return Results.NotFound();
            db.Meetings.Remove(meeting);
            await db.SaveChangesAsync();
            return Results.Ok();
        });
        return group;
    }
}