import apiClient from "./api-client";

//T is the generic type parameter and is a placeholder
//when actually calling, we use getAll<User>

interface Entity {
    id: number
}

class HttpService {

    endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }


    getAll<T>() {
        const controller = new AbortController(); //built in class in modern browsers for cancelling
        
        const request =  apiClient.get<T[]>(this.endpoint, {
            signal: controller.signal, //config object
        });

        return { request, cancel: () => controller.abort()}
    }

    delete (id: number) {
        return apiClient.delete(this.endpoint + "/" + id);
    }

    create<T>(entity: T) {
        return apiClient.post(this.endpoint, entity);
    }

    update<T extends Entity>(entity: T) {
        //can use put or patch for updating
        return apiClient.patch(this.endpoint + "/" + entity.id, entity);
    }
}

const create = (endpoint: string) => {
    return new HttpService(endpoint);
}

export default create;