import { CanceledError } from "axios";
import { useState, useEffect } from "react";
import userService, { User } from "../services/user-service";

const useUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
    setIsLoading(true);

    const { request, cancel } = userService.getAll<User>();

    request
        .then((response) => {
        setUsers(response.data);
        setIsLoading(false);
        })
        .catch((error) => {
        if (error instanceof CanceledError) return;
        setError(error.message);
        setIsLoading(false);
        })
        .finally(() => {
        // setIsLoading(false); //works in prod but not with strict mode on
        });

    return () => cancel(); //cleaup function
    }, []);

    return { users, error, isLoading, setUsers, setError };
};

export default useUsers;