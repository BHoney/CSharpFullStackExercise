using CSharpFullStackProject.Models;
using CSharpFullStackProject.Routes;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

//get connection strings
var connectionString = builder.Configuration.GetConnectionString("MeetingDB") ?? "Data Source=Meeting.db";
// builder.Services.AddSqlite<MeetingDb>(connectionString);
builder.Services.AddSqlite<RoomDb>(connectionString);

//build swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(o =>
{
    o.SwaggerDoc("v1", new OpenApiInfo
    {
        Version = "v1",
        Title = "Meeting API",
        Description = "An API used to find available meeting rooms and set appointments.",
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API");
    });
}


// Hello World Route
app.MapGet("/", () => "Hello C Sharp API");

app.MapGroup("/public/rooms")
    .MapRoomRoutesApi()
    .WithTags("Rooms");

app.MapGroup("/public/meetings")
    .MapMeetingRoutesApi()
    .WithTags("Meetings");

app.Run();