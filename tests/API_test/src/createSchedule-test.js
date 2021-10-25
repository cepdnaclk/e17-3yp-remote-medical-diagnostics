pm.test("Status code is 201", function () {
    pm.response.to.have.status(201);
});

const response = pm.response.json();

//get variables
const doctor_email = pm.collectionVariables.get("doctor_email");
const doctor_name = pm.collectionVariables.get("doctor_name");

pm.test("Response body received", ()=>{
    pm.expect(response).to.be.an("object");
})

//Check doctor details
pm.test("Doctor's is correct",()=>{
    pm.expect(response.doctorName).to.eql(doctor_name);
})

pm.test("Doctor's email is correct", ()=>{
    pm.expect(response.doctor).to.eql(doctor_email)
})

pm.test("Patient list is initially empty", ()=>{
    pm.expect(response.patients.length).to.eql(0);
})

//test the availability of content type
pm.test("Content-Type header is present", () => {
  pm.response.to.have.header("Content-Type");
});

//set the schedule_Id as a collection variable
pm.collectionVariables.set("schedule_Id", response._id);