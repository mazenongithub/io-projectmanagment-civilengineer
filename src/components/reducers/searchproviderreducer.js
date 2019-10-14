import { SEARCHPROVIDERS } from '../actions/types';

export default function(state = {}, action) {

    switch (action.type) {
        case SEARCHPROVIDERS:
            return action.payload;
        default:
            return state;
    }
}
