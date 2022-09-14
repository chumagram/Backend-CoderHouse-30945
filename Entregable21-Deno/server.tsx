// @deno-types="https://deno.land/x/servest@v1.3.1/types/react/index.d.ts"
import React from "https://dev.jspm.io/react/index.js";
// @deno-types="https://deno.land/x/servest@v1.3.1/types/react-dom/server/index.d.ts"
import {createApp} from "https://deno.land/x/servest@v1.3.4/mod.ts"

const app = createApp();
let visitas: number = 0;

app.handle("/",async (req) => {
    await req.respond ({
        status:200,
        headers: new Headers ({
            "content-type": "text/html; charset=UTF-8",
        }),
        body: ReactDOMServer.renderToString(
            <html>
                <head>
                    <meta charset="utf-8" />
                    <title>Servest</title>
                </head>
                <body>
                    <h1 style={{color:'blue'}}>Hello Servest con React!</h1>
                    <h2 style={{color:'brown'}}>: {++visitas}</h2>
                </body>
            </html>
        )
    })
})
app.listen({port: 8899});