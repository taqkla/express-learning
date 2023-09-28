import { authenticateToken } from "../app"
import jwt from "jsonwebtoken"


describe("verify token test",()=>{
    test("if authenticated",()=>{
        const res={};
        const req={
            header:jest.fn(()=>"myAuthToken")
        }
        const next=jext.fn();
    })
})
