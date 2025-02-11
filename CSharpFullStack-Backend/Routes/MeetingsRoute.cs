using CSharpFullStackProject.DTOs;
using CSharpFullStackProject.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static CSharpFullStackProject.Models.RoomDb;

namespace CSharpFullStackProject.Routes;

public static class MeetingsRoute
{
    public static RouteGroupBuilder MapMeetingRoutesApi(this RouteGroupBuilder group)
    {
        group.MapGet("/", async (RoomDb db) =>
        {
            var meetings = await db.Meetings.Include(meeting => meeting.Room).ToListAsync();

            var meetingDtos = meetings.Select(m => new MeetingResponseDto(
                m.Name,
                m.Description,
                m.StartTime,
                m.EndTime,
                m.Room.Name
            )).ToList();
            
            return Results.Ok(meetingDtos);
        });

        group.MapGet("/{id}", async (RoomDb db, int id) => await db.Meetings.FirstOrDefaultAsync(m => m.Id == id));

        group.MapPost("/", async (RoomDb db, MeetingDto meetingDto) =>
        {
            var room = await db.Rooms
                .Include(r => r.Meetings)
                .FirstOrDefaultAsync(r => r.Id == meetingDto.RoomId);
            if (room == null) return Results.NotFound();

            var meeting = new Meeting(
                0,
                meetingDto.Name,
                meetingDto.Description ?? "No description provided",
                meetingDto.StartTime,
                meetingDto.EndTime,
                meetingDto.RoomId
            );

            room.Meetings.Add(meeting);
            await db.SaveChangesAsync();
            
            await db.Entry(meeting).Reference(m => m.Room).LoadAsync();
            var meetingResult = new MeetingResponseDto(meeting.Name, meeting.Description, meeting.StartTime,
                meeting.EndTime, meeting.Room.Name);
            
            
            return Results.Created($"/Meetings/{meeting.Id}", meetingResult);
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