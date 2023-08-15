import mongoose from 'mongoose';
const { Schema } = mongoose;

const contactSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        max: 40,
        min: 7
    },
    name: {
        type: String,
        required: true,
        trim: true,
        max: 30,
        min: 5,
    },
    message: {
        type: String,
        required: true,
        trim: true,
        max: 800,
        min: 10,
    }
}, { versionKey: false });

const ContactModel = mongoose.model('Contact', contactSchema);
export default ContactModel;