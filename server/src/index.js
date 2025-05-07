import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import mongoose from "mongoose";
import "dotenv/config";
import routes from "./routes/index.js";

const app = express();

// app.use(cors({origin: ["http://localhost:5173/", "http://localhost:3000/", "https://tu-film-website-prototype.vercel.app/", " https://tu-film-website-prototype-ofaz.vercel.app", "https://tufilmwebsiteprototype-web.onrender.com/"]}));
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://tu-film-website-prototype.vercel.app',
  'https://tu-film-website-prototype-ofaz.vercel.app',
  'https://tufilmwebsiteprototype-web.onrender.com'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS: Origin not allowed'));
    }
  },
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use("/api/v1", routes);

const port = process.env.PORT || 5000;

const server = http.createServer(app);

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("Mongodb connected")
    server.listen(port, () => {
        console.log(`Server is listening on port ${port}`)
    })
}).catch((err) => {
    console.log({err})
    process.exit(1)
})
