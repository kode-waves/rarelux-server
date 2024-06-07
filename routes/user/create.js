const {Users} = require('../../db').models
const generateToken = require('../../middleware/generateToken');

const create = async (req, res) => {
    console.log("🚀 ~ create ~ req:", req.body);
    try {
        const { address, provider } = req.body;

        // Await the user.findOne call and properly use the where condition
        console.log("🚀 ~ create ~ user:", Users)
        const existingUser = await Users.findOne({ where: { address: address } });

        // Check if user already exists
        if (existingUser) {
            return res.send({ message: "User Already Exists" });
        }

        // Generate token for the new user
        const token = generateToken(address);

        // Create the new user
        await Users.create({ token: token, address: address, provider: provider });

        return res.send({ status:1, message: "User Created Successfully" });

    } catch (err) {
        console.log("err--------", err);
        return res.send({ message: "Internal Server Error" });
    }
};

module.exports = create;
