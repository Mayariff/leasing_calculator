import axios from "axios";
import {paramsType, responseType} from "./type";

const instance = axios.create({
    baseURL: 'https://hookb.in/',
})

export const calculatorAPI = {
    createNewApplication(data: paramsType) {
        const promise = instance.post<responseType>('eK160jgYJ6UlaRPldJ1P', data);
        return promise;
    },
}