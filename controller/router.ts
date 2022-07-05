import { Router } from "https://deno.land/x/opine/mod.ts";

import { ytdl, getInfo } from "https://deno.land/x/ytdl_core/mod.ts";
import { ffmpeg } from "https://deno.land/x/dffmpeg/mod.ts"


import { dirname, join } from "https://deno.land/x/opine/deps.ts";
const __dirname = dirname(import.meta.url)

import { emptyDir } from "https://deno.land/std@0.146.0/fs/mod.ts";

export const api = new Router

const queue = []

api.post("/enqueue/:id", async (req,res) => {
  let r  =await downloader(req.params.id);
  res.send(r)
})

async function downloader(id:string) {
  const stream = await ytdl(id);
  const chunks: Uint8Array[] = [];
  for await (const chunk of stream) {
    chunks.push(chunk);}
  const blob = new Blob(chunks);
  await Deno.writeFile(`controller/media/${id}.mp4`, new Uint8Array(await blob.arrayBuffer()));
  const process = ffmpeg()
      .input(`controller/media/${id}.mp4`)
      .threads(2)
      .removeVideo()
      .overwrite() // overwrite any existing output files
      .output(`controller/media/${id}.mp3`)
  await process.run()
  await Deno.remove(`controller/media/${id}.mp4`);
  return({mp3:`/media/${id}.mp3`})
}

api.get("/title/:id", async (req,res) => {
  let r = await getInfo(req.params.id);
  res.send({title:r.videoDetails.title})
})


function clearDir() {
  
}
