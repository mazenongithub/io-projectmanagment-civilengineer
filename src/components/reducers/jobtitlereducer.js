import { JOB_TITLE } from '../actions/types';

export default function(state = {}, action) {

    switch (action.type) {
        case JOB_TITLE:
            return action.payload;
        default:
            return state;
    }
}
