pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});
const response = pm.response.json();

pm.test("Response body received", ()=>{
    pm.expect(response).to.be.an("object");
})

//verify the modification was done properly
pm.test("Patient added properly", ()=>{
    pm.expect(response.n).to.eql(1);
    pm.expect(response.nModified).to.eql(1);
})