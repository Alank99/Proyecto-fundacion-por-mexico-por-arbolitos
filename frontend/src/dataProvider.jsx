import jsonServerProvider from "ra-data-json-server";
import host from './const.js'

export const dataProvider = jsonServerProvider(`http://${host}:1337`);
