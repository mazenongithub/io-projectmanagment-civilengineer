import { LABOR_RATE } from '../actions/types';

export default function(state = {}, action) {

    switch (action.type) {
        case LABOR_RATE:
            return action.payload;
        default:
            return state;
    }
}
