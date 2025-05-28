import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// If your Prisma file is located elsewhere, you can change the path
import prisma from "@/lib/prisma";
import { admin } from "better-auth/plugins"
 
export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
     emailAndPassword: {  
        enabled: true,
         async sendResetPassword(data, request) {
            // Send an email to the user with a link to reset their password
        },
    },
        plugins: [
        admin() 
    ]
});