import { PROJECTCITY } from '../actions/types';

export default function(state = {}, action) {

    switch (action.type) {
        case PROJECTCITY:
            return action.payload;
        default:
            return state;
    }
}
