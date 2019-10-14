import { PASSWORD } from '../actions/types';

export default function(state = {}, action) {

    switch (action.type) {
        case PASSWORD:
            return action.payload;
        default:
            return state;
    }
}
