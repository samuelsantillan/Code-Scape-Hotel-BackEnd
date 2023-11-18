import mongoose from 'mongoose';
const { Schema } = mongoose;

const newsletterSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        max: 40,
        min: 7
    }
}, { versionKey: false });

const NewsletterModel = mongoose.model('Newsletter', newsletterSchema);
export default NewsletterModel;                     