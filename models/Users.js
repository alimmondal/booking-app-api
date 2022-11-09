// import mongoose from "mongoose";
// import validator from "validator";

// // schema design
// const UserSchema = mongoose.Schema(
//   {
//     username: {
//       type: String,
//       required: [true, "please provide a first name"],
//       minLength: [3, "name must be at least 3 characters"],
//       maxLength: [60, "name is too large"],
//       trim: true,
//     },
//     email: {
//       type: String,
//       validate: [validator.isEmail, "provide a valid email"],
//       lowercase: true,
//       unique: true,
//       required: [true, "please provide email/gmail"],
//       trim: true,
//     },
//     password: {
//       type: String,
//       required: [true, "password is required"],
//       validate: {
//         validator: (value) =>
//           validator.isStrongPassword(value, {
//             minLength: 6,
//             minLowercase: 3,
//             minNumbers: 1,
//             minUppercase: 1,
//             minSymbols: 1,
//           }),
//         message: "Password {VALUE} is not strong enough",
//       },
//     },
//     city: {
//       type: String,
//       required: true,
//     },
//     phone: {
//       type: String,
//       required: true,
//     },
//     img: {
//       type: String,
//     },
//     country: {
//       type: String,
//       required: true,
//     },
//     isAdmin: {
//       type: Boolean,
//       default: false,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// //SCHEMA > MODEL > QUERY
// export default mongoose.model("Users", UserSchema);

import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    country: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    city: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Users", UserSchema);
