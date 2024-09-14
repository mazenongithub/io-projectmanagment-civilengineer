import { MYPROJECTS } from '../actions/types';

export default function (state = {}, action) {

    switch (action.type) {
        case MYPROJECTS:
            return action.payload;
        default:
            return state;
    }
}
