// Express
import express from 'express'

// React
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { createStore } from 'redux'
import App from '../client/components/App'
import reducer from '../client/App/reducers/index';
import { Provider } from 'react-redux'
import Html from './Html'
import WDM from './WDM'
import http from 'http';
import socket from 'socket.io';
const app = express();
const port = process.env.PORT || 5000;

app.use(WDM);
var server=http.createServer(app);
var io=socket.listen(server);
app.get('/',function(req, res, next){

    let preloadState = {
        text : 'Hello React-SSR ! Server Side Rendering'
    };
    const store=createStore(reducer)
    let renderProps = {
        preloadState: `window.__PRELOADED_STATE__ =${JSON.stringify(preloadState).replace(/</g, '\\u003c')}`,
        script: 'https://socialboard.herokuapp.com/build/client.bundle.js',
        appComponent: ReactDOMServer.renderToString(<Provider store={store}><App data={preloadState}/></Provider>)
    };

    const html = ReactDOMServer.renderToStaticMarkup(<Html {...renderProps}/>); // server-side Rendering

    res.send(`<!doctype html>${html}`);
});
var current_lines=[];
var color=[];
var username=[];
var prev_line=[];
var lineTails=[];
io.on('connection',(socket)=>{
    for(var i in current_lines){
        socket.emit('draw_lines',{
            line:current_lines[i],
            previousLine:prev_line[i],
            username:username[i],
            color:color[i]})
    }
    for(var i in lineTails){
        socket.emit('increase_line',{
            x:lineTails[i].x,
            y:lineTails[i].y,
            username:lineTails[i].username
        })
    }
    socket.on('increase_line',(data)=>{
        lineTails.push(data);
        io.emit('increase_line',{
            x:data.x,
            y:data.y,
            username:data.username
        })
    });
    socket.on('draw_lines',(data)=>{
        current_lines.push(data.line);
        color.push(data.color);
        username.push(data.username);
        prev_line.push(data.previousLine)
        //BroadCasting New Coordinates
        io.emit('draw_lines',{
            line:data.line,
            previousLine:data.previousLine,
            username:data.username,
            color:data.color})
    });
});
server.listen(port, ()=>{
    console.log('http://localhost:'+port)
});