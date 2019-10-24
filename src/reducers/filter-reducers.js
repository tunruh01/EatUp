import _ from "lodash";
import { TOGGLE_FILTER } from "../actions";

export default function (state = [], action) {
    switch (action.type) {
        case TOGGLE_FILTER:  
            if (state.includes(action.payload)) {
                return _.filter(state, function (o) { return o  !== action.payload; });

            } else {
                return state.concat(action.payload)
            }
        default:
            return state;
    }
}
