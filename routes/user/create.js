const user = require('../../models/users');
const generateToken = require('../../middleware/generateToken');


const create = async (req, res) => {
    console.log("🚀 ~ create ~ req:", req.body)
    try {
        const { address, provider } = req.body
        const isAddressExist = user.findOne({ where: { address: address } });
        if (isAddressExist) {
            res.json(201, { message: "User Already Exists" })
        }
        const token = generateToken(address);

        await user.create({ token: token, address: address, provider: provider });

        res.send({ message: "User Created Successfully" })

    } catch (err) {
        console.log("err--------", err)
    }
};

export function create(data, callback) {
    return (dispatch) => {
      dispatch(requestAddBill());
  
      return apiClient
        .post(`${endpoints().billAPI}`, data)
        .then((response) => {
          let successMessage;
          if (response && response.data) {
            successMessage = response.data.message;
            dispatch(
              history.push(`/bill/details/${response.data.bill.id}`)
            );
          }
          return callback(response && response.data);
        })
        .then(async (response) => {
          // dispatch(
          //   fetchList("bill", `${endpoints().billAPI}/list`, 1, 25, params)
          // );
          dispatch(receiveAddPortal());
        })
        .catch((error) => {
          dispatch(billCreateError(error));
  
          if (isBadRequest(error)) {
            let errorMessage;
            const errorRequest = error.response.request;
            if (errorRequest && errorRequest.response) {
              errorMessage = JSON.parse(errorRequest.response).message;
            }
            toast.error(errorMessage);
            console.error(errorMessage);
          }
        });
    };
  }
module.exports = create