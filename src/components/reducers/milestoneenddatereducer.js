import { MILESTONEENDDATE } from '../actions/types';

export default function(state = {}, action) {

    switch (action.type) {
        case MILESTONEENDDATE:
            return action.payload;
        default:
            return state;
    }
}
