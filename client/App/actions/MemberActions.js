import * as types from './types';
import {dbRef,dbRefMessage} from '../lib/firebaseApi';
export function setMember(name){
    return (dispatch,event)=>{
        dbRef.push().set({
            name:name
        },(error)=>{
            if(error){
                dispatch(dispatchMember("E_R_R"))                
            }else{
                dispatch(dispatchMember(name))                
            }
        })
    }
}
export function sendMessage(message){
    return (dispatch,event)=>{
        dbRefMessage.push().set(message,(error)=>{
            if(error){
                dispatch(dispatchMessage("E_R_R"));
            }else{
                dispatch(dispatchMessage(message));
            }
        })
    }
}
export function dispatchMessage(message){
    return {
        type:types.SET_MESSAGE,
        message
    }
}
export function dispatchMember(member){
    return{
        type:types.SET_MEMBER,
        member
    }
}