import { http } from "../lib/http/axios.js"
import {
    UserCredentialsSchema,
    UserSchema,
    type User,
    type UserCredentials
} from "../schema/user.js"

export async function signIn(creds: UserCredentials): Promise<User> {
    const body = UserCredentialsSchema.parse(creds)
    const response = await http.post('/auth/signin', body)
    return UserSchema.parse(response.data)
}

export async function signUp(creds: UserCredentials): Promise<User> {
    const body = UserCredentialsSchema.parse(creds)
    const response = await http.post('/auth/signup', body)
    return UserSchema.parse(response.data)
}

export async function signOut(): Promise<void> {
    await http.post('/auth/signout')
}