import { COMPANY } from '../actions/types';

export default function(state = {}, action) {

    switch (action.type) {
        case COMPANY:
            return action.payload;
        default:
            return state;
    }
}
