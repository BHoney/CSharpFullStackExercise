using Microsoft.EntityFrameworkCore;

namespace CSharpFullStackProject.Models;

public record Meeting
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public string? Description { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
}

public class MeetingDb : DbContext
{
    public MeetingDb(DbContextOptions<MeetingDb> options) : base(options) {}

    public DbSet<Meeting> Meetings { get; set; } = null!;
}

// private static List<Meeting> _meetings =
    // [
    //     new Meeting
    //     {
    //         Id = 0, Name = "Meetings and You!", Description = "A meeting about meetings", StartTime = DateTime.Now,
    //         EndTime = DateTime.Now.AddMinutes(30)
    //     },
    //
    //     new Meeting
    //     {
    //         Id = 1, Name = "Standup - Engineering", Description = "Engineering team standup", StartTime = DateTime.Now,
    //         EndTime = DateTime.Now.AddMinutes(30)
    //     },
    //
    //     new Meeting
    //     {
    //         Id = 2, Name = "All Hands", Description = "We're all having a meeting now", StartTime = DateTime.Now,
    //         EndTime = DateTime.Now.AddMinutes(30)
    //     }
    //
    // ];
    //
    // public static List<Meeting> GetMeetings() => _meetings;
    // public static Meeting GetMeetingById(int id) => _meetings.FirstOrDefault(m => m.Id == id);
    // public static void AddMeeting(Meeting meeting) => _meetings.Add(meeting);
    //
    // public static Meeting UpdateMeeting(Meeting update)
    // {
    //     _meetings = _meetings.Select(meeting =>
    //     {
    //         if (meeting.Id == update.Id)
    //         {
    //             meeting.Name = update.Name;
    //             meeting.Description = update.Description;
    //             meeting.StartTime = update.StartTime;
    //             meeting.EndTime = update.EndTime;
    //         }
    //         return meeting;
    //     }).ToList();
    //     return update;
    // }
    //
    // public static void DeleteMeeting(int id) => _meetings = _meetings.Where(room => room.Id != id).ToList();
// }