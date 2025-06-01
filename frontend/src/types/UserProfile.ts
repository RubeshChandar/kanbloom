
export type User = {
    id: string;
    username: string;
    email: string;
    date_joined: string;
}

export type UserProfile = {
    profile_id: string;
    user: User;
    imageURL?: string | null;
    title?: string | null;
    created_at?: string;
    last_modified?: string;
}

export type ShortendUser = {
    id: string,
    name: string,
    imageURL: string,
    title: string,
}

export type EditProfile = {
    username: string;
    title: string;
}