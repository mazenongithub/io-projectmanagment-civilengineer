import { MYPROVIDER } from '../actions/types';

export default function(state = {}, action) {

    switch (action.type) {
        case MYPROVIDER:
            return action.payload;
        default:
            return state;
    }
}
