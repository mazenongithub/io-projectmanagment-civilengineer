import { PROJECTCOUNTRY } from '../actions/types';

export default function(state = {}, action) {

    switch (action.type) {
        case PROJECTCOUNTRY:
            return action.payload;
        default:
            return state;
    }
}
