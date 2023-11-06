const userModel = require("../models/user");

const jwt = require('jsonwebtoken');    

     
module.exports = { 

     register: async (req, res) => {

          const { orgName, email, phone, regNo, cac, password } = req.body;

          //    ==========Data cleaning======    
          const orgNameReg = /^[a-zA-Z\s]+$/;
          const email_Reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          const phoneNoReg = /^[0-9]+$/;
          const regNo_Reg =  /^[a-zA-Z0-9\s/-]+$/;
          const cac_Reg =  /^[a-zA-Z0-9\s/-]+$/;
          const pwdReg = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/;


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
               if (!pwdReg.test(password)) {
                    throw new Error('Password must contain uppercase, lowercasre and digit');
               }



               //  ========== Insert the user to the bd======
               const user = await userModel.create({ orgName, email, cac, phone, regNo, password  });
               return res.status(200).json({
                    success: true,
                    message: 'Account created successfully',
                    data: user
               });
          } catch (error) {
               return res.status(501).json({ error: error.message });
          }
     },

     login: async (req, res) => {
          const {email, password } = req.body;

          // ==========Data cleaning======
          const email_Reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          const pwdReg = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/;

          try {
               if (!email_Reg.test(email)) {
                    throw new Error('Enter a valid Organization Reg Number');
               }
               if (!pwdReg.test(password)) {
                    throw new Error('Password must contain uppercase, lowercasre and digit');
               }

               // ======Call login methodes========
               const loginAdmin = await userModel.login(email, password);

               const token = jwt.sign(
                    { id: loginAdmin._id },
                    process.env.SECRET_KEY,
                    { 
                         expiresIn: 60 * 60 * 24,
                    }
               );

               res.cookie('jwt', token);

               return res.status(200).json({
                    success: true,
                    message: 'Access granted',
                    token
               });

          } catch (error) {
               console.log(error);
               return res.status(501).json({ error: error.message });
          }
     },

     logout: async (req, res) => {
          res.cookie('jwt', '', { maxAge: 4 })
          return res.redirect('/admin/login');
     }
}