import { COLLECTIONS } from "~/constants/collections"
import { db } from "~/firebase"
import { BaseModel } from "~/models"


export const handleCreateConversation = async (members) => {
   

    
  
    const isExist = await db.collection(COLLECTIONS.conversation).where('members',"==", members).get();
   
    
    if (!isExist.empty) {
        return {
            message: "conversation already exists",
            success: false,
            data: isExist.docs[0].data()
        }
    }   

    const conversation = await db.collection(COLLECTIONS.conversation).add({
        ...BaseModel.conversation,
        members: members.sort()
    })
    await conversation.update({
        conversationId: conversation.id,
    })

    return {
        message: "conversation created successfully",
        success: true,
        data: (await conversation.get()).data()
    }
}

export const handleGetConversation = async (employeeId) => {

    const snapShot = await db.collection(COLLECTIONS.conversation).where('members', 'array-contains', employeeId).get();

    return snapShot.docs.map(doc => {
        return {
            ...doc.data()
        }
    });
}