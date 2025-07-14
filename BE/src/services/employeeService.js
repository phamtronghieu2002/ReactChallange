import { db } from "~/firebase";
import { COLLECTIONS } from "~/constants/collections";
import mailTransporter from "~/config/mailler";
import { generateOTP } from "~/utils/twilo";
import { BaseModel } from "~/models";
import { hashPassword } from "~/utils/bycrypt";
import ROLES from "~/constants/roles";




export const handleUpdateEmployee = async (employeeId, employee) => {
    await db.collection(COLLECTIONS.employees).doc(employeeId).update(employee);
    return {
        message: "Employee updated successfully",
        success: true,
        data: (await db.collection(COLLECTIONS.employees).doc(employeeId).get()).data()
    }

}


export const handleGetEmployee = async (employeeId) => {

    const snapShot = await db.collection(COLLECTIONS.employees).doc(employeeId).get();
   
    if(!snapShot.exists){
        return {
            message: "Employee not found",
            success: false,
            data: null
        }
    }

    return {
        message: "Employee fetched successfully",
        success: true,
        data: snapShot.data()
    }
}

export const handleGetEmployeeByRole = async (role) => {

    const snapShot = await db.collection(COLLECTIONS.employees).where('role', '==', role).get();


    return snapShot.docs.map(doc => {
        return {
            ...doc.data()
        }
    });
}
export const handleDeleteEmployee = async (employeeId) => {

    const result = await db.collection(COLLECTIONS.employees).doc(employeeId).delete();

    return result;
}


export const handleGetEmployees = async () => {
    // get by role
    const snapShot = await db.collection(COLLECTIONS.employees).where('role', '==', ROLES.EMPLOYEE).get();

    return snapShot.docs.map(doc => {
        return {
            ...doc.data()
        }
    });
}

export const handleCreateEmployeeAuth = async (employee) => {
    const { email, name = "", department = "", address = "", phoneNumber = "" } = employee;

    const accessCode = generateOTP();
    const snapShot = await db.collection(COLLECTIONS.employees).where('email', '==', email).get();

    mailTransporter.sendMail({
        from: 'lekhahieutamkhiem@gmail.com',
        to: email,
        subject: 'Welcome to our company',
        text: `click this link to register account :http://localhost:5173/register?email=${email}&accessCode=${accessCode}`
    });
    let data = {}

    if (!snapShot.empty) {
        const docId = snapShot.docs[0].id;
        await db.collection(COLLECTIONS.employees).doc(docId).update({
            accessCode: accessCode,
            createdAt: new Date(),
        })
        data = (await db.collection(COLLECTIONS.employees).doc(docId).get()).data();
        return {
            message: "Code is sent to email please check your email",
            data,
            success: true
        }

    }

    const fb = await db.collection(COLLECTIONS.employees).add({
        ...BaseModel.employees,
        phoneNumber,
        accessCode,
        department,
        name,
        email,
        role: "Employee",
        address,
        createdAt: new Date(),
    })

    await fb.update({
        employeeId: fb.id,
    })

    data = (await fb.get()).data();
    return {
        message: "Code is sent to email please check your email",
        data,
        success: true
    }
}

export const handleCreateEmployee = async (employee) => {
    const { email } = employee;

    const snapShot = await db.collection(COLLECTIONS.employees).where('email', '==', email).get();
    if (!snapShot.empty) {
        return {
            success: false,
            message: "Email is exist please use another email"
        }
    }

    return await handleCreateEmployeeAuth(employee)


}



export const handleRegisterEmployee = async (email, accessCode, password, username) => {

    const snapShot = await db.collection(COLLECTIONS.employees).where('email', '==', email).where('accessCode', '==', Number(accessCode)).get();

    if (snapShot.empty) {
        return false;
    }

    const docId = snapShot.docs[0]

    await db.collection(COLLECTIONS.employees).doc(docId.id).update({
        password: hashPassword(password),
        username,
        status: true,
    })


 




    return true;
}




