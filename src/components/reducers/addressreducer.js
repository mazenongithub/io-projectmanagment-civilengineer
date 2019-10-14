import { ADDRESS } from '../actions/types';

export default function(state = {}, action) {

    switch (action.type) {
        case ADDRESS:
            return action.payload;
        default:
            return state;
    }
}
