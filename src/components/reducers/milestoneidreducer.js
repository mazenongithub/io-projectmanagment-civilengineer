import { MILESTONEID } from '../actions/types';

export default function(state = {}, action) {

    switch (action.type) {
        case MILESTONEID:
            return action.payload;
        default:
            return state;
    }
}
