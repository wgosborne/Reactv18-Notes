
import create from "./http-service";

export interface User {
    id: number;
    name: string;
}

export default create('/users');

// class UserService {
//     getAllUsers () {
//         const controller = new AbortController(); //built in class in modern browsers for cancelling
        
//         const request =  apiClient.get<User[]>("/users", {
//             signal: controller.signal, //config object
//         });

//         return { request, cancel: () => controller.abort()}
//     }

//     deleteUser (id: number) {
//         const request = apiClient.delete("/users/" + id);

//         return request;
//     }

//     addUser (newUser: User) {
//         const request = apiClient.post("/users", newUser);

//         return request;
//     }

//     updateUser (user: User, updatedUser: User) {
//         //can use put or patch for updating
//         const request = apiClient.patch("/users/" + user.id, updatedUser);

//         return request;
//     }
// }

