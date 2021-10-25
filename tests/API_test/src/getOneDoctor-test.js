pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

const response = pm.response.json();

const doctor_name = pm.collectionVariables.get("doctor_name");

pm.test("Response body received", ()=>{
    pm.expect(response).to.be.an("object")
})

pm.test("Name is correct" , ()=>{ //check whether the name is correct
    pm.expect(response.name).to.eql(doctor_name);
})