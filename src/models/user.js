const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');  

const userSchema = mongoose.Schema({
    orgName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    regNo: {
        type: String,
        required: true,
    },
    cac: {
        type: String,
        required: true,  
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        default: 'admin'
    }
});


userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt(10);

    this.password = await bcrypt.hash(this.password, salt);
     next();
}); 


// =========Login methods==========
userSchema.statics.login = async function (email, password) {
    // =========Find user my regNol===============          
    const admin = await this.findOne({email}); 
    if (admin) {     
        //  ========Compare password========
        const auth = await bcrypt.compare(password, admin.password);  
        if (auth) {
            return admin
        } 
        throw new Error('Incorrect email or password');
    }   
    throw new Error('Incorrect email or password');
} 


const User =mongoose.model('user', userSchema);

module.exports = User;

