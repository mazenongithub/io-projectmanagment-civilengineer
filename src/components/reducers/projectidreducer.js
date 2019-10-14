import { PROJECTID } from '../actions/types';

export default function(state = {}, action) {

    switch (action.type) {
        case PROJECTID:
            return action.payload;
        default:
            return state;
    }
}
