import { PROPOSALID } from '../actions/types';

export default function(state = {}, action) {

    switch (action.type) {
        case PROPOSALID:
            return action.payload;
        default:
            return state;
    }
}
