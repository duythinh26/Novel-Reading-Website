import axios from "axios";

const filterPaginationData = async ({ create_new_arr = false, state, data, page, countRoute, data_to_send = { } }) => {

    let object;

    // If we have something in the previous data
    // By default when make request for page 1, the state will be null
    if (state != null && !create_new_arr) { // This condition mean we already have page 1
        object = { ...state, results: [ ...state.results, ...data ], page: page }
    } else {
        await axios.post(import.meta.env.VITE_SERVER_DOMAIN + countRoute, data_to_send)
        .then(({ data : { totalDocs } }) => {
            object = { results: data, page: 1, totalDocs }
        })
        .catch(err => {
            console.log(err)
        })
    }

    return object;

}

export default filterPaginationData;