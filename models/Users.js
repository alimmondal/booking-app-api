import mongoose from "mongoose";
import validator from "validator";

// const crypto = require("crypto");
// const { ObjectId } = mongoose.Schema.Types;

// schema design
const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "please provide a first name"],
      minLength: [3, "name must be at least 3 characters"],
      maxLength: [60, "name is too large"],
      trim: true,
    },
    email: {
      type: String,
      validate: [validator.isEmail, "provide a valid email"],
      lowercase: true,
      unique: true,
      required: [true, "please provide email/gmail"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      validate: {
        validator: (value) =>
          validator.isStrongPassword(value, {
            minLength: 6,
            minLowercase: 3,
            minNumbers: 1,
            minUppercase: 1,
            minSymbols: 1,
          }),
        message: "Password {VALUE} is not strong enough",
      },
    },
    imageURL: {
      type: String,
      validate: [validator.isURL, "please provide a valid url"],
    },
    // confirmPassword: {
    //   type: String,
    //   required: [true, "confirm password"],
    //   validate: {
    //     validator: function (value) {
    //       return value === this.password;
    //     },
    //     message: "Passwords don't match",
    //   },
    // },
    isAdmin: {
      type: Boolean,
      default: false,
    },

    // confirmationToken: String,
    // confirmationTokenExpires: Date,
    // passwordChangeAt: Date,
    // passwordResetToken: String,
    // passwordResetExpires: Date,
    //timestamps
  },
  {
    timestamps: true,
  }
);

// UserSchema.pre("save", function (next) {
//   const password = this.password;

//   const hashedPassword = bcrypt.hashSync(password);

//   this.password = hashedPassword;
//   this.confirmPassword = undefined;

//   next();
// });

// userSchema.methods.comparePassword = function (password, hash) {
//   const isPasswordValid = bcrypt.compareSync(password, hash);
//   return isPasswordValid;
// };

// userSchema.methods.generateConfirmationToken = function () {
//   const token = crypto.randomBytes(32).toLocaleString("hex");

//   this.confirmationToken = token;

//   const date = new Date();
//   date.setDate(date.getDate() + 1);
//   this.confirmationTokenExpires = date;

//   return token;
// };

//SCHEMA > MODEL > QUERY
export default mongoose.model("User", UserSchema);
