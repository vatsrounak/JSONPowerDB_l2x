/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

var jpdbBaseURL = 'http://api.login2explore.com:5577';
var jpdbIRL = '/api/irl';
var jpdbIML = '/api/iml';
var DBname = "SCHOOL-DB";
var RelationName = "STUDENT-TABLE";
var connToken = "90932825|-31949281407357679|90948245";

$("#rollno").focus();

function getempIdJsonObj() {
    var rollno = $("#rollno").val();
    var jsonStr = {
        no: rollno
    };
    return JSON.stringify(jsonStr);
}

function saveRecNo2LS(jsonObj) {
    var lvData = JSON.parse(jsonObj.data);
    localStorage.setItem('recno', lvData.rec_no);
}

function fillData(jsonObj) {
    saveRecNo2LS(jsonObj);
    var record = JSON.parse(jsonObj.data).record;
    $("#fname").val(record.name);
    $("#stclass").val(record.class);
    $("#bdate").val(record.bdate);
    $("#address").val(record.address);
    $("#edate").val(record.edate);
}

function resetForm() {
    $("#rollno").val("");
    $("#fname").val("");
    $("#stclass").val("");
    $("#bdate").val("");
    $("#address").val("");
    $("#edate").val("");
    $("#rollno").prop("disabled", false);
    $('#fname').prop('disabled', true);
    $('#bdate').prop('disabled', true);
    $('#edate').prop('disabled', true);
    $('#address').prop('disabled', true);
    $('#stclass').prop('disabled', true);
    $("#save").prop("disabled", true);
    $("#change").prop("disabled", true);
    $("#reset").prop("disabled", true);
    $("#rollno").focus();
}

function validateData() {
    var rollno, fname, stclass, bdate, address, edate;
    rollno = $("#rollno").val();
    fname = $("#fname").val();
    stclass = $("#stclass").val();
    bdate = $("#bdate").val();
    address = $("#address").val();
    edate = $("#edate").val();

    if (rollno === "") {
        alert("Student Roll No. is missing");
        $("#rollno").focus();
        return "";
    }
    if (fname === "") {
        alert("Student Name is missing");
        $("#fname").focus();
        return "";
    }
    if (stclass === "") {
        alert("Student Class is missing");
        $("#stclass").focus();
        return "";
    }
    if (bdate === "") {
        alert("Student birthdate is missing");
        $("#bdate").focus();
        return "";
    }
    if (address === "") {
        alert("Student Address is missing");
        $("#address").focus();
        return "";
    }
    if (edate === "") {
        alert("Student Enrollment Date is missing");
        $("#edate").focus();
        return "";
    }
    var jsonStrObj = {
        no: rollno,
        name: fname,
        class: stclass,
        bdate: bdate,
        address: address,
        edate: edate
    };
    return JSON.stringify(jsonStrObj);

}

function getData() {
    var empIdJsonObj = getempIdJsonObj();
    var getRequest = createGET_BY_KEYRequest(connToken, DBname, RelationName, empIdJsonObj);
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommandAtGivenBaseUrl(getRequest, jpdbBaseURL, jpdbIRL);
    jQuery.ajaxSetup({async: true});
    if (resultObj.status === 400) {
        $('#save').prop('disabled', false);
        $('#reset').prop('disabled', false);
        $('#fname').prop('disabled', false);
        $('#bdate').prop('disabled', false);
        $('#edate').prop('disabled', false);
        $('#address').prop('disabled', false);
        $('#stclass').prop('disabled', false);
        $('#rollno').focus();

    } else if (resultObj.status === 200) {
        $('#rollno').prop('disabled', true);
        fillData(resultObj);

        $('#change').prop('disabled', false);
        $('#reset').prop('disabled', false);
        $('#fname').prop('disabled', false);
        $('#bdate').prop('disabled', false);
        $('#edate').prop('disabled', false);
        $('#address').prop('disabled', false);
        $('#stclass').prop('disabled', false);
        $('#rollno').focus();
    }
}

function saveData() {
    var jsonStrObj = validateData();
    if (jsonStrObj === "") {
        return "";
    }
    var putRequest = createPUTRequest(connToken, jsonStrObj, DBname, RelationName);
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommandAtGivenBaseUrl(putRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    resetForm();
    $('#rollno').focus();
}

function changeData() {
    $('#change').prop('disabled', true);
    jsonChg = validateData();
    var updateRequest = createUPDATERecordRequest(connToken, jsonChg, DBname, RelationName, localStorage.getItem("recno"));
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommandAtGivenBaseUrl(updateRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    console.log(resultObj);
    resetForm();
    $('#rollno').focus();
}