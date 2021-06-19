import { useEffect } from 'react'
import { firestore } from '../../firebase/Firebase'

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

const createReward = async (programId, rewardOptions: IRewardOptions) => {
    const db = await firestore().collection('programs')
    const update = await db.doc(programId).update({ rewards: firestore.FieldValue.arrayUnion(rewardOptions) })
}

export { createReward }