const express = require('express')
const ytdl = require('ytdl-core')
const cors = require('cors')

const app = express()
app.use(cors())
app.get("/download", async (req, res) => {
    const v_id = await ytdl.getURLVideoID(req.query.url);
    const info = await ytdl.getInfo(req.query.url);
  
    const file = await ytdl.downloadFromInfo(info);
  
    let data = {
      url: "https://www.youtube.com/embed/" + v_id,
      file: file,
      info: info.formats.sort((a, b) => {
        return a.mimeType < b.mimeType;
      }),
    };
   
    return res.send(data);
  });
  
  app.get("/data", async (req, res) => {
    var url = req.query.url;
  
    res.header("content-Disposition", 'attachment; filename="video.mp4');
  
    ytdl(url, { format: "mp4" }).pipe(res);
  });

app.listen('8888',()=>{
    console.log('Connect to port 8888')
})

