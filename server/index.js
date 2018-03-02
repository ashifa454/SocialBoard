// Express
import express from 'express'

// React
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import App from '../client/components/App'
import Html from './Html'
import WDM from './WDM'
import http from 'http';
import socket from 'socket.io';
const app = express();
const port = 3000;

app.use(WDM);
var server=http.createServer(app);
var io=socket.listen(server);
app.get('/',function(req, res, next){

    let preloadState = {
        text : 'Hello React-SSR ! Server Side Rendering'
    };

    let renderProps = {
        preloadState: `window.__PRELOADED_STATE__ =${JSON.stringify(preloadState).replace(/</g, '\\u003c')}`,
        script: 'http://localhost:3000/build/client.bundle.js',
        appComponent: ReactDOMServer.renderToString(<App data={preloadState}/>)
    };

    const html = ReactDOMServer.renderToStaticMarkup(<Html {...renderProps}/>); // server-side Rendering

    res.send(`<!doctype html>${html}`);
});
var current_lines=[];
var color=[];
var prev_line=[];
io.on('connection',(socket)=>{
    for(var i in current_lines){
        socket.emit('draw_lines',{
            line:current_lines[i],
            previousLine:prev_line[i],
            color:color[i]})
    }
    socket.on('draw_lines',(data)=>{
        current_lines.push(data.line);
        color.push(data.color);
        prev_line.push(data.previousLine)
        //BroadCasting New Coordinates
        io.emit('draw_lines',{
            line:data.line,
            previousLine:data.previousLine,
            color:data.color})
    });
});
server.listen(port, ()=>{
    console.log('http://localhost:3000')
});