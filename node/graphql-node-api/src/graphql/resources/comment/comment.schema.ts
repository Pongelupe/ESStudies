const commentTypes = `

    type Comment {
        id: ID!
        comment: String!
        createdAt: String!
        updatedAt: String!
        user: User!
        post: Post!
    }

    input CommentInput {
        comment: String!
        post: Int!
        user: Int!
    }
    
`;

const commentQueries = `
    commentsByPost(post: ID!, first: Int, offset: Int): [ Comment! ]!
`;

const commentMutations = `
    createcomment(input: CommentInput!): Comment
    updatecomment(id: ID!, input: commentInput!): Comment
    deletecomment(id: ID!): Boolean
`

export {
    commentTypes,
    commentQueries,
    commentMutations
}