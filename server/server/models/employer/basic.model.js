import mongoose from "mongoose";
import crypto from "crypto";
import validator from "validator";
import slugify from "slugify";

const EmployeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Company name is required"],
    },
    generalEmail: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      validate: [validator.isEmail, "Please use a valid company email"],
    },
    website: {
      type: String,
      match: [
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
        "Please use a valid URL with HTTP or HTTPS",
      ],
    },
    firstName: {
      type: String,
      trim: true,
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
      trim: true,
      required: [true, "Last name is required"],
    },
    title: {
      type: String,
    },
    phone: {
      type: String,
      required: [true, "Please add a cell phone number"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, "Please use a valid email"],
    },
    hashed_password: {
      type: String,
      required: "Password is required",
    },
    role: {
      type: String,
      enum: ["employer", "admin"],
      default: "employer",
    },
    address: {
      street1: {
        type: String,
        required: [true, "Please add a street"],
      },
      street2: {
        type: String,
      },
      city: {
        type: String,
        //required: [true, 'Please add a city'], - for seed file
      },
      state: {
        type: String,
        required: [true, "Please add a state"],
      },
      zipcode: {
        type: String,
        required: [true, "Please add a zipcode"],
        minlength: [5, "Zipcode must be 5 digits"],
        maxlength: [5, "Zipcode must be 5 digits"],
      },
    },
    slug: String,
    employeezNowId: {
      // randam number for employee's identification - visible in public
      type: String,
      default: function () {
        let timestamp = new Date().getTime();
        let strtime = timestamp.toString();
        let len = strtime.length;
        console.log(timestamp.toString(), len);
        console.log(strtime.slice(len - 10));
        return strtime.slice(len - 10);
      },
    },
    interestedEmployees: {
      type: [mongoose.Schema.ObjectId],
      ref: "Employee",
      required: true,
    },
    salt: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    // virtuals true => it displays virtual schema
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

/**
 * before save employee data set password as a virtual password,
 * set passwordConfirm as a virtual passwordConfirm and make
 * hashed password from password
 */
EmployeeSchema.virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

EmployeeSchema.virtual("passwordConfirm")
  .set(function (passwordConfirm) {
    this._passwordConfirm = passwordConfirm;
  })
  .get(function () {
    return this._passwordConfirm;
  });

EmployeeSchema.path("hashed_password").validate(function (v) {
  if (this._password && this._password.length < 8) {
    this.invalidate("password", "Password must be at least 8 characters.");
  }
  if (this._password !== this._passwordConfirm) {
    this.invalidate("password", "Password must be equal with passwordConfirm");
  }
  if (this.isNew && !this._password) {
    this.invalidate("password", "Password is required");
  }
}, null);

// methods for employee model
EmployeeSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },
  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + "";
  },
  createPasswordResetToken: function () {
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Store encrypted resetToken to db
    this.passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Expires in 10 min (min you want, 60 seconds, 1000milseconds)
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    return resetToken;
  },
};
// Create a slug
EmployeeSchema.pre("save", function (next) {
  this.slug = slugify(
    `${this.firstName}-${this.lastName}-${this.employeezNowId}`,
    {
      lower: true,
    }
  );
  next();
});

export default mongoose.model("Employer", EmployeeSchema);
