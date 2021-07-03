import { nanoid } from 'nanoid'
import QRCode from 'qrcode'
import firebase from '../firebase/Firebase'
import { v4 as genUuid } from 'uuid'

const firestore = firebase.firestore,
  auth = firebase.auth,
  functions = firebase.functions

interface IProgramOptions {
  name: string
  description?: string
  uniqueCode: string
}

var assignPhoneNumber = functions().httpsCallable('assignPhoneNumber')
var deleteProgramFunc = functions().httpsCallable('deleteProgram')

const createClientProgram = async (user, options: IProgramOptions) => {
  const programId = genUuid()
  const userDoc = await firestore().collection('users').doc(user.login.uid).get()

  //  const programId = nanoid(32).replaceAll(/[^a-zA-Z\d\s:\u00C0-\u00FF]/g
  //   , '')

  const res = await fetch('/api/user/assignPhoneNumber',
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ apiKey: userDoc.data().apiKeys[0], programId: programId})
      })
  const json = await res.json()

  const qrcode = await QRCode.toDataURL(
    `SMSTO:${
        json.phoneNum
    }:@${options.uniqueCode.toLowerCase()}`,
    { scale: 25 }
  )

  const schema = {
    creation: new Date().toString(),
    description: !options.description ? '' : options.description,
    name: options.name,
    id: programId,
    rewards: [],
    users: [],
    uniqueCode: options.uniqueCode.toLowerCase(),
    phoneNum: json.phoneNum,
    qrcode: qrcode,
  }

  const userUpdate = await firestore()
    .collection('users')
    .doc(user.login.uid)
    .update({ programs: firestore.FieldValue.arrayUnion(schema) })
  const programUpdate = await firestore()
    .collection('programs')
    .doc(schema.id)
    .set(schema)

  return schema
}

const deleteProgram = async (uid, programId) => {
  const db = firestore().collection('programs')
  const snapshot = await db.doc(programId).get()
  const userDoc = await firestore().collection('users').doc(uid).get()
  const userUpdate = await firestore()
    .collection('users')
    .doc(uid)
    .update({
      programs: firestore.FieldValue.arrayRemove(
        userDoc.data().programs.filter((program) => program.id == programId)[0]
      ),
    })
  for (const user of snapshot.data().users) {
    const customerDoc = await firestore()
      .collection('customers')
      .doc(user.phoneNum)
      .get()
    const notify = await firestore()
      .collection('messages')
      .add({
        from: snapshot.data().phoneNum,
        to: user.phoneNum,
        body: `${
          snapshot.data().uniqueCode
        } has been deleted. You will no longer receive texts from this number.`,
      })
    const customerUpdate = await firestore()
      .collection('customers')
      .doc(user.phoneNum)
      .update({
        programs: firestore.FieldValue.arrayRemove(
          customerDoc
            .data()
            .programs.filter((program) => program.id == snapshot.data().id)[0]
        ),
      })
  }
  const func = await deleteProgramFunc({ program: snapshot.data() })
  const deletion = await db.doc(programId).delete()
}

export { createClientProgram, deleteProgram }
