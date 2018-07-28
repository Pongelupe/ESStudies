import { userQueries } from "./resources/user/user.schema";
import { postQueries } from "./resources/post/post.schema";
import { commentTypes } from "./resources/comment/comment.schema";

const Query = `
    type Query {
        ${commentTypes}
        ${postQueries}
        ${userQueries}
    }`;

export {
    Query
}