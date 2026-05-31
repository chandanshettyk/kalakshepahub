export default function ELibrary() {
const libraries = [
{
name: "Project Gutenberg",
url: "https://www.gutenberg.org",
icon: "📖",
},
{
name: "Open Library",
url: "https://openlibrary.org",
icon: "📚",
},
{
name: "Google Books",
url: "https://books.google.com",
icon: "🔍",
},
{
name: "Internet Archive",
url: "https://archive.org/details/books",
icon: "🏛️",
},
{
name: "NCERT Books",
url: "https://ncert.nic.in/textbook.php",
icon: "🎓",
},
{
name: "NDLI",
url: "https://ndl.iitkgp.ac.in",
icon: "📘",
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
📚 E-Library </h1>

  <div
    style={{
      display: "flex",
      flexWrap: "wrap",
      gap: "25px",
      justifyContent: "center",
    }}
  >
    {libraries.map((library, index) => (
      <a
        key={index}
        href={library.url}
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
          transition: "0.3s",
          boxShadow:
            "0 8px 32px rgba(0,0,0,0.3)",
        }}
      >
        <div
          style={{
            fontSize: "60px",
          }}
        >
          {library.icon}
        </div>

        <h2>{library.name}</h2>

        <p>
          Click to open resource
        </p>
      </a>
    ))}
  </div>
</div>


);
}
