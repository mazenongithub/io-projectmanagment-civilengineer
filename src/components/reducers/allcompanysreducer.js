import { ALLCOMPANYS } from '../actions/types';

export default function (state = {}, action) {

    switch (action.type) {
        case ALLCOMPANYS:
            return action.payload;
        default:
            return state;
    }
}
