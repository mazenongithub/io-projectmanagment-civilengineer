import { UPLOADIMAGE } from '../actions/types';

export default function(state = {}, action) {

    switch (action.type) {
        case UPLOADIMAGE:
            return action.payload;
        default:
            return state;
    }
}
