import { PHONE} from '../actions/types';

export default function(state = {}, action) {

    switch (action.type) {
        case PHONE:
            return action.payload;
        default:
            return state;
    }
}
