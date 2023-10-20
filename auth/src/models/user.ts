import mongoose from "mongoose";
import { Password } from "../services/password";

interface IUser {
  email: string;
  password: string;
}

interface UserDoc extends mongoose.Document {
  email: String;
  password: String;
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: IUser): UserDoc;
}

export const userSchema = new mongoose.Schema<IUser>(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        delete ret.password;
        ret.id = doc._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashedPassword = await Password.hashPassword(this.password);
    this.set("password", hashedPassword);
  }
  done();
});
userSchema.statics.build = (attrs: IUser) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
