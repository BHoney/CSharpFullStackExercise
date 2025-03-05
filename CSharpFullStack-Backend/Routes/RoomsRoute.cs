using CSharpFullStackProject.DTOs;
using CSharpFullStackProject.Models;
using CSharpFullStackProject.Services;
using Microsoft.EntityFrameworkCore;

namespace CSharpFullStackProject.Routes;

public static class RoomsRoute
{
    public static RouteGroupBuilder MapRoomRoutesApi(this RouteGroupBuilder group)
    {
        group.MapGet(
            "/",
            async (IRoomService roomService) =>
            {
                try
                {
                    var roomDtos = await roomService.GetAllRooms();
                    return Results.Ok(roomDtos);
                }
                catch (Exception ex)
                {
                    return Results.Problem(ex.Message);
                }
            }
        );

        group.MapGet(
            "/{id}",
            async (IRoomService roomService, int id) =>
            {
                try
                {
                    var roomDto = await roomService.GetRoomById(id);
                    return Results.Ok(roomDto);
                }
                catch (KeyNotFoundException ex)
                {
                    return Results.NotFound(ex.Message);
                }
                catch (Exception ex)
                {
                    return Results.Problem(ex.Message);
                }
            }
        );

        group.MapPost(
            "/",
            async (IRoomService roomService, RoomDto roomDto) =>
            {
                try
                {
                    var room = await roomService.CreateRoom(roomDto);
                    return Results.Created($"/rooms/{room.Id}", room);
                }
                catch (Exception ex)
                {
                    return Results.Problem(ex.Message);
                }
            }
        );

        group.MapPut(
            "/{id}",
            async (IRoomService roomService, int id, Room update) =>
            {
                try
                {
                    await roomService.UpdateRoom(id, update);
                    return Results.NoContent();
                }
                catch (KeyNotFoundException ex)
                {
                    return Results.NotFound(ex.Message);
                }
                catch (Exception ex)
                {
                    return Results.Problem(ex.Message);
                }
            }
        );

        group.MapDelete(
            "/{id}",
            async (IRoomService roomService, int id) =>
            {
                try
                {
                    await roomService.DeleteRoom(id);
                    return Results.Ok();
                }
                catch (KeyNotFoundException ex)
                {
                    return Results.NotFound(ex.Message);
                }
                catch (Exception ex)
                {
                    return Results.Problem(ex.Message);
                }
            }
        );

        return group;
    }
}
