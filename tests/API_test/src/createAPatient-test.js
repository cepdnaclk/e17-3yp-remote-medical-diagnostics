pm.test("Status code is 201", function () {
    pm.response.to.have.status(201);
});

const res = pm.response.json() //parse the response body

//get variables
const patient_email = pm.collectionVariables.get("patient_email");
const patient_name = pm.collectionVariables.get("patient_name");

//verify the name
pm.test("Name is correct", ()=>{
    pm.expect(res.name).to.eql(patient_name);
})

//verify the email
pm.test("Email is correct", ()=>{
    pm.expect(res.email).to.eql(patient_email);
})

//test the availability of content type
pm.test("Content-Type header is present", () => {
  pm.response.to.have.header("Content-Type");
});

//test the data types of the response body
pm.test("Test data types of the response body", ()=> {
    pm.expect(res).to.be.an("object");
    pm.expect(res.name).to.be.a("string");
    pm.expect(res.age).to.be.a("number");
})

