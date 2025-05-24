export type User = {
    id: string;
    username: string;
    email: string;
    date_joined: string;
}


export type ShortendUser = {
    id: string,
    name: string,
    imageURL: string,
    title: string,
}

export type UserProfile = {
    id: string;
    user: User;
    image?: string | null;
    title?: string | null;
    created_at?: string;
    last_modified?: string;
}