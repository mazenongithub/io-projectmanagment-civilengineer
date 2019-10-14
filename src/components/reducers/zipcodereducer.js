import { ZIPCODE } from '../actions/types';

export default function(state = {}, action) {

    switch (action.type) {
        case ZIPCODE:
            return action.payload;
        default:
            return state;
    }
}
