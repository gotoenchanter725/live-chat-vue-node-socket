import axios from './axios'

const services = async ({
    showWithStatus = false,
    url,
    method,
    headers = null,
    responseType,
    data,
    cancelToken
}) => {
    //REQUEST JSON

    let axiosRequestObject = {
        method,
        headers,
        url,
        data,
        responseType,
        ...(
            cancelToken ?
            {
                cancelToken
            } :
            ''
        )
    }

    //REQUEST

    let request = await axios(axiosRequestObject)
        .catch(err => {
            if (err.response)
                return err.response
            else
                return { status: '500', data: {} }
        })
    if (request.data.status === 401) {
        localStorage.clear()
        window.location.reload()
        console.log(request)
        return Promise.reject();
    }

    return !showWithStatus ?
        request.data :
        request
}

export default services