pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});
const response = pm.response.json();

pm.test("Response body received", ()=>{
    pm.expect(response).to.be.an("object");
})