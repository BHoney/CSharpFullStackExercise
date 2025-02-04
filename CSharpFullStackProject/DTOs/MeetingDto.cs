namespace CSharpFullStackProject.DTOs;

public record MeetingDto(
    string Name,
    string? Description,
    DateTime Start,
    DateTime End,
    int RoomId
);