import React from 'react';

const Html = ({preloadState, script, appComponent}) => (
    <html className="no-js" lang="en">
    <head>
        <meta charSet="utf-8" />
        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"></link>
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <title>Social Board</title>
        <script dangerouslySetInnerHTML={{ __html: preloadState }}></script>
    </head>
    <body style={{backgroundColor:'#EEEEEE'}}>
    <div id="root" dangerouslySetInnerHTML={{ __html: appComponent }} />
    <script src={script} />
    </body>
    </html>
);

export default Html;