using CSharpFullStackProject.Models;
using Microsoft.EntityFrameworkCore;

namespace CSharpFullStackProject.Routes;

public static class RoomsRoute
{
    public static RouteGroupBuilder MapRoomRoutesApi(this RouteGroupBuilder group)
    {
        group.MapGet("/", async (RoomDb db) => await db.Rooms.ToListAsync());
        group.MapGet("/{id}", async (RoomDb db, int id) => await db.Rooms.FirstOrDefaultAsync(x => x.Id == id));
        group.MapPost("/", async (RoomDb db, Room room) =>
        { 
            await db.Rooms.AddAsync(room);
            await db.SaveChangesAsync();
            return Results.Created($"/rooms/{room.Id}", room);
        });
        group.MapPut("/", async (RoomDb db, Room update, int id) =>
        {
            var room = await db.Rooms.FindAsync(id);
            if (room is null) return Results.NotFound();
            room.Name = update.Name;
            room.Meetings = update.Meetings;
            await db.SaveChangesAsync();
            return Results.NoContent();
            
        });
        group.MapDelete("/{id}", async (RoomDb db, int id) =>
        {
            var room = await db.Rooms.FindAsync(id);
            if (room is null) return Results.NotFound();
            db.Rooms.Remove(room);
            await db.SaveChangesAsync();
            return Results.Ok();
        }); 

        return group;
    }
    
    
    private static async Task<Meeting> GetMeetingById(RoomDb db, int id)
    {
        var meeting = await db.Meetings.FindAsync(id);
        if (meeting == null)
        {
            throw new ArgumentException($"No meeting with the given ID {id} was found");
        }
        return meeting;
    }
    
}