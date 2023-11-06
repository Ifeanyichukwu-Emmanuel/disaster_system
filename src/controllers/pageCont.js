const Report = require('../models/report');
const Disaster = require('../models/disaster')
module.exports = {
   
    index: async (req, res) => {
        const context = {}
        try {
            const _disasters = await Disaster.find();
            context['_disaster'] = _disasters

            const reports = await Report.find();
            context['disasters'] = reports

            return res.render('./home', { context });
        }   catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message })
        }
    },
    report_disaster: async (req, res) => {

        const { fullName, email, phone, address, state, localGovt, images, disaster_typ, description } = req.body;

        //    ==========Data cleaning====== 
        const name_Reg = /^[a-zA-Z\s]+$/;
        const email_Reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const phoneNo_Reg = /^[0-9]+$/;
        const address_Reg = /^[a-zA-Z0-9\s,.-/]+$/;
        const descPattern = /^[a-zA-Z\s\S-_+@]+$/;

        try {
            if (!name_Reg.test(fullName)) {
                throw new Error('Please enter Your');
            }
            if (!email_Reg.test(email)) {
                throw new Error('Enter a valid email');
            }
            if (!phoneNo_Reg.test(phone)) {
                throw new Error('Enter a valid phone number');
            }
            if (!address_Reg.test(address)) {
                throw new Error('Invalid address');
            }
            if (!descPattern.test(state)) {
                throw new Error('Incorrect state format');
            }
            if (!descPattern.test(localGovt)) {
                throw new Error('Incorrect L.G.A format');
            }
            if (!descPattern.test(disaster_typ)) {
                throw new Error('Please enter the type of disaster');
            }
            if (!descPattern.test(description)) {
                throw new Error('Enter the full description of the disaster');
            }
            if (req.fileValidationError === '') {
                throw new Error(req.fileValidationError);
            }

            const images = []    
            req.files.forEach(img => {
                images.push(img.filename)
            });


            //  ========== Insert the user to the bd======
            const _creportDisaster = await Report.create({ fullName, email, images, phone, address, state, localGovt, disaster_typ, description });

            return res.status(200).json({
                success: true,
                message: 'Report successfully submitted',
                data: _creportDisaster
            });


        } catch (error) {
            console.log(error);
            return res.status(501).json({ error: error.message });
        }
    },

    single_disaster: async (req, res) => {
        const context = {}
        try {
            const _reports = await Report.findOne({_id: req.query.disaster_id});
            context['report'] = _reports

            return res.render('./single-disaster', { context });
        }   catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message })
        }
    }

}