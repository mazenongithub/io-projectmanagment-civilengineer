import { PROJECTS, FINDMYPROJECT } from '../actions/types';

export default function(state = {}, action) {

    switch (action.type) {
        case PROJECTS:
            return action.payload;
        case FINDMYPROJECT:
            return action.payload;
        default:
            return state;
    }
}
