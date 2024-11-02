declare type User = {
    id: string | number;
    name: string | null;
    email: string;
};

declare interface Post {
    id: number;
    title: string;
    content: string;
    published: boolean;
    createdAt: string;
    authorId: number;
}

import NextAuth from 'next-auth';

// Extend the default types for NextAuth.js
declare module 'next-auth' {
    interface Session {
        user: {
            id: string; // Assuming you will have an ID
            email: string;
            // Add any other properties you expect to have
        };
    }

    interface User {
        id: string; // Add the same ID property to User
        email: string;
        // Add any other properties you expect to have
    }
}
