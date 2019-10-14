import { EMAIL_ADDRESS } from '../actions/types';

export default function(state = {}, action) {

    switch (action.type) {
        case EMAIL_ADDRESS:
            return action.payload;
        default:
            return state;
    }
}
