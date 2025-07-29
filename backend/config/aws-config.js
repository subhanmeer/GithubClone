const AWS = require("aws-sdk");

AWS.config.update({
    region: "eu-north-1",
accessKeyId: "AKIA4SDY6XG7C3XGCPOO",
  secretAccessKey: "72QUgErt8nJSeSNW/pPtr/pZMPTJY0A7/IN1H3nJ"
});

const s3 = new AWS.S3();
const S3_BUCKET = "samplesubhanbucket";

module.exports = { s3, S3_BUCKET};