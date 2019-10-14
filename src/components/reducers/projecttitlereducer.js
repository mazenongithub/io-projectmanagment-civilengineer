import { PROJECTTITLE } from '../actions/types';

export default function(state = {}, action) {

    switch (action.type) {
        case PROJECTTITLE:
            return action.payload;
        default:
            return state;
    }
}
