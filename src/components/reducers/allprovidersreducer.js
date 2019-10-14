import { ALLPROVIDERS } from '../actions/types';

export default function(state = {}, action) {

    switch (action.type) {
        case ALLPROVIDERS:
            return action.payload;
        default:
            return state;
    }
}
