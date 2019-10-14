import { QUANTITY } from '../actions/types';

export default function(state = {}, action) {

    switch (action.type) {
        case QUANTITY:
            return action.payload;
        default:
            return state;
    }
}
