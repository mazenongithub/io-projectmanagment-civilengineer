import { DESCRIPTION } from '../actions/types';

export default function(state = {}, action) {

    switch (action.type) {
        case DESCRIPTION:
            return action.payload;
        default:
            return state;
    }
}
