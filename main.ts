import { opine, serveStatic, urlencoded, Router } from "https://deno.land/x/opine/mod.ts";
import { dirname, join } from "https://deno.land/x/opine/deps.ts";


import { api } from "./controller/router.ts"


const __dirname = dirname(import.meta.url)

const app = opine()
const port = 5000

app.use("/media", serveStatic(join(__dirname, 'controller/media/')));

app.set("view cache", false)
app.set('trust proxy', true)
//app.use(urlencoded());
app.use("/api", api)

app.get("/", async function (req, res) {
  return res.sendFile(join(__dirname,'./views/dashboard.html'))
});

app.get("/", (req,res)=> {
  res.render("dashboard")
})

app.listen(port);
console.log(`Opine started on localhost:${port}`)
