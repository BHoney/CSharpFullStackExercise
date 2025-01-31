using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace CSharpFullStackProject.Models;

public record Room
{
    [Key]
    public int Id { get; set; }
    public required string Name { get; set; }
    public ICollection<Meeting> Meetings { get; set; } = new List<Meeting>();
}

public class RoomDb: DbContext
{   
    public RoomDb(DbContextOptions<RoomDb> options): base(options) {}
    public DbSet<Room> Rooms { get; set; } = null!;
}

