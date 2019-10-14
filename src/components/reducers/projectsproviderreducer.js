import { PROJECTSPROVIDER } from '../actions/types';

export default function(state = {}, action) {

    switch (action.type) {
        case PROJECTSPROVIDER:
            return action.payload;
        default:
            return state;
    }
}
