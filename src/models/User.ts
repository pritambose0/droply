import bcrypt from "bcryptjs";
import mongoose, { Schema, Document } from "mongoose";
import validator from "validator";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "creator" | "buyer";
  isVerified: boolean;
  verificationCode: string | null;
  verificationCodeExpiry: Date | null;
  verificationCodeAttempts: number;
}

export interface IUserMethods {
  comparePassword(candidatePassword: string): Promise<boolean>;
  compareVerificationCode(candidateVerificationCode: string): Promise<boolean>;
}

type UserModelType = mongoose.Model<IUser, {}, IUserMethods>;

const UserSchema = new Schema<IUser, UserModelType, IUserMethods>({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    maxLength: [50, "Name must be at most 50 characters"],
    minLength: [3, "Name must be at least 3 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: function (value: string) {
        return validator.isEmail(value);
      },
      message: "Please provide a valid email",
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [6, "Password must be at least 6 characters"],
    select: false,
    maxLength: [128, "Password must be at most 128 characters"],
  },
  role: {
    type: String,
    enum: ["creator", "buyer"],
    default: "buyer",
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationCode: {
    type: String,
    default: null,
    select: false,
  },
  verificationCodeExpiry: {
    type: Date,
    default: null,
    select: false,
  },
  verificationCodeAttempts: {
    type: Number,
    default: 0,
    select: false,
  },
}, {
  timestamps: true,
  toJSON: {
    transform: function (
      _doc,
      ret: {
        password?: string;
        __v?: number;
        verificationCode?: string | null;
        verificationCodeExpiry?: Date | null;
        verificationCodeAttempts?: number | null
      }) {
      delete ret.password;
      delete ret.__v;
      delete ret.verificationCode;
      delete ret.verificationCodeExpiry;
      delete ret.verificationCodeAttempts;
      return ret;
    },
  },
  toObject: {
    transform: function (
      _doc,
      ret: {
        password?: string;
        __v?: number;
        verificationCode?: string | null;
        verificationCodeExpiry?: Date | null;
        verificationCodeAttempts?: number | null
      }) {
      delete ret.password;
      delete ret.__v;
      delete ret.verificationCode;
      delete ret.verificationCodeExpiry;
      delete ret.verificationCodeAttempts;
      return ret;
    },
  },
});

// Hash password before saving
UserSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  if (this.isModified("verificationCode") && this.verificationCode) {
    this.verificationCode = await bcrypt.hash(this.verificationCode, 10);
  }
});

// Compare password
UserSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};


// Compare verification code
UserSchema.methods.compareVerificationCode = async function (code: string) {
  if (!this.verificationCode || !this.verificationCodeExpiry) return false;

  if (this.verificationCodeExpiry < new Date()) return false;

  const isMatch = await bcrypt.compare(code, this.verificationCode);
  if (!isMatch) return false;

  return true;
};

const UserModel =
  (mongoose.models.User as UserModelType) ||
  mongoose.model<IUser, UserModelType>("User", UserSchema);

export default UserModel;
