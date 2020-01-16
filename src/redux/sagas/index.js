import { takeEvery, call, put } from "redux-saga/effects";
const axios = require('axios');
const moment = require('moment');
const _ = require('lodash');
var CryptoJS = require("crypto-js");

export default function* watcherSaga() {
  yield takeEvery("GET_YEARS", getYearSaga);
  yield takeEvery("GET_MAKES", getMakesSaga);
  yield takeEvery("GET_MODELS", getModelsSaga);
  yield takeEvery("SET_YEAR", setYearSaga);
  yield takeEvery("GET_VEHICLE_DETAILS", getVehicleDetailsSaga);
}

function* getYearSaga() {
  try {
    const payload = yield call(getYears);
    yield put({ type: "UPDATE_YEARS", payload });
  } catch (e) {
    console.log("error", e)
  }
}

function* getMakesSaga(data) {
  try {
    const payload = yield call(getMakes, data.year);
    yield put({ type: "UPDATE_MAKES", payload });
  } catch (e) {
    console.log("error", e)
  }
}

function* setYearSaga(data) {
  try {
    const payload = data.year
    yield put({ type: "UPDATE_YEAR", payload });
  } catch (e) {
    console.log("error", e)
  }
}

function* getModelsSaga(data) {
  try {
    const payload = yield call(getModels, data.year, data.make);
    yield put({ type: "UPDATE_MODELS", payload });
  } catch (e) {
    console.log("error", e)
  }
}

function* getVehicleDetailsSaga(data) {
  try {
    const payload = yield call(getVehicleDetails, data.year, data.make, data.model);
    yield put({ type: "UPDATE_VEHICLE_DETAIL", payload });
  } catch (e) {
    console.log("error", e)
  }
}

function getYears() {
    var time = moment().unix();
    var key = encodeURIComponent(CryptoJS.HmacSHA256("DaaSandbox"+"\n"+"GET"+"\n"+time+"\n"+"/v1/Information/YMME/Years","0wDK2hZHZ7NgdJTrb8xg1jPls").toString(CryptoJS.enc.Base64));
    return axios.get('https://sandbox-api.motor.com/v1/Information/YMME/Years?WithRel=EWT&AttributeStandard=MOTOR&Scheme=Shared&ApiKey=DaaSandbox&Sig='+key+'&Xdate='+time)
    .then(function (response) {
      // handle success
      var years = [];
      _.each(response.data.Body, function(dObj){
        years.push({value: dObj.Year, label: dObj.Year});
      });
      
      return years;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
}

function getMakes(year) {
  var time = moment().unix();
  var key = encodeURIComponent(CryptoJS.HmacSHA256("DaaSandbox"+"\n"+"GET"+"\n"+time+"\n"+"/v1/Information/YMME/Years/"+year+"/Makes","0wDK2hZHZ7NgdJTrb8xg1jPls").toString(CryptoJS.enc.Base64));

  return axios.get('https://sandbox-api.motor.com/v1/Information/YMME/Years/'+year+'/Makes?WithRel=EWT&AttributeStandard=MOTOR&Scheme=Shared&ApiKey=DaaSandbox&Sig='+key+'&Xdate='+time)
  .then(function (response) {
    // handle success
    var makes = [];
    _.each(response.data.Body, function(dObj){
      makes.push({value: dObj.MakeID, label: dObj.MakeName});
    });
    
    return makes;
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
}

function getModels(year, make) {
  var time = moment().unix();
  var key = encodeURIComponent(CryptoJS.HmacSHA256("DaaSandbox"+"\n"+"GET"+"\n"+time+"\n"+'/v1/Information/YMME/Years/'+year+'/Makes/'+make+'/Models',"0wDK2hZHZ7NgdJTrb8xg1jPls").toString(CryptoJS.enc.Base64));

  return axios.get('https://sandbox-api.motor.com/v1/Information/YMME/Years/'+year+'/Makes/'+make+'/Models?WithRel=EWT&AttributeStandard=MOTOR&Scheme=Shared&ApiKey=DaaSandbox&Sig='+key+'&Xdate='+time)
  .then(function (response) {
    // handle success
    var models = [];
    _.each(response.data.Body, function(dObj){
      models.push({value: dObj.ModelID, label: dObj.ModelName});
    });
    
    return models;
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
}

function getVehicleDetails(year, make, model) {
  var time = moment().unix();
  var key = encodeURIComponent(CryptoJS.HmacSHA256("DaaSandbox"+"\n"+"GET"+"\n"+time+"\n"+'/v1/Information/YMME/Years/'+year+'/Makes/'+make+'/Models/'+model+'/BaseVehicle',"0wDK2hZHZ7NgdJTrb8xg1jPls").toString(CryptoJS.enc.Base64));

  return axios.get('https://sandbox-api.motor.com/v1/Information/YMME/Years/'+year+'/Makes/'+make+'/Models/'+model+'/BaseVehicle?AttributeStandard=MOTOR&Scheme=Shared&ApiKey=DaaSandbox&Sig='+key+'&Xdate='+time)
  .then(function (response) {
    // handle success
    var time2 = moment().unix();
    var key2 = encodeURIComponent(CryptoJS.HmacSHA256("DaaSandbox"+"\n"+"GET"+"\n"+time2+"\n"+'/v1/Information/Vehicles/Attributes/BaseVehicleID/'+response.data.Body.BaseVehicleID+'/BaseVehicle/Attributes',"0wDK2hZHZ7NgdJTrb8xg1jPls").toString(CryptoJS.enc.Base64));
  
    return axios.get('https://sandbox-api.motor.com/v1/Information/Vehicles/Attributes/BaseVehicleID/'+response.data.Body.BaseVehicleID+'/BaseVehicle/Attributes?AttributeStandard=MOTOR&Scheme=Shared&ApiKey=DaaSandbox&Sig='+key2+'&Xdate='+time2)
    .then(function (response2) {
      return {
        drive_type: response2.data.Body.DriveTypes.Type,
        type: response2.data.Body.BodyStyles[0].Type,
        door_count: response2.data.Body.BodyStyles[0].DoorCount,
        transmission: response2.data.Body.Transmissions[0].ControlType,
        sub_models: response2.data.Body.SubModels,
      }
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
}

