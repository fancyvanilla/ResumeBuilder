const Groq=require("groq-sdk")
const express= require('express');
const cors=require('cors');
require('dotenv').config();
const fs = require('fs'); 
const multer = require("multer");
const { v4: uuidv4 } = require('uuid');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY});
const path = require("path");
const app=express()
const PORT=4000
app.use(express.json());
app.use(cors()); 
app.get("/health", (req, res) => {
    res.json({ status: "Server is running" });
}); 

function generateID() {
    return uuidv4();
  }

app.use("/uploads", express.static("uploads"));

const upload_dir= "uploads";
if (!fs.existsSync(upload_dir)) {
    fs.mkdirSync(upload_dir);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, upload_dir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 },
});

const GROQFunction = async (text) => {
    const response = await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: text,
          },
        ],
        model: "llama3-8b-8192",
      });
    return response.choices[0]?.message?.content || "";
};

app.post("/resume/create", upload.single("headshotImage"), async (req, res) => {
    try{
    const {
        fullName,
        currentPosition,
        currentLength,
        currentTechnologies,
        phoneNumber,
        address,
        email,
        workHistory, 
        educationHistory,
    } = req.body;

    const workArray = JSON.parse(workHistory); 
    const educationArray=JSON.parse(educationHistory)

    const newEntry = {
        id: generateID(),
        fullName,
        phoneNumber,
        address,
        email,
        image_url: `http://192.168.19.28/api/v1/uploads/${req.file.filename}`,
        currentPosition,
        currentLength,
        currentTechnologies,
        workHistory: workArray,
        education:educationArray
    };
    const remainderText = (history) => {
        let stringText="";
        for (let i = 0; i < history.length; i++) {
            stringText += ` ${history[i].name} as a ${history[i].position}.`;
        }
        return stringText;
    };
const prompt1 = `Write a 100-word first-person description for the top of a resume.Do not include any introductory phrases, explanations, or any phrases like "Here is". Only provide the description. Start the description immediately. Details: 
Name: ${fullName} 
Role: ${currentPosition} (${currentLength} years) 
Technologies: ${currentTechnologies}.`;

const prompt2 = `Skills:
Provide exactly 50 words describing my skills. Do not include any introductory phrases, explanations, or any phrases like "Here is". Only provide the description. Start the description immediately. Details:
Name: ${fullName}
Technologies: ${currentTechnologies}."`;

const prompt3 = `Experience:
Provide exactly 10 bullet points highlighting my experience or projects. Do not include any introductory phrases, explanations, or any phrases like "Here are". Only provide the bullet points. Start the bullet points immediately. Details:
Name: ${fullName}
Technologies: ${currentTechnologies}.
Roles: ${remainderText(workArray)}
If no work experience is provided, say "I did academic and personal projects.`;


    let objective = await GROQFunction(prompt1);
    let keypoints = await GROQFunction(prompt2);
    let jobResponsibilities = await GROQFunction(prompt3);
    const chatgptData = {objective, keypoints, jobResponsibilities };
    res.json({
        message:"Request sucessful!",
        data:{...chatgptData,...newEntry},
    })
} catch (error) {
        console.error("Error creating resume:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }

});
app.listen(PORT,()=>console.log(`Server listening on port ${PORT}`))