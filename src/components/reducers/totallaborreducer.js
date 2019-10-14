import { TOTAL_LABOR } from '../actions/types';

export default function(state = {}, action) {

    switch (action.type) {
        case TOTAL_LABOR:
            return action.payload;
        default:
            return state;
    }
}
