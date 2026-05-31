export default function Music() {
const musicApps = [
{
name: "Spotify",
url: "https://spotify.com",
icon: "🎧",
},
{
name: "YouTube Music",
url: "https://music.youtube.com",
icon: "▶️",
},
{
name: "JioSaavn",
url: "https://www.jiosaavn.com",
icon: "🎵",
},
{
name: "Gaana",
url: "https://gaana.com",
icon: "🎶",
},
{
name: "Wynk Music",
url: "https://wynk.in/music",
icon: "📻",
},
{
name: "SoundCloud",
url: "https://soundcloud.com",
icon: "☁️",
},
];

return (
<div
style={{
minHeight: "100vh",
background: "#0f172a",
color: "white",
padding: "30px",
}}
>
<h1
style={{
textAlign: "center",
marginBottom: "40px",
}}
>
🎵 Music Hub </h1>
  <div
    style={{
      display: "flex",
      flexWrap: "wrap",
      gap: "25px",
      justifyContent: "center",
    }}
  >
    {musicApps.map((app, index) => (
      <a
        key={index}
        href={app.url}
        target="_blank"
        rel="noreferrer"
        style={{
          width: "250px",
          padding: "25px",
          textDecoration: "none",
          color: "white",
          borderRadius: "20px",
          background:
            "rgba(255,255,255,0.08)",
          backdropFilter: "blur(15px)",
          border:
            "1px solid rgba(255,255,255,0.1)",
          textAlign: "center",
          boxShadow:
            "0 8px 32px rgba(0,0,0,0.3)",
          transition: "0.3s",
        }}
      >
        <div
          style={{
            fontSize: "60px",
          }}
        >
          {app.icon}
        </div>

        <h2>{app.name}</h2>

        <p>
          Open Music Platform
        </p>
      </a>
    ))}
  </div>
</div>


);
}
