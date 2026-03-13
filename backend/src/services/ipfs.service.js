console.log("PINATA SECRET:", process.env.PINATA_SECRET_KEY);
const axios = require("axios");
const FormData = require("form-data");

exports.uploadToIPFS = async (buffer, filename) => {
  const formData = new FormData();

  formData.append("file", buffer, {
    filename,
  });

  const res = await axios.post(
    "https://api.pinata.cloud/pinning/pinFileToIPFS",
    formData,
    {
      maxBodyLength: "Infinity",
      headers: {
        ...formData.getHeaders(),
        pinata_api_key: process.env.PINATA_API_KEY,
        pinata_secret_api_key: process.env.PINATA_SECRET_KEY,
      },
    }
  );

  const cid = res.data.IpfsHash;
  return `https://gateway.pinata.cloud/ipfs/${cid}`;
};