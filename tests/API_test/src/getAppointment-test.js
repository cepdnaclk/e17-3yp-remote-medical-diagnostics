pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});
const response = pm.response.json();

pm.test("Response body received", ()=>{
    pm.expect(response[0]).to.be.an("object");
})

const doctor_email = pm.collectionVariables.get("doctor_email");

pm.test("Doctor is Correct", ()=>{
    pm.expect(response[0].doctor).to.eql(doctor_email)
})