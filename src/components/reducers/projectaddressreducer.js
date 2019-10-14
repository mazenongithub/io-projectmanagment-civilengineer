import { PROJECTADDRESS } from '../actions/types';

export default function(state = {}, action) {

    switch (action.type) {
        case PROJECTADDRESS:
            return action.payload;
        default:
            return state;
    }
}
