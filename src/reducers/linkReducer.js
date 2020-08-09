import { PURGE } from "redux-persist";

const INIT_STATE = {
    isResultPage: null,
    prevUrl: new Set(),
};

export default (state=INIT_STATE, action) => {
    switch (action.type) {
        case "CURRENT_PAGE_CONTENTS":
                return {
                    ...state,
                    isResultPage: true,
                    prevUrl:[...new Set(state.prevUrl).add(action.payload)],
                }



        case "EMPTY_ARR":
            return {url: []}
        case PURGE:
            return INIT_STATE;
        default:
            return state;
    }
}
