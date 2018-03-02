import {combineReducers} from 'redux';
import * as MemberReducer from './memberReducer';
export default combineReducers(Object.assign(
    MemberReducer
))