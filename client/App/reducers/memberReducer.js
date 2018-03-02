import createReducer from '../lib/createReducer';
import * as types from '../actions/types';
export const NewMember=createReducer({},{
    [types.SET_MEMBER](state,action){
        return action.member
    }
})