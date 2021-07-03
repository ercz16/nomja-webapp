import nookies from 'nookies'

import { firebaseAdmin } from '../firebase/FirebaseAdmin'
import { fetchSSRInfo } from '../program/Program'

const getSSRAuth = async (ctx) => {
  try {
    const cookies = nookies.get(ctx)
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token)
    const { uid } = token

    const user = await firebaseAdmin
      .firestore()
      .collection('users')
      .doc(uid)
      .get()

    if (!user.exists) throw new Error('User does not exist')

    const data = await user.data()

    return data
  } catch (e) {
    console.error(e)
    return {
      redirect: {
        permanent: false,
        destination: '/auth/signin',
      },
      props: {} as never,
    }
  }
}

const getSSRPropsUser = async (ctx) => {
  try {
    const user = await getSSRAuth(ctx)
    const programs = new Array()
    for (const program of user.programs) {
      const doc = await firebaseAdmin.firestore().collection('programs').doc(program.id).get()
      const data = doc.data()
      programs.push({ id: data.id, name: data.name, users: data.users, rewards: data.rewards, phoneNum: data.phoneNum })
    }
    return {
      props: {
        user: user,
        programs: programs
      },
    }
  } catch (e) {
    return {
      redirect: {
        permanent: false,
        destination: '/auth/signin',
      },
      props: {} as never,
    }
  }
}

const getSSRPropsProgram = async (ctx) => {
  const { id } = ctx.query
  try {
    const user = await getSSRAuth(ctx)
    const program = await fetchSSRInfo(id)
    const customers = new Array()
    for (const customer of program.users) {
      const doc = await firebaseAdmin.firestore().collection('customers').doc(customer.phoneNum).get()
      customers.push(doc.data())
    }
    return {
      props: {
        user: user,
        program: program,
        customers: customers
      },
    }
  } catch (e) {
    return {
      redirect: {
        permanent: false,
        destination: '/auth/signin',
      },
      props: {} as never,
    }
  }
}

const getSSRPropsRedeem = async (ctx) => {
  const { id } = ctx.query

  const db = firebaseAdmin.firestore().collection('spendLinks')
  const snapshot = await db.doc(id).get()

  if (!snapshot.exists) {
    return {
      props: {
        expired: false,
        error: true
      }
    }
  }

  const customer = await firebaseAdmin.firestore().collection('customers').doc(snapshot.data().redirect.customer).get()
  const program = await firebaseAdmin.firestore().collection('programs').doc(snapshot.data().redirect.program).get()

  if (!customer.exists || !program.exists) {
    return {
      props: {
        expired: false,
        error: true,
        rewards: []
      }
    }
  }

  if (new Date().getTime() > new Date(snapshot.data().expire).getTime()) {
    return {
      props: {
        expired: true,
        error: true,
        rewards: []
      }
    }
  }

  var totalPoints = 0, totalVisits = 0
  customer.data().rewards.forEach(reward => {
    if (reward.phoneNum == program.data().phoneNum) {
      switch (reward.type) {
        case "POINTS":
          totalPoints += reward.amount
          break
        case "VISIT":
          totalVisits++
          break
      }
    }
  })

  var availableRewards = new Array(0)
  for (const reward of program.data().rewards) {
    switch (reward.attributes.type) {
      case "POINTS":
        if (reward.attributes.required <= totalPoints) {
          availableRewards.push({ reward: reward, program: program.data().id })
        }
        break
      case "VISIT":
        if (reward.attributes.required <= totalVisits) {
          availableRewards.push({ reward: reward, program: program.data().id })
        }
        break 
    }
  }

  return {
    props: {
      expired: false,
      error: false,
      rewards: availableRewards,
      points: totalPoints,
      visits: totalVisits,
      customer: customer.data(),
      program: { name: program.data().name }
    }
  }

}

export { getSSRAuth, getSSRPropsUser, getSSRPropsProgram, getSSRPropsRedeem }
