const http = require('http');
const finalhandler = require('finalhandler');
const serveStatic = require('serve-static');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

// Serve only the frontend and backend folders
const frontendRoot = path.join(process.cwd(), 'dbms', 'frontend');
const backendRoot = path.join(process.cwd(), 'dbms', 'backend');

const serveFrontend = serveStatic(frontendRoot, { index: ['index.html'] });
const serveBackend = serveStatic(backendRoot, { index: ['index.html'] });

// Create proxy middleware for API routes to backend server
const apiProxy = createProxyMiddleware('/api', {
  target: 'http://127.0.0.1:5000',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '/api'
  },
  logLevel: 'warn',
  onError: (err, req, res) => {
    console.error('Proxy error:', err && err.message ? err.message : err);
    try {
      res.writeHead && res.writeHead(502, { 'Content-Type': 'text/plain' });
      res.end('Bad Gateway');
    } catch (e) {
      // ignore
    }
  }
});

const server = http.createServer((req, res) => {
  // Normalize URL
  const url = req.url || '/';

  // Route to backend: /backend/* -> dbms/backend/*
  if (url === '/' || url === '') {
    // Serve frontend index at root
    req.url = '/';
    serveFrontend(req, res, finalhandler(req, res));
    return;
  }

  // If this is an API request, proxy to backend server
  if (url.startsWith('/api')) {
    try {
      apiProxy(req, res, (err) => {
        if (err) {
          res.statusCode = 502;
          res.end('Bad Gateway');
        }
      });
      return;
    } catch (e) {
      res.statusCode = 502;
      res.end('Bad Gateway');
      return;
    }
  }

  if (url.startsWith('/backend')) {
    // remove prefix '/backend' and serve
    req.url = url.replace(/^\/backend/, '') || '/';
    serveBackend(req, res, finalhandler(req, res));
    return;
  }

  if (url.startsWith('/frontend')) {
    // remove prefix '/frontend' and serve (alias)
    req.url = url.replace(/^\/frontend/, '') || '/';
    serveFrontend(req, res, finalhandler(req, res));
    return;
  }

  // Any other path: respond 404
  res.statusCode = 404;
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.end('404 - Not Found (server serves only /frontend and /backend)');
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`Static server listening on http://localhost:${PORT} (routes: /frontend/, /backend/)`));
