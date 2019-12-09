const axios = require('axios');
const xmlParser = require('xml2json');
const PapaParse = require('papaparse');

const {
  getUploadUrl,
  uploadToDataSources
} = require('@movable-internal/remote-lambda-helper');


const REMOTE_UPDATE_TOKEN = process.env.REMOTE_UPDATE_TOKEN;

module.exports.clientNameKeyRemoteFile = async (event, context) => {
  try {
    /**
     * Sign in to get upload URL
     */
    const uploadUrlReponse = await getUploadUrl(
      REMOTE_UPDATE_TOKEN,
      `Filename_DS_Key`
    );

    const {
      uploadUrl,
      uploadUrlStatus,
      uploadUrlStatusText
    } = uploadUrlReponse;

    if (uploadUrlStatus !== 200) {
      return {
        status: uploadUrlStatus,
        body: uploadUrlStatusText
      };
    }

    /**
     * Make request to get data from clients csv file
     */

    const clientUrl = '';
    const clientDataResponse = await axios({
      method: 'get',
      url: clientUrl
    });

    const clientData = clientDataResponse.data;

    /**
     * Upload contents to uploadUrl
     */
    const uploadDataResponse = await uploadToDataSources(
      uploadUrl,
      clientData
    );
    const { uploadDataStatus, uploadDataStatusText } = uploadDataResponse;

    if (uploadDataStatus !== 200) {
      return {
        status: uploadDataStatus,
        body: uploadDataStatusText
      };
    }

    return {
      status: 200,
      body: 'File uploaded'
    };
  } catch (e) {
    throw e;
  }
};