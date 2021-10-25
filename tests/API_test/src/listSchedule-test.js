pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});
//content-type header check
pm.test("Content-Type is present", function () {
    pm.response.to.have.header("Content-Type");
});

response = pm.response.json();

const doctor_email = pm.collectionVariables.get("doctor_email");

//check whether the response body is an array
pm.test("Response body received", ()=>{
    pm.expect(response).to.be.an("array");
})

//check whether the schedule created exists on the schedule list
const required_schedule = response.filter(entry => entry.doctor === doctor_email)

pm.test("Schedule has been created properly", ()=>{
    pm.expect(required_schedule[0].doctor).to.eql(doctor_email);
})