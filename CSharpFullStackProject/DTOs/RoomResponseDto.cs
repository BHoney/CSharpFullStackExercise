namespace CSharpFullStackProject.DTOs;

public record RoomResponseDto(
    int id,
    string Name,
    IEnumerable<MeetingResponseDto> Meetings
    );