import { PROJECTSOCKETS } from '../actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case PROJECTSOCKETS:
            return action.payload;
        default:
            return state;
    }
}