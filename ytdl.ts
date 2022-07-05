import { ytdl } from "https://deno.land/x/ytdl_core/mod.ts";
import { ffmpeg } from "https://deno.land/x/dffmpeg/mod.ts"

const stream = await ytdl("rfTgO9rpqck");

const chunks: Uint8Array[] = [];

for await (const chunk of stream) {
  chunks.push(chunk);
}

const blob = new Blob(chunks);
await Deno.writeFile("video.mp4", new Uint8Array(await blob.arrayBuffer()));


// you can also import the class directly and create a new
// instance of it

const process = ffmpeg()
    .input("video.mp4")
    .threads(2)
    .removeVideo() 
    .metadata({ title: "Title", author: "John Doe" })
    .overwrite() // overwrite any existing output files
    .output("output.mp3")

await process.run()
