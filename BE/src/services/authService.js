import env from "~/config/env";
import { COLLECTIONS } from "~/constants/collections";
import { db } from "~/firebase";
import { BaseModel } from "~/models";
import { comparePassword, hashPassword } from "~/utils/bycrypt";
import { create_access_token } from "~/utils/jwt";
import { sendAccessCode } from "~/utils/twilo";


export const handleCreateNewAccessCode = async (phoneNumber) => {



    const accessCode = await sendAccessCode(`${phoneNumber}`);

    const snapShot = await db.collection(COLLECTIONS.employees).where('phoneNumber', '==', phoneNumber).get();



    if (snapShot.empty) {
        const fb = await db.collection(COLLECTIONS.employees).add({
            ...BaseModel.employees,
            name:"Admin",
            phoneNumber,
            accessCode,
            createdAt: new Date(),
        })

        await fb.update({
            employeeId: fb.id,
        })

    }
    else {
        const docId = snapShot.docs[0].id;
        await db.collection(COLLECTIONS.employees).doc(docId).update({
            accessCode,
            createdAt: new Date(),
        })
    }

    return accessCode;
}



export const handleValidateAccessCode = async (phoneNumber, accessCode) => {



    const snapShot = await db.collection(COLLECTIONS.employees).where('phoneNumber', '==', phoneNumber).where('accessCode', '==', Number(accessCode)).get();

    if (snapShot.empty) {
        return {
            message: "Access Code is not valid",
            success: false

        };
    }

    const data = snapShot.docs[0].data();

    delete data.password

    const accessToken = create_access_token({
        user: data
    }, env.JWT_ACCESS_TOKEN_EXPIRES_IN);

    return {
        message: "Access Code is valid",
        success: true,
        data: {
            accessToken,
            ...data
        }


    }

}


export const handleLoginPassword = async (username, password) => {
    const user = await db.collection(COLLECTIONS.employees).where('username', '==', username).get();


    if (user.empty) {
        return {
            success: false,
            message: "username or password is not correct !"
        };
    }

    const userData = user.docs[0].data()
    const checkCorrectPassword = comparePassword(password, userData.password)

    delete userData.password

    const accessToken = create_access_token({
        user: userData
    }, env.JWT_ACCESS_TOKEN_EXPIRES_IN);



    return {
        success: checkCorrectPassword,
        message: checkCorrectPassword ? "login success" : "username or password is not correct !",
        data: {
            ...userData,
            accessToken
        }
    }

}

