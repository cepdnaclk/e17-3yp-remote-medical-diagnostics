import mongoose from "mongoose";
import Config from "../config/default";
import bcrypt from "bcrypt";
//uses a symmetric-key block cipher called Blowfish for hashing passwords 

export interface DoctorDocument extends mongoose.Document {
    email: string,
    name: string,
    password: string,
    isAvailable: boolean,
    license: string,
    age: number,
    gender: string,
    mobileNo: string,
    createdAt: Date,
    updatedAt: Date,
    comparePassword(enteredPassword: string): Promise<boolean>;
}

const DoctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAvailable: { type: Boolean, required: true },
    license: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    mobileNo: { type: String, required: true },
},
    { timestamps: true }
);

DoctorSchema.methods.comparePassword = async function (enteredPassword: string) {
    const doctor = this as DoctorDocument;

    //entered password is plaintext; doctor.password is a hash
    return bcrypt.compare(enteredPassword, doctor.password).catch((e) => false);
}

//Pre middleware functions are executed one after another, when each middleware calls next
DoctorSchema.pre("save", async function (next: mongoose.HookNextFunction) {
    let doctor = this as DoctorDocument;

    //return to the next function if the password is not modified
    //(if !modified the function is already hashed)
    if (!doctor.isModified("password")) return next();

    //a random string to make the hash unpredictable 
    const salt = await bcrypt.genSalt(Config.saltWorkFactor);
    const hash = await bcrypt.hash(doctor.password, salt);

    doctor.password = hash;
});

const Doctor = mongoose.model<DoctorDocument>("Doctor", DoctorSchema);

export default Doctor;