// deno-lint-ignore-file
import type { User, Uuid } from "../types/users.ts";
import { v4 } from "../../deps.ts";

// Fake Db Queries
export const findUserById = async (uuid: Uuid): Promise<User> =>
    new Promise((resolve, reject) => {
        if (uuid !== "9e94e1a5-6fbf-44a5-a184-68f018a12d87") {
            throw new Error ("User not found");
        }
        setTimeout(() => {
            resolve({
                uuid,
                name: "Paul",
                birthDate: new Date(),
            });
        }, 50);
    });

export const createUser = async (
    name: string,
    birthDate: Date,
): Promise<User> =>
    new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                uuid: v4.generate(),
                name,
                birthDate,
            });
        }, 50);
    });