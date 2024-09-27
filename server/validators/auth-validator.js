const {z} = require("zod");

const loginSchema = z.object({
    email: z
    .string({ required_error: "Email is required." })
    .trim()
    .email({ message: "Invalid email-address" })
    .min(10,{message:"Email must be at least 10 characters"})
    .max(50, {message: "Email should not exceeded more that 50 characters"}),
  password: z
    .string({ required_error: "Password is required." })
    .min(6,{message:"password must be 6 characters"})
    .max(30, {message: "Password should not exceeded more that 30 characters"}),
});

//creating an object schema
const signupSchema = loginSchema.extend({
    username: z.string({required_error: "Name is required"}).trim()
    .min(5,{message:"Name must be at least 5 characters"})
    .max(50, {message: "Name should not exceeded more that 50 characters"}),
    email: z.string({required_error: "Email is required"}).trim()
    .email({message: "Invalid email address"})
    .min(10,{message:"Email must be at least 10 characters"})
    .max(50, {message: "Email should not exceeded more that 50 characters"}),
    phone: z.string({required_error: "phone number is required"}).trim()
    .min(10,{message:"Phone numbers must be 10 characters"})
    .max(10, {message: "Phone numbers should not exceeded more that 10 characters"}),
    password: z.string({required_error: "password is required"})
    .min(6,{message:"password must be 6 characters"})
    .max(30, {message: "Password should not exceeded more that 30 characters"}),
});



module.exports = {signupSchema, loginSchema};