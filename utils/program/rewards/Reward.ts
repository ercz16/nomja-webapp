import { useEffect } from 'react'
import firebase from '../../firebase/Firebase'
const firestore = firebase.firestore, auth = firebase.auth

enum RewardType {
    VISIT = "VISIT",
    POINTS = "POINTS",
    DISCOUNT = "DISCOUNT"
}

interface IRewardOptions {
    id: string,
    name: string,
    description?: string,
    attributes: {
        type: RewardType,
        required?: number,
        discount?: number,
        activeUntil?: Date
    }
}

const createReward = async (userId, programId, rewardOptions: IRewardOptions) => {
    const db = await firestore().collection('programs')
    const update = await db.doc(programId).update({ rewards: firestore.FieldValue.arrayUnion(rewardOptions) })
}

export { createReward }