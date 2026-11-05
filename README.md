# How to get a running public link for this website

This folder contains a static website (HTML, CSS, JS). To serve it locally and get a public URL you can use either LocalTunnel or ngrok. Below are step-by-step PowerShell commands for both.

Replace paths and filenames as needed. Example site entry point: `cha.html`.

## 1) Quick: use LocalTunnel (free, simple)

1. Install Node.js (if not installed): https://nodejs.org/
2. Open PowerShell in this folder: `c:\Users\MANJIMA\Desktop\html`
3. Serve files locally using a simple static server. If you have Python 3 installed:

```powershell
python -m http.server 8080
```

Or with Node (http-server):

```powershell
npm install -g http-server
http-server -p 8080 .
```

4. In a new PowerShell window, install and run localtunnel to expose port 8080:

```powershell
npm install -g localtunnel
lt --port 8080 --subdomain my-unique-subdomain
```

Notes:
- If `my-unique-subdomain` is taken, pick another or omit `--subdomain` to get a random URL.
- The command prints a public URL like `https://my-unique-subdomain.loca.lt`.
- Visit `https://<tunnel-url>/cha.html` to open the page.

## 2) Alternative: ngrok (recommended for stability)

1. Download ngrok for Windows: https://ngrok.com/download
2. Unzip and move `ngrok.exe` somewhere on PATH or run it from the folder.
3. In PowerShell (after running your local server on port 8080):

```powershell
.\ngrok.exe http 8080
```

This will print a public forwarding URL like `https://abcd-1234.ngrok.io` which you can open as `https://abcd-1234.ngrok.io/cha.html`.

If you want a stable domain, sign up for an ngrok account and set your authtoken following ngrok docs.

## 3) Optional: add a tiny Node server to this project

Create a `package.json` and `serve.js` if you'd prefer running `npm start`:

```json
{
  "name": "static-site",
  "version": "1.0.0",
  "scripts": {
    "start": "node serve.js"
  },
  "dependencies": {
    "serve-static": "^1.14.2",
    "finalhandler": "^1.2.0",
    "http": "0.0.1"
  }
}
```

And `serve.js`:

```js
const http = require('http');
const finalhandler = require('finalhandler');
const serveStatic = require('serve-static');

const serve = serveStatic(process.cwd(), { index: ['cha.html', 'index.html'] });
const server = http.createServer((req, res) => {
  serve(req, res, finalhandler(req, res));
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log('Listening on', PORT));
```

Then run:

```powershell
npm install
npm start
```

And expose the port using LocalTunnel or ngrok as shown above.

## Troubleshooting
- If firewall or corporate network blocks incoming connections, tunnels may fail. Try a different network or use ngrok with an authenticated account.
- If you get 403/404 on the tunneled URL, ensure the local server is running and the port matches the tunnel command.

---

If you want, I can:
- Create the `package.json` and `serve.js` files here and run the server for you (you'll need to run the tunnel locally), or
- Give a single command to run (PowerShell) that starts a server and opens a localtunnel automatically.

Tell me which option you'd like and I will make the changes.