import { ACTUALLABORID } from '../actions/types';

export default function(state = {}, action) {

    switch (action.type) {
        case ACTUALLABORID:
            return action.payload;
        default:
            return state;
    }
}
