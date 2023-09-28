import jsonServerProvider from "ra-data-json-server";
import { fetchUtils } from "react-admin";
import host from './const.js'

const fetchJsonUtil = (url, options={})=>{
    if(!options.headers){
        options.headers=new Headers({Accept: "application/json"})
    }
    options.headers.set("Authentication", localStorage.getItem("auth"));
    return fetchUtils.fetchJson(url, options);
};

export const dataProvider = jsonServerProvider(`http://${host}:1337`, fetchJsonUtil);
