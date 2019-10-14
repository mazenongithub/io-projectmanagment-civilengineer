import { STA } from '../actions/types';

export default function(state = {}, action) {

    switch (action.type) {
        case STA:
            return action.payload;
        default:
            return state;
    }
}
