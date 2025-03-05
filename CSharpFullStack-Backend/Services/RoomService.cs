using CSharpFullStackProject.DTOs;
using CSharpFullStackProject.Models;
using Microsoft.EntityFrameworkCore;

namespace CSharpFullStackProject.Services;

public class RoomService
{
    private readonly RoomDb _db;

    public RoomService(RoomDb db)
    {
        _db = db;
    }

    public async Task<List<RoomResponseDto>> GetAllRooms()
    {
        var rooms = await _db.Rooms.Include(r => r.Meetings).ToListAsync();
        return rooms
            .Select(r => new RoomResponseDto(
                r.Id,
                r.Name,
                r.Meetings.Select(m => new MeetingResponseDto(
                        m.Name,
                        m.Description,
                        m.StartTime,
                        m.EndTime,
                        r.Name
                    ))
                    .ToList()
            ))
            .ToList();
    }

    public async Task<RoomResponseDto> GetRoomById(int id)
    {
        var room = await _db.Rooms.Include(r => r.Meetings).FirstOrDefaultAsync(x => x.Id == id);

        if (room == null)
            throw new KeyNotFoundException($"Room with ID {id} not found");

        return new RoomResponseDto(
            room.Id,
            room.Name,
            room.Meetings.Select(m => new MeetingResponseDto(
                    m.Name,
                    m.Description,
                    m.StartTime,
                    m.EndTime,
                    room.Name
                ))
                .ToList()
        );
    }

    public async Task<Room> CreateRoom(RoomDto roomDto)
    {
        var room = new Room(0, roomDto.Name);
        await _db.Rooms.AddAsync(room);
        await _db.SaveChangesAsync();
        return room;
    }

    public async Task UpdateRoom(int id, Room update)
    {
        var room = await _db.Rooms.FindAsync(id);
        if (room is null)
            throw new KeyNotFoundException($"Room with ID {id} not found");

        room.Name = update.Name;
        room.Meetings = update.Meetings;
        await _db.SaveChangesAsync();
    }

    public async Task DeleteRoom(int id)
    {
        var room = await _db.Rooms.FindAsync(id);
        if (room is null)
            throw new KeyNotFoundException($"Room with ID {id} not found");

        _db.Rooms.Remove(room);
        await _db.SaveChangesAsync();
    }

    private async Task<Meeting> GetMeetingById(int id)
    {
        var meeting = await _db.Meetings.FindAsync(id);
        if (meeting == null)
        {
            throw new KeyNotFoundException($"No meeting with the given ID {id} was found");
        }
        return meeting;
    }
}
