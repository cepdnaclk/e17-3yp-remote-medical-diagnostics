pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});
const response = pm.response.json();

//set the access token as a collection variable
pm.collectionVariables.set("patient_token", response.accessToken);

//test the availability of content type
pm.test("Content-Type header is present", () => {
  pm.response.to.have.header("Content-Type");
});

pm.test("Tokens available", () =>{
    pm.expect(response).to.be.an("object");
    pm.expect(Object.keys(response).length).to.eql(2);
    pm.expect(response.accessToken).to.be.a("string");
})