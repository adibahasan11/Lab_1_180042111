const mongoose = require ('mongoose');
const PCSchema = new mongoose.Schema({
    teamName: {
        type: String,
        required: true,
    },
    institution: {
        type: String,
        required: true,
    },

    c_name: {
        type: String,
        required: true,
    },
    c_email: {
        type: String,
        required: true,
    },
    c_contact: {
        type: String,
        required: true,
    },
    c_tshirt: {
        type: String,
        required: true,
    },

    m_name0: {
        type: String,
        required: true,
    },
    m_email0: {
        type: String,
        required: false,
    },
    m_contact0: {
        type: String,
        required: true,
    },
    m_tshirt0: {
        type: String,
        required: true,
    },

    m_name1: {
        type: String,
        required: true,
    },
    m_email1: {
        type: String,
        required: false,
    },
    m_contact1: {
        type: String,
        required: true,
    },
    m_tshirt1: {
        type: String,
        required: true,
    },

    m_name2: {
        type: String,
        required: true,
    },
    m_email2: {
        type: String,
        required: false,
    },
    m_contact2: {
        type: String,
        required: true,
    },
    m_tshirt2: {
        type: String,
        required: true,
    },

    total: {
        type: Number,
        required: true,
    },
    paid: {
        type: Number,
        required: true,
    },
    selected: {
        type: Boolean,
        required: true,
    },

    date: {
        type: Date,
        default: Date.now,
    },
});

const ProgrammingContest = mongoose.model("ProgrammingContest", PCSchema);
module.exports = ProgrammingContest;