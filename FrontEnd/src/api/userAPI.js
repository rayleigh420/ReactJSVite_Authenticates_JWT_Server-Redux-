import axios from "axios";

export const signUp = async (data) => {
  console.log("API: ", data);
  try {
    let result = await axios.post(
      "http://localhost:3000/signUp",
      data
    );
    console.log("Result: ", result);
  } catch (e) {
    console.log(e);
  }
};

// module.exports = {
//   signUp,
// };
