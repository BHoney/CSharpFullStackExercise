using CSharpFullStackProject.Models;
using Microsoft.EntityFrameworkCore;
using static CSharpFullStackProject.Models.MeetingDb;

namespace CSharpFullStackProject.Routes;

public static class MeetingsRoute
{
    public static RouteGroupBuilder MapMeetingRoutesApi(this RouteGroupBuilder group)
    {
        group.MapGet("/", async (MeetingDb db) => await db.Meetings.ToListAsync());
        
        group.MapGet("/{id}", async (MeetingDb db, int id) => await db.Meetings.FirstOrDefaultAsync(m => m.Id == id));
        
        group.MapPost("/", async (MeetingDb db, Meeting meeting) =>
        {
            await db.Meetings.AddAsync(meeting);
            await db.SaveChangesAsync();
            return Results.Created($"/Meetings/{meeting.Id}", meeting);
        });
            
        group.MapPut("/", async (MeetingDb db, Meeting update, int id) =>
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
        
        group.MapDelete("/{id}", async (MeetingDb db, int id) =>
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