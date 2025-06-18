import express from "express";
import bodyParser from "body-parser"
import multer from "multer";
import { v4 as uuidv4 } from 'uuid';
import session from "express-session";
const app=express();
const port=3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(
//   session({
//     secret: 'your-secret-key', // you can change this
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false }, // set to true only if using HTTPS
//   })
// );
const upload = multer({ dest: "public/uploads/" }); // Files will be saved in /uploads
const posts = [
    {
    id:uuidv4(),
    title: "Unsolved Mysteries in Renaissance Art",
    metaDescription: "Examining five enduring enigmas that continue to puzzle art historians about Renaissance masterpieces.",
    content: "<article><h2>The Mona Lisa's Landscape</h2><p>Art historians have long debated whether the background depicts...</p></article>",
    featuredImage: {
      url: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5",
      alt: "Close-up of Renaissance painting details",
    }
   },
{
  id: uuidv4(),
  title: "The Maya's Advanced Water Purification: Zeolite Technology in 600 CE",
  metaDescription: "Archaeological chemistry proves Tikal's reservoirs used molecular filtration centuries before modern science.",
  content: "<article><h2>The Engineering Marvel</h2><p>Stratigraphic layers show graded quartz sand progressing to...</p></article>",
  featuredImage: {
    url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5",
    alt: "Ancient Maya reservoir excavation site",
  }
},
{
  id: uuidv4(),
  title: "Hacking Your Circadian Rhythm for Peak Performance",
  metaDescription: "Neuroscientist-approved methods to align your biological clock with modern life demands.",
  content: "<article><h2>Light Exposure Protocols</h2><p>10,000 lux morning light exposure resets melatonin production...</p></article>",
  featuredImage: {
    url: "https://images.unsplash.com/photo-1493612276216-ee3925520721",
    alt: "Alarm clock with glowing numbers in dark room",
  }
},

{
  id: uuidv4(),
  title: "Quantum Biology: When Schrödinger's Cat Meets DNA",
  metaDescription: "Groundbreaking research reveals quantum effects in biological systems—with medical implications.",
  content: "<article><h2>Enzyme Catalysis Mystery Solved</h2><p>Quantum tunneling allows hydrogen transfer at speeds classical physics can't explain...</p></article>",
  featuredImage: {
    url: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb",
    alt: "Abstract visualization of quantum biological processes",
  }
},
  {
  id: uuidv4(),
  title: "Japan's Secret Alpine Route: Beyond the Tourist Trail",
  metaDescription: "A local's guide to Tateyama Kurobe's untracked paths and seasonal wonders.",
  content: "<article><h2>Seasonal Considerations</h2><p>The Snow Wall phenomenon (April-June) creates corridors of 20m-high ice...</p></article>",
  featuredImage: {
    url: "https://images.unsplash.com/photo-1492571350019-22de08371fd3",
    alt: "Tateyama Kurobe Alpine Route in autumn",
  }
},
{
  id: uuidv4(),
  slug: "bootstrapping-saas-to-7-figures",
  title: "How We Bootstrapped Our SaaS to $2M ARR Without VC Funding",
  metaDescription: "A transparent case study of growth strategies that worked (and costly mistakes we made).",
  excerpt: "Venture capital isn't the only path—here's how we scaled using customer-funded development and strategic reinvestment...",
  content: "<article><h2>Year 1: The $10K MVP</h2><p>By focusing on a single workflow for dental clinics...</p></article>",
  featuredImage: {
    url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    alt: "Revenue growth chart on laptop screen",
  }
}
];
app.listen(port,()=>{
    console.log(`server running on ${port}`)
})
 
app.get("/",(req,res)=>{
    res.render("index.ejs",{posts});
})
app.get("/contact",(req,res)=>{
    res.render("contact.ejs")
})
app.get("/about",(req,res)=>{
    res.render("about.ejs")
})
app.get("/post",(req,res)=>{
  res.render("post.ejs")
})
app.get("/post/:id", (req, res) => {
  const post = posts.find(p => p.id === req.params.id);
  if (!post) return res.status(404).send("Post not found");
  res.render("post-details.ejs", { post });
});
app.post("/add", upload.single("featuredImage"), (req, res) => {
 const { title, metaDescription, content } = req.body;
  const featuredImage = {
    url: `/uploads/${req.file.filename}`,
    alt: title
  };

  const newPost = {
    id:uuidv4(),
    title,
    metaDescription,
    content,
    featuredImage
  };

  posts.push(newPost); // Save to in-memory or DB
  res.redirect("/");
});

app.get("/message", (req, res) => {
  //  if (req.session.formSubmitted) {
  //   req.session.formSubmitted = false; // clear after viewing
  //   res.render("message.ejs");
  // } else {
  //   res.redirect("/");}
  //Query-method:
    if (req.query.submitted === "true") {
       res.render("message.ejs");
 } else {
    res.redirect("/");
  }
});

app.post("/message", (req, res) => {
  // req.session.formSubmitted=true
  console.log(req.body); // contact form data here
  res.redirect("/message?submitted=true");
});
