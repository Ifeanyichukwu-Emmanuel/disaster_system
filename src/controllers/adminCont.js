const Disaster = require('../models/disaster')
const User = require('../models/user')
const Report = require('../models/report')
const bcrypt = require('bcryptjs');
const { default: mongoose } = require('mongoose');
       

module.exports = {
    dashboard: async(req, res) => {
        const context = {}
        try {
            const _reports = await Report.countDocuments();
            context['reports'] = _reports

            const disasters = await Disaster.countDocuments()
            context['disasters'] = disasters

            const countAdmins = await User.countDocuments()
            context['admins'] = countAdmins

            return res.render('./adminViews/dashboard', {context});
        }   catch (error) {
            console.log(error);
            return res.status(500).json({error: error.message})
        } 
    },
    get_registerDisaster: async(req, res) => {
        const context = {}
        try {
            const _disasters = await Disaster.find(); 
            context['disasters'] = _disasters

            return res.render('./adminViews/registered-disaster', {context});
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message })
        }
    },
    register_disaster: async (req, res) => {

        const { disaster} = req.body;

        //    ==========Data cleaning====== 
        const disaster_Reg = /^[a-zA-Z0-9\s(),-./]+$/;

        try {
            if (!disaster_Reg.test(disaster)) {
                throw new Error('Enter disaster name');
            }  
            
            //  ========== Insert the ambulance to the bd======
            const user = await Disaster.create({ disaster });

            return res.status(200).json({
                success: true,
                message: 'Disaster Registed successfully',
                data: user
            });


        } catch (error) {
            console.log(error);
            return res.status(501).json({ error: error.message });
        }
    },
    delete_Disaster: async (req, res) => {
        const { disaster_id } = req.body;
        try {
            if (!disaster_id == mongoose.Schema.ObjectId) {
                throw Error('Invalid Data')
            }
            const _deleteDisaster = await Disaster.findOneAndDelete({_id: disaster_id })
            return res.status(200).json({ success: true, message: 'Disaster Deleted Successfully', redirectURL: '/' })
        }   catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message })    
        }
    },
    get_report: async(req, res) => {
        const context = {}
        try {
            const _reports = await Report.find(); 
            context['reports'] = _reports

            return res.render('./adminViews/report', {context});
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message })
        }
    },
    delete_report: async (req, res) => {
        const { report_id } = req.body
        try {
            if (!report_id == mongoose.Schema.ObjectId) {
                throw Error('Invalid Data') 
            }
            const _deleteReport = await Report.findOneAndDelete({ _id: report_id })
            return res.status(200).json({ success: true, msg: 'Report Deleted Successfully', redirectURL: '/' })
        }   catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message })    
        }
    },
    profile: async (req, res) => {
        const context = {}

        try {
            const user = await User.findOne({ _id: req.admin })
            // console.log(user);           
            context['user'] = user
            return res.render('./adminViews/profile', { context });

        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: error.message })
        }
    },  
    updateProfile: async (req, res) => {

        const { orgName, email, admin_id, phone, regNo, cac } = req.body; 

        //    ==========Data cleaning====== 
        const orgNameReg = /^[a-zA-Z\s]+$/;
        const email_Reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const phoneNoReg = /^[0-9]+$/;
        const regNo_Reg =  /^[a-zA-Z0-9\s/-]+$/;
        const cac_Reg =  /^[a-zA-Z0-9\s/-]+$/;
        


        try {
            if (!orgNameReg.test(orgName)) {
                 throw new Error('Enter a Vaild Organization Name');
            }
            if (!email_Reg.test(email)) {
                 throw new Error('Enter a valid Organization Email');
            }
            if (!phoneNoReg.test(phone)) {
                 throw new Error('Enter a valid Organization Phone number');
            }
            if (!regNo_Reg.test(regNo)) {
                 throw new Error('Enter a valid Organization Reg Number');
            }
            if (!cac_Reg.test(cac)) {
                throw new Error('Enter a valid Organization Reg Number');
           }


           //  ========== Insert the user to the bd======
           const _updateProfile = await User.findOneAndUpdate({_id: admin_id},{orgName, email, phone, regNo, cac});

          return res.status(200).json({ 
            success: true,
            message: 'Profile Updated successfully',
          });

        }    catch (error) {
            return res.status(501).json({ error: error.message });
       }
    },
    change_password: async (req, res) => {
        const { old_password, newPassword } = req.body;

        try {
            const pwdReg = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/;

            if (!pwdReg.test(newPassword)) {
                throw new Error('Password must contain uppercase, lowercasre and digit');
           }

            const user = await User.findOne({_id: req.admin})

            if (user) {
                const auth = await bcrypt.compare(old_password, user.password)
                if (auth) {
                    const salt = await bcrypt.genSalt();

                    const _newPassword = await bcrypt.hash(newPassword, salt);

                    const chngedPassword = await User.findOneAndUpdate({ _id: req.admin }, { password: _newPassword })

                    return res.status(200).json({ success: true, msg: 'Password Changed Successfully', redirectURL: '/profile' })
                }
                throw Error('Incorrect Password')   
            } else {
                throw Error('Admin Not Found')
            }
        }   catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message })
        }
    },
    login: (req, res) => {
        return res.render('./login');
    },
    get_register: (req, res) => {
        return res.render('./register');
    },
}