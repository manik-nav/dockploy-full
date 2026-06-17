var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddOpenApi();
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors();

// Dummy user data
var users = new List<User>
{
    new(1, "Sarah Johnson", "sarah.johnson@example.com", "(555) 234-5678",
        new Address("142 Maple Avenue", "Portland", "OR", "97201"),
        "Sarah is a senior software engineer with over 10 years of experience building scalable web applications. She is passionate about clean code, mentoring junior developers, and contributing to open-source projects. In her free time, she enjoys hiking in the Pacific Northwest and experimenting with sourdough recipes.",
        "https://i.pravatar.cc/300?img=1"),
    new(2, "Marcus Chen", "marcus.chen@example.com", "(555) 345-6789",
        new Address("88 Oak Street", "San Francisco", "CA", "94102"),
        "Marcus is a product designer who bridges the gap between engineering and user experience. With a background in cognitive psychology, he brings a research-driven approach to every project. He has led design systems at two Fortune 500 companies and regularly speaks at design conferences.",
        "https://i.pravatar.cc/300?img=3"),
    new(3, "Emily Rodriguez", "emily.rodriguez@example.com", "(555) 456-7890",
        new Address("305 Birch Lane", "Austin", "TX", "73301"),
        "Emily is a data scientist specializing in natural language processing and machine learning. She holds a PhD from MIT and has published numerous papers on transformer architectures. When not training models, she volunteers at local coding bootcamps to help underrepresented groups enter tech.",
        "https://i.pravatar.cc/300?img=5"),
    new(4, "James Williams", "james.williams@example.com", "(555) 567-8901",
        new Address("720 Cedar Drive", "Denver", "CO", "80201"),
        "James is a DevOps engineer who thrives on automating infrastructure and streamlining CI/CD pipelines. He has migrated dozens of legacy systems to cloud-native architectures. An avid rock climber and amateur photographer, he finds parallels between scaling mountains and scaling systems.",
        "https://i.pravatar.cc/300?img=7"),
    new(5, "Priya Patel", "priya.patel@example.com", "(555) 678-9012",
        new Address("56 Elm Court", "Chicago", "IL", "60601"),
        "Priya is a full-stack developer and tech lead who specializes in building fintech platforms. She has a talent for breaking down complex financial regulations into elegant technical solutions. Outside of work, she runs a popular tech blog and mentors women in STEM.",
        "https://i.pravatar.cc/300?img=9"),
    new(6, "Daniel Kim", "daniel.kim@example.com", "(555) 789-0123",
        new Address("199 Walnut Boulevard", "Seattle", "WA", "98101"),
        "Daniel is a mobile app developer with expertise in both iOS and Android platforms. He has shipped apps with millions of downloads and is known for his obsession with smooth animations and pixel-perfect UI. He also teaches mobile development courses online and has a growing YouTube channel.",
        "https://i.pravatar.cc/300?img=11"),
    new(7, "Olivia Thompson", "olivia.thompson@example.com", "(555) 890-1234",
        new Address("411 Pine Street", "Boston", "MA", "02101"),
        "Olivia is a cybersecurity analyst who helps organizations identify vulnerabilities and build robust defense systems. With certifications in CISSP and CEH, she brings deep expertise to threat modeling and incident response. She is also an advocate for privacy rights and digital ethics.",
        "https://i.pravatar.cc/300?img=16"),
    new(8, "Alexander Wright", "alexander.wright@example.com", "(555) 901-2345",
        new Address("633 Spruce Way", "New York", "NY", "10001"),
        "Alexander is a solutions architect who designs enterprise-scale distributed systems. He has over 15 years of experience working with Fortune 100 companies on their digital transformation journeys. A published author and keynote speaker, he is passionate about making complex technology accessible to everyone.",
        "https://i.pravatar.cc/300?img=12"),
};

// API Endpoints
app.MapGet("/api/users", () => users)
   .WithName("GetAllUsers");

app.MapGet("/api/users/{id:int}", (int id) =>
{
    var user = users.Find(u => u.Id == id);
    return user is not null ? Results.Ok(user) : Results.NotFound();
})
.WithName("GetUserById");

app.Run();

// Records
internal record Address(string Street, string City, string State, string Zip);
internal record User(int Id, string Name, string Email, string Phone, Address Address, string Bio, string ImageUrl);
