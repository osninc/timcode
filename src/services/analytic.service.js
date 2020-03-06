import * as firebase from "../../firebase.config";
import axios from "axios";
import * as ServerConfig from '../../server.config';
const baseUrl = `http://${ServerConfig.host}:${ServerConfig.port}`;
  
export function saveAnalyticInfo(info) {
    try {
        return firebase.analyticsCollection.add(info);
    } catch (e) {
        return Promise.resolve(true);
    }
}

export function findInfoByFilter(filter) {
    return saveAnalyticInfo(filter)
        .then(() => loadDataByFilter(filter))
        .then((data) => data === '' || data === "" ? [] : data)
        .catch(() =>[]);
}

function loadDataByFilter(filter) {
    return axios.post(baseUrl + '/api', filter, {
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        }
    }).then(resp => resp.data);
}

export function openPage(href) {
  return window.open(href, '_blank')
}
