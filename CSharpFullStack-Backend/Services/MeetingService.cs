using CSharpFullStackProject.DTOs;
using CSharpFullStackProject.Models;
using Microsoft.EntityFrameworkCore;

namespace CSharpFullStackProject.Services;

public interface IMeetingService
{
    Task<List<MeetingResponseDto>> GetAllMeetingsAsync();
    Task<MeetingResponseDto?> GetMeetingByIdAsync(int id);
    Task<MeetingResponseDto> CreateMeetingAsync(MeetingDto meetingDto);
    Task<MeetingResponseDto?> UpdateMeetingAsync(int id, MeetingDto meetingDto);
    Task<bool> DeleteMeetingAsync(int id);
}

public class MeetingService : IMeetingService
{
    private readonly RoomDb _db;

    public MeetingService(RoomDb db)
    {
        _db = db;
    }

    public async Task<List<MeetingResponseDto>> GetAllMeetingsAsync()
    {
        var meetings = await _db.Meetings.Include(m => m.Room).ToListAsync();

        return meetings
            .Select(m => new MeetingResponseDto(
                m.Id,
                m.Name,
                m.Description,
                m.StartTime,
                m.EndTime,
                m.Room.Name
            ))
            .ToList();
    }

    public async Task<MeetingResponseDto?> GetMeetingByIdAsync(int id)
    {
        var meeting = await _db.Meetings.Include(m => m.Room).FirstOrDefaultAsync(m => m.Id == id);

        if (meeting == null)
            return null;

        return new MeetingResponseDto(
            meeting.Id,
            meeting.Name,
            meeting.Description,
            meeting.StartTime,
            meeting.EndTime,
            meeting.Room.Name
        );
    }

    public async Task<MeetingResponseDto> CreateMeetingAsync(MeetingDto meetingDto)
    {
        var room = await _db
            .Rooms.Include(r => r.Meetings)
            .FirstOrDefaultAsync(r => r.Id == meetingDto.RoomId);

        if (room == null)
            throw new KeyNotFoundException($"Room with ID {meetingDto.RoomId} not found");

        var meeting = new Meeting(
            0,
            meetingDto.Name,
            meetingDto.Description ?? "No description provided",
            meetingDto.StartTime,
            meetingDto.EndTime,
            meetingDto.RoomId
        );

        room.Meetings.Add(meeting);
        await _db.SaveChangesAsync();

        return new MeetingResponseDto(
            meeting.Id,
            meeting.Name,
            meeting.Description,
            meeting.StartTime,
            meeting.EndTime,
            room.Name
        );
    }

    public async Task<MeetingResponseDto?> UpdateMeetingAsync(int id, MeetingDto meetingDto)
    {
        var meeting = await _db.Meetings.Include(m => m.Room).FirstOrDefaultAsync(m => m.Id == id);

        if (meeting == null)
            return null;

        meeting.Name = meetingDto.Name;
        meeting.Description = meetingDto.Description;
        meeting.StartTime = meetingDto.StartTime;
        meeting.EndTime = meetingDto.EndTime;

        await _db.SaveChangesAsync();

        return new MeetingResponseDto(
            meeting.Id,
            meeting.Name,
            meeting.Description,
            meeting.StartTime,
            meeting.EndTime,
            meeting.Room.Name
        );
    }

    public async Task<bool> DeleteMeetingAsync(int id)
    {
        var meeting = await _db.Meetings.FindAsync(id);
        if (meeting == null)
            return false;

        _db.Meetings.Remove(meeting);
        await _db.SaveChangesAsync();
        return true;
    }
}
