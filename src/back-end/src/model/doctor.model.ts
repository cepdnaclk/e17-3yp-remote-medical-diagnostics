import mongoose from "mongoose";
import config from "config";
import bcrypt from "bcrypt";
//uses a symmetric-key block cipher called Blowfish for hashing passwords 

export interface DoctorDocument extends mongoose.Document {
    email: string,
    name: string,
    password: string,
    isAvaliable: boolean,
    license: string,
    age: number,
    gender: string,
    mobileNo: string,
    createdAt: Date,
    updatedAt: Date,
    comparePassword(enterdPassword: string): Promise<boolean>;
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

DoctorSchema.methods.comparePassword = async function (enterdPassword: string) {
    const doctor = this as DoctorDocument;

    //enterd password is plaintext; doctor.password is a hash
    return bcrypt.compare(enterdPassword, doctor.password).catch((e) => false);
}

//Pre middleware functions are executed one after another, when each middleware calls next
DoctorSchema.pre("save", async function (next: mongoose.HookNextFunction) {
    let doctor = this as DoctorDocument;

    //return to the next function if the password is not modified
    //(if !modified the function is already hashed)
    if (!doctor.isModified("password")) return next();

    //a random string to make the hash unpredictable 
    const salt = await bcrypt.genSalt(config.get("saltWorkFactor"));
    const hash = await bcrypt.hashSync(doctor.password, salt);

    doctor.password = hash;
});

const Doctor = mongoose.model<DoctorDocument>("Doctor", DoctorSchema);

export default Doctor;