import * as types from './types';
import {dbRef} from '../lib/firebaseApi';
export function setMember(name){
    return (dispatch,event)=>{
        dbRef.set({
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
export function dispatchMember(member){
    return{
        type:types.SET_MEMBER,
        member
    }
}