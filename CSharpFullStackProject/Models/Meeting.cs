using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace CSharpFullStackProject.Models;

[Table("Meetings")]
public record Meeting
{
    public int Id { get; set; }
    [Required]
    [Display(Name = "Meeting Name")]
    [StringLength(250)]
    public string Name { get; set; }
    
    [Display(Name="Meeting Description")]
    [StringLength(500)]
    public string? Description { get; set; }
    
    [Required]
    [Display(Name = "Meeting Start Time")]
    public DateTime StartTime { get; set; }
    
    [Required]
    [Display(Name = "Meeting End Time")]
    public DateTime EndTime { get; set; }

    // TODO: We need to set up Many-to-One for this
    // [Required] public Room Room { get; set; } = null!;
    // [Required]
    // public int RoomId { get; set; }
}

public class MeetingDb : DbContext
{
    public MeetingDb(DbContextOptions<MeetingDb> options) : base(options) {}

    public DbSet<Meeting> Meetings { get; set; } = null!;
}
