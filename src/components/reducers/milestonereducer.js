import { MILESTONE } from '../actions/types';

export default function(state = {}, action) {

    switch (action.type) {
        case MILESTONE:
            return action.payload;
        default:
            return state;
    }
}
