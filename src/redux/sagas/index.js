import { takeEvery, call, put } from "redux-saga/effects";
const axios = require('axios');
const moment = require('moment');
const _ = require('lodash');

export default function* watcherSaga() {
  yield takeEvery("GET_YEARS", workerSaga);
  yield takeEvery("GET_MAKES", getMakesSaga);
}

function* workerSaga() {
  try {
    const payload = yield call(getYears);
    yield put({ type: "UPDATE_YEARS", payload });
  } catch (e) {
    console.log("error", e)
  }
}

function* getMakesSaga() {
  try {
    const payload = yield call(getMakes);
    yield put({ type: "UPDATE_MAKES", payload });
  } catch (e) {
    console.log("error", e)
  }
}

function getYears() {
    return axios.get('')
    .then(function (response) {
      // handle success
      var years = [];
      _.each(response.data.Body, function(dObj){
        years.push(dObj.Year);
      });
      
      return years;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
}

function getMakes() {
  return axios.get('')
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