import { INVOICEID } from '../actions/types';

export default function(state = {}, action) {

    switch (action.type) {
        case INVOICEID:
            return action.payload;
        default:
            return state;
    }
}
