import { COLLECTIONS } from "~/constants/collections";
import { db } from "~/firebase";
import { BaseModel } from "~/models";

export const handleSendMessage = async (senderId, conversationId, message, receiverId) => {
    const fb = await 
    db.collection(COLLECTIONS.message).add({
        ...BaseModel.message,
        senderId,
        conversationId,
        message,
        receiverId
    })
    await fb.update({
        messageId: fb.id,
    })
    await db.collection(COLLECTIONS.conversation).doc(conversationId).update({
        lastMessage: message
    })
    return (await fb.get()).data();
}

export const handleGetMessage = async (conversationId) => {
    const snapShot = await db.collection(COLLECTIONS.message).where('conversationId', '==', conversationId).orderBy('createdAt', 'asc').get();

    await db.collection(COLLECTIONS.conversation).doc(conversationId).update({
        isRead: true
    })
    return snapShot.docs.map(doc => {
        return {
            ...doc.data()
        }
    });
}