namespace CSharpFullStackProject.DTOs;

public record MeetingResponseDto(
    int Id,
    string Name,
    string? Description,
    DateTime StartTime,
    DateTime EndTime,
    string? RoomName
    );