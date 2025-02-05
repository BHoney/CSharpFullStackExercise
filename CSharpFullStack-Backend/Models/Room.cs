using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace CSharpFullStackProject.Models;

[Table("Rooms")]
public class Room(int id, string name)
{
    public int Id { get; private init; } = id;

    [Required]
    [StringLength(150)]
    public string Name { get; set; } = name;

    public ICollection<Meeting> Meetings { get; set; } = new List<Meeting>();

    public override string ToString() => $"ID: {Id}, Room {Name}. This room has {Meetings.Count} meetings.";
}

[Table("Meetings")]
public class Meeting(int id, string name, string description, DateTime startTime, DateTime endTime, int roomId) 
{
    public int Id { get; private init; } = id;

    [Required]
    [Display(Name = "Meeting Name")]
    [StringLength(250)]
    public string Name { get; set; } = name;

    [Display(Name="Meeting Description")]
    [StringLength(500)]
    public string? Description { get; set; } = description;

    [Required]
    [Display(Name = "Meeting Start Time")]
    public DateTime StartTime { get; set; } = startTime;

    [Required]
    [Display(Name = "Meeting End Time")]
    public DateTime EndTime { get; set; } = endTime;

    [ForeignKey("RoomId")]
    [Required] public int RoomId { get; init; } = roomId;
    [Required] public Room Room { get; init; } = null!;
}

public class RoomDb: DbContext
{   
    public RoomDb(DbContextOptions<RoomDb> options): base(options) {}
    public DbSet<Room> Rooms { get; set; } = null!;
    public DbSet<Meeting> Meetings { get; set; } = null!;
    
}

