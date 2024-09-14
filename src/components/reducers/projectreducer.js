import { PROJECTS } from '../actions/types';

export default function (state = {}, action) {

    switch (action.type) {
        case PROJECTS:
            return action.payload;
        default:
            return state;
    }
}
