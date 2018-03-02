import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App'
import {Provider} from 'react-redux';
import {createStore,applyMiddleware,compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import reducer from './App/reducers';
function configureStore(initialState){
    const enhance=compose(
        applyMiddleware(
            thunkMiddleware,
        )
    )
    return createStore(reducer,initialState,enhance);
}
const store=configureStore({
    
});

ReactDOM.render(
    <Provider store={store} key="provider">
        <App data={window.__PRELOADED_STATE__}/>
    </Provider>,
    document.getElementById('root')
);