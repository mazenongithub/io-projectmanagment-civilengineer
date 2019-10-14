import { PROJECTSTATE } from '../actions/types';

export default function(state = {}, action) {

    switch (action.type) {
        case PROJECTSTATE:
            return action.payload;
        default:
            return state;
    }
}
