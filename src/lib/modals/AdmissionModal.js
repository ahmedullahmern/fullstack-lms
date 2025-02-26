import mongoose from "mongoose";

const { Schema } = mongoose;

const admissionSchema = new Schema(
    {
        course: { type: mongoose.Types.ObjectId, ref: "Course" },
        batch: { type: mongoose.Types.ObjectId, ref: "Batch" },
        startDate: String,
        endDate: String,
        status: {
            type: String,
            default: "pending",
            enum: ["pending", "open", ""],
        },
    },
    { timestamps: true }
)

export const AdmissionModal =
    mongoose.models.Admission || mongoose.model('Admission', admissionSchema)