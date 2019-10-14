import { MYPROVIDERS } from '../actions/types';

export default function(state = {}, action) {

    switch (action.type) {
        case MYPROVIDERS:
            return action.payload;
        default:
            return state;
    }
}
