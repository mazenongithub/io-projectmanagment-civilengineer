import { PROJECTZIPCODE } from '../actions/types';

export default function(state = {}, action) {

    switch (action.type) {
        case PROJECTZIPCODE:
            return action.payload;
        default:
            return state;
    }
}
