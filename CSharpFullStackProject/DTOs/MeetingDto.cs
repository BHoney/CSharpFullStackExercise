using System.ComponentModel.DataAnnotations;
using System.Runtime.CompilerServices;

namespace CSharpFullStackProject.DTOs;

public class MeetingDto(int id, string name, string description, DateTime startDate, DateTime endDate, int roomId)
{
    public int Id { get; set; } = id;
    [Required]
    [StringLength(250)]
    public string Name { get; set; } = name;
    [StringLength(250)]
    public string? Description { get; set; } = description;
    [Required]
    public DateTime StartTime { get; set; } = startDate;
    [Required]
    public DateTime EndTime { get; set; } = endDate;
    [Required]
    public int RoomId { get; set; } = roomId;
}