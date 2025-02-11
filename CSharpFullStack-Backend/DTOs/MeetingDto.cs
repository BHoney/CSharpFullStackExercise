using System.ComponentModel.DataAnnotations;
using System.Runtime.CompilerServices;
using System.Text.Json.Serialization;

namespace CSharpFullStackProject.DTOs;

public class MeetingDto(int id, string name, string description, DateTime startTime, DateTime endTime, int roomId) : DTO
{
    public int Id { get; set; } = id;
    [Required]
    [StringLength(250)]
    public string Name { get; set; } = name;
    [StringLength(250)]
    public string? Description { get; set; } = description;
    [Required]
    public DateTime StartTime { get; set; } = startTime;
    [Required]
    public DateTime EndTime { get; set; } = endTime;
    [Required]
    public int RoomId { get; set; } = roomId;
}