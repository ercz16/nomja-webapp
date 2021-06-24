import { useEffect } from 'react'
import { fb } from '../../firebase/Firebase'
const firestore = fb().firestore, auth = fb().auth

enum RewardType {
    VISIT = "VISIT",
    POINTS = "POINTS",
    DISCOUNT = "DISCOUNT"
}

interface IRewardOptions {
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