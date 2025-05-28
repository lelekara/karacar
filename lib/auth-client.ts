import { createAuthClient } from "better-auth/react"
import { adminClient } from "better-auth/client/plugins"



export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: "http://192.168.1.160:3000",
      plugins: [
        adminClient()
    ]
    
})

export const {
    signIn,
    signOut,
    signUp,
    useSession
} = authClient;