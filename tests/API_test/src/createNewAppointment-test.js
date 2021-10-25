pm.test("Status code is 201", function () {
    pm.response.to.have.status(201);
});
const response = pm.response.json();


//get variables
const patient_email = pm.collectionVariables.get("patient_email");
const doctor_email = pm.collectionVariables.get("doctor_email");
const schedule_Id = pm.collectionVariables.get("schedule_Id");

//verify the patient
pm.test("Patient is correct", ()=>{
    pm.expect(response.patient).to.eql(patient_email);
})

//doctor is correct
pm.test("Doctor is correct", ()=>{
    pm.expect(response.doctor).to.eql(doctor_email);
})

//verify that the appointment has been made to the correct schedule
pm.test("Schedule is correct",()=>{
    pm.expect(response.scheduleId).to.eql(schedule_Id);
})