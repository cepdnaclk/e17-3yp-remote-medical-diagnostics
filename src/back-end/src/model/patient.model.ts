import mongoose from "mongoose";
import config from "config";
import bcrypt from "bcrypt";
//bcrypt uses a symmetric-key block cipher called Blowfish for hashing passwords 
import { ObjectId } from "bson";

export interface PatientDocument extends mongoose.Document {
    email: string,
    name: string,
    password: string,
    age: number,
    gender: string,
    mobileNo: string,
    homeAddress?: string,
    weight?: number,
    height?: number,
    allergies?: string,
    diseases?: string,// existing medical conditions
    treatmentHistory?: { docId: ObjectId, date: Date, prescription: string },// details of previous sessions
    createdAt: Date,
    updatedAt: Date,
    comparePassword(enterdPassword: string): Promise<boolean>;
}

const PatientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    mobileNo: { type: String, required: true },
    homeAddress: { type: String, required: false },
    weight: { type: Number, required: false },
    height: { type: Number, required: false },
    allergies: { type: String, required: false },
    diseases: { type: String, required: false },
    treatmentHistory: { type: { docId: String, date: Date, prescription: String }, required: false },
},
    { timestamps: true }
);

PatientSchema.methods.comparePassword = async function (enterdPassword: string) {
    const patient = this as PatientDocument;

    //enterd password is plaintext; patient.password is a hash
    return bcrypt.compare(enterdPassword, patient.password).catch((e) => false);
}

//Pre middleware functions are executed one after another, when each middleware calls next
PatientSchema.pre("save", async function (next: mongoose.HookNextFunction) {
    let patient = this as PatientDocument;

    //return to the next function if the password is not modified
    //(if !modified the function is already hashed)
    if (!patient.isModified("password")) return next();

    //a random string to make the hash unpredictable 
    const salt = await bcrypt.genSalt(config.get("saltWorkFactor"));
    const hash = await bcrypt.hashSync(patient.password, salt);

    patient.password = hash;
});

const Patient = mongoose.model<PatientDocument>("Patient", PatientSchema);

export default Patient;