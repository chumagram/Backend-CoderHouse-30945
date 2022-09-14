// deno-lint-ignore-file
import { Context, helpers } from "../../deps.ts";
import type { User } from "../types/users.ts";
import * as db from "../db/user.ts";

export const findUser = async (ctx: Context) => {
    const {userId} = helpers.getQuery(ctx, { mergeParams: true });
    try {
        const user: User = await db.findUserById(userId);
        ctx.response.body = user;
    } catch (err) {
        ctx.response.status = 404;
        ctx.response.body = { msg: err.message };
    }
};

export const createUser = async (ctx: Context) => {
    try {
        const {name, birthDate} = await ctx.request.body().value;
        const createUser: User = await db.createUser(name, birthDate);
        ctx.response.body = createUser;
    } catch (err) {
        ctx.response.status = 404;
        ctx.response.body = { msg: err.message };
    }
};

export const updateUser = async (ctx: Context) => {
    ctx.response.body = { msg: "User updated!" };
}

export const deleteUser = async (ctx: Context) => {
    ctx.response.body = { msg: "User deleted!" };
}