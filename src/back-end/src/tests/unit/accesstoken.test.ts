import { createAccessToken, verifyAccessToken } from "../../service/session.service"

test("AccessToken: content should be equal", () => {

    const email = 'user@example.com'
    const type = 'patient'

    const token = createAccessToken({
        email,
        type
    })

    const afterDecode = verifyAccessToken(token)
    expect(afterDecode).toHaveProperty("email",email)
    expect(afterDecode).toHaveProperty("type",type)
})