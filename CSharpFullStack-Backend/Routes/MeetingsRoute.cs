using CSharpFullStackProject.DTOs;
using CSharpFullStackProject.Models;
using CSharpFullStackProject.Services;
using Microsoft.EntityFrameworkCore;

namespace CSharpFullStackProject.Routes;

public static class MeetingsRoute
{
    public static RouteGroupBuilder MapMeetingRoutesApi(this RouteGroupBuilder group)
    {
        group.MapGet(
            "/",
            async (IMeetingService meetingService) =>
            {
                var meetings = await meetingService.GetAllMeetingsAsync();
                return Results.Ok(meetings);
            }
        );

        group.MapGet(
            "/{id}",
            async (IMeetingService meetingService, int id) =>
            {
                var meeting = await meetingService.GetMeetingByIdAsync(id);
                return meeting != null ? Results.Ok(meeting) : Results.NotFound();
            }
        );

        group.MapPost(
            "/",
            async (IMeetingService meetingService, MeetingDto meetingDto) =>
            {
                try
                {
                    var meeting = await meetingService.CreateMeetingAsync(meetingDto);
                    return Results.Created($"/meetings/{meeting.Id}", meeting);
                }
                catch (KeyNotFoundException ex)
                {
                    return Results.NotFound(ex.Message);
                }
            }
        );

        group.MapPut(
            "/{id}",
            async (IMeetingService meetingService, int id, MeetingDto meetingDto) =>
            {
                var meeting = await meetingService.UpdateMeetingAsync(id, meetingDto);
                return meeting != null ? Results.Ok(meeting) : Results.NotFound();
            }
        );

        group.MapDelete(
            "/{id}",
            async (IMeetingService meetingService, int id) =>
            {
                var result = await meetingService.DeleteMeetingAsync(id);
                return result ? Results.Ok() : Results.NotFound();
            }
        );

        return group;
    }
}
