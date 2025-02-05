namespace CSharpFullStackProject.DTOs;

public record MeetingResponseDto(
    string Name,
    string? Description,
    DateTime StartTime,
    DateTime EndTime,
    string? RoomName
    );