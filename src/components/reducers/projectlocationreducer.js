import { PROJECTLOCATION} from '../actions/types';

export default function(state = {}, action) {

    switch (action.type) {
        case PROJECTLOCATION:
            return action.payload;
        default:
            return state;
    }
}
