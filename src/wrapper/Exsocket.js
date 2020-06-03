const express = require('express');
const SocketServer = require('ws').Server;
const util = require('util');
const debug = require('../utils/debug');

const log = debug('Exsocket =>');
const wsLog = debug('ws => ');


function Exsocket(PORT = 2000) {
  const httpServer = express().listen(PORT, () => log(`HTTP server start on ${PORT}`));
  const wss = new SocketServer({ server: httpServer });
  const builtInEvents = ['close', 'error', 'upgrade', 'message', 'open', 'ping', 'pong', 'unexpected-response'];
  const builtInEventListeners = [];
  const listeners = new Map();

  const app = {
    on(event, callback) {
      if (builtInEvents.includes(event)) {
        builtInEventListeners.push([event, callback]);
        return;
      }

      listeners.set(event, callback);
    },
    use(router) {
      router.listeners.forEach((callback, event) => {
        if (listeners.has(event)) throw new Error('Regist duplicate event in this application.');
        listeners.set(event, callback);
      });
    },
  };

  wss.on('listening', () => {
    log('WS server started');
  });

  wss.on('connection', (ws) => {
    wsLog('clent connection started');

    builtInEventListeners.forEach((element) => {
      ws.on(...element);
    });

    ws.on('error', (error) => {
      wsLog('clent get error', util.inspect(error));
    });

    ws.on('close', () => {
      wsLog('clent connection closed');
    });

    ws.on('message', async (req) => {
      wsLog(`server <== ${req}`);
      const data = JSON.parse(req);
      const listener = listeners.get(data.event);
      if (!listener) throw new Error(`No ${data.event} event`);

      const result = await listener(data.content);
      data.content = result;
      wsLog(`server ==> ${data}`);
      ws.send(JSON.stringify(data));
    });
  });

  return app;
}

Exsocket.createRouter = () => {
  const listeners = new Map();

  return {
    on(event, callback) {
      if (listeners.has(event)) throw new Error('Regist duplicate event in this router.');
      listeners.set(event, callback);
    },
    listeners,
  };
};

module.exports = Exsocket;
