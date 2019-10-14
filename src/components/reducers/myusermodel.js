import { FETCH_USER, UPDATE_USER, MYUSERMODEL } from '../actions/types';

export default function(state = {}, action) {
    //console.log(action.payload, action.type);
    switch (action.type) {
        case FETCH_USER:

            return action.payload;

        case UPDATE_USER:
            return action.payload;
        case MYUSERMODEL:
            return action.payload;
        default:
            return state;
    }
}
