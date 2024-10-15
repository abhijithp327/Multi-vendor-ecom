import https from "https";
import fs from "fs";
import dotenv from 'dotenv';

dotenv.config();

const BASE_HOSTNAME = process.env.BASE_HOSTNAME;
const HOSTNAME = BASE_HOSTNAME;
const ACCESS_KEY = process.env.ACCESS_KEY;
const STORAGE_ZONE_NAME = process.env.STORAGE_ZONE_NAME;



export const uploadFile = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({
            status: 400,
            success: false,
            message: "No file attached",
        });
    }
    const file = req.file;
    const filePath = file.path;
    const fileName = encodeURIComponent(file.originalname);

    const readStream = fs.createReadStream(filePath);

    const option = {
        method: "PUT",
        hostname: HOSTNAME,
        path: `${STORAGE_ZONE_NAME}/${fileName}`,
        headers: {
            AccessKey: ACCESS_KEY,
            "Content-Type": "application/octet-stream",
        },
    };

    const requestBunny = https.request(option, (response) => {

        response.on("data", (chunk) => {
            console.log(chunk.toString("utf-8"));
        });

        requestBunny.on("error", (error) => {
            console.log(error);
        });

        readStream.pipe(requestBunny);
        const path = `${requestBunny.path}`;

        setTimeout(() => {
            fs.rm(filePath, () => {
                console.log("File removed");
            })
        });

        res.status(200).json({
            status: 200,
            success: true,
            message: "File uploaded successfully",
            path: path,
        });

    });

};