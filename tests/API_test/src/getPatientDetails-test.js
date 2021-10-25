pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});
const response = pm.response.json();

//get variables
const patient_email = pm.collectionVariables.get("patient_email");
const patient_name = pm.collectionVariables.get("patient_name");

pm.test("Response body received", ()=>{
    pm.expect(response).to.be.an("object");
})

pm.test("Name is Correct", ()=>{
    pm.expect(response.name).to.eql(patient_name)
})

pm.test("User type is correct", ()=>{
    pm.expect(response.type).to.eql("patient")
})

pm.test("Email is correct", ()=>{
    pm.expect(response.email).to.eql(patient_email)
})