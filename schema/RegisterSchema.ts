import { z } from "zod";

export const RegisterSchama=z.object( {
    name:z.string().min(3,"name must be at least 3 characters").max(20,"name must be less than 20 characters"),
    username:z.string().min(3,"username must be at least 3 characters").max(20,"username must be less than 20 characters"),
    email:z.string().email("email must be a valid email"),
    password:z.string().min(6,"password must be at least 6 characters").max(20,"password must be less than 20 characters"),
    bio:z.string().min(3,"bio must be at least 3 characters").max(20,"bio must be less than 20 characters"),
})