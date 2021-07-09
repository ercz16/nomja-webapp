import { ImageAnnotatorClient } from "@google-cloud/vision"
import extractDate from 'extract-date'

const credentials = {
  client_email: "firebase-adminsdk-3n512@nomja-c0d40.iam.gserviceaccount.com",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCQs0lgPHND/Oxo\n/FRXCsBdj/M0rps5j+y5nwxEhvU1ib8cEKi/TpaW1B7wQB0O1UHFhihZeG6h+oH1\nerzUFZ3HBsY3dAUUHAZrYtetxF7eRsRaerGP11erRDDzUCFTICt77hvx/0GaaCxY\ne9OqqaB3TMwMWdzoBN+gKGCMK3iq6+pfKUeykLXnCrO6UyOmDhbjZWUoPDtAD/Zr\nxNoCP6JL/h1DYa1sDF1Rrt5pEPvC3RxuOJVyGHOwTz7sXQXF5OdpTSlL3g65yu/W\nuNW3pD2XHNCY5gjvbzqhVZFJ4Z5pout8rJ1wKt+zEH3z0xdEc9/V9VoHRBb2lcuW\nuZUm7imHAgMBAAECggEACvRfxjbdXRTNSwdrVSmdtZebyG29l6aDO+xED/4Nm0+B\n1dyXAeCvutx1OSgJayGO+Ka28EsTSRT/eLehiwbV6objQ7h3V/XlMIULof6fVgGS\nhO0L+0FIxFEFya3T0Ai78gZtPC1gaJGhZdN+C0oLOWzpd7fn5vLTgTr9UC9MU9gq\nP1EdKXNvzDBySBIQW9MBuP81u69AvWJCgVri+uxl/Tg3jPVu2ZN30tcURpN5zI6l\nRplf/s2ahCVDFR4UNr6qt0Im0W+fHv9ISae0ojCon6iFkYnL1t5MSOeYiKqSEakp\nxQuqQS+nPCjylc2Sxn92raNBlopI7RqTM5cfTbkzNQKBgQDGBO5WLKKZMpRpjSfZ\n7Twbei14/EAbH6o9jGS4NBUvFYtath8Uqh4TYyuPx5/phlzOue28WJlq2TAkRXlP\ncFHkGzezPxMSkBym0r1i8P/5sj7dgoPfPD//OFsRA9/lhoUToxgT1xUlFEewMZBC\nUqJtcr1+Pk9RGvxQ00PsmHG/cwKBgQC7EbEM/tFIPx4CHrQ7GZJ2oAtHbVVkiZqx\nSCY/ljb+IeBJftbsSwjDbWvm3EaCiUFJOn06We+nq3SxOBNyzXDiIb4nkOKWe/Uq\nSucud2y69tdVWfUD3uFdJO2HC4QLe4XkiDbzRuUneXG/F57gmhclS8VGa9r52Quf\ncM9Qb7VAnQKBgQCWZQJbotTvw9GihRniU2MWf2nv/K33q8oRqwKIQM5iD1viznW2\nrSngka5xKi2TIIB2ZhJgvW3wD/qXYcisA+O+esmIMvyaWafZMC+06NORYsaKWGkt\n8EWu4q+PscCoQ83oxzMvRmkB23BDKrGlHbvNopq3Oj3lnLhL7tkk5fdmbwKBgQCp\nFWCWgmvfhU02VVJKaN69YgNP2D7q1IWB39jSeI/UPAJh68ePZHLTUT/KNyd0LWNZ\nMQiniUrYnlynIixSA+cYPa+GS6rCoeADDhjPIxqgEySm/Nw9V2MTsaEQAxSi3E81\nNPmWAmp1t4tcUZlFIYHyL/5rnGkck1WyE2EPLykA8QKBgHMrErj6sQD+vdoh588J\nDSkFfliM4spodasizxOyJcq0qDh7tlflIcP5jiYyCvEXRQR9FGYcU56Lt7OUj+Ku\n551irJEUupJo360kfmvqa9aeEcZioTHApZnwVJYGVU9NGfgxfc77Es5eM+P6gcg4\n9wz8O1KpAYe0GWS+MejNAgDh\n-----END PRIVATE KEY-----\n",
  projectId: "nomja-c0d40",
  project_id: "nomja-c0d40",
};

const visionClient = new ImageAnnotatorClient({
  credentials: credentials,
});

const web = /(https?:\/\/)?(www\.)?[a-z0-9]+\.(com|org)(\.[a-z]{2,3})?/
const phone = /^[+]?(\d{1,2})?[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]\d{4}$/
const time =  /(?:\d|2[0-3])?:?(?:[0-5]\d):(?:[0-5]\d)/
const date = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
const email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

interface IScanOutput {
  transaction: {
    tender: string,
    change: number,
    paid: number,
    total: number,
  },
  phones: Array<string>,
  emails: Array<string>,
  websites: Array<string>,
  date: string,
  time: number,
  fullDate: number
}

const formatPhoneNumber = (phoneNumberString) => {
  var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
  var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    var intlCode = (match[1] ? '+1 ' : '');
    return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
  }
  return null;
}

const isFloat = (n) => {
  return Math.ceil(parseFloat(n)) !== n
}

const getAllSubstrings = (s) => {
  var i, j, result = []
  const size = 0
  for (i = 0; i < s.length; i++) {
    for (j = s.length; j - i >= size; j--) {
      result.push(s.slice(i, j))
    }
  }
  return result
}


const scanOutput = (input: string): IScanOutput => {
  const result = {
    transaction: { tender: 'CARD', change: 0, paid: -5e24, total: -5e24 }, phones: [], emails: [], websites: [], date: null, time: null, fullDate: null
  }

  const split = input.split(' ').map(str => str.trim())

  const totals = []
  var paidCash = false

  for (const s of split) {
    const substrings = getAllSubstrings(s)

    if ((s.toLowerCase().includes('cash') && !s.toLowerCase().includes('cashier')) || s.toLowerCase().includes('change')) {
        paidCash = true
        result.transaction.tender = 'CASH'
    }

    const reduced = s.includes('$') ? s.substr(1) : s
    //const numeric = reduced.replace(/[^0-9\.]/g, '')
    if (reduced.includes('.') && /[0-9]/.test(reduced) && !/[^[0-9\.]/.test(reduced) && isFloat(reduced)) {
      if (parseFloat(reduced) > result.transaction.total) {
        result.transaction.paid = parseFloat(reduced)
        result.transaction.total = parseFloat(reduced)
      }
      totals.push(parseFloat(reduced))
    }

    for (const sub of substrings) {
      if (time.test(sub)) {
        result.time = sub
        break
      } else if (date.test(sub)) {
        result.date = sub
        break
      } else if (phone.test(sub)) {
        if (!result.phones.includes(sub)) {
          result.phones.push(sub)
        }
        break
      } else if (email.test(sub.toLowerCase())) {
        if (!result.emails.includes(sub.toLowerCase())) {
          result.emails.push(sub.toLowerCase())
        }
        break
      } else if (web.test(sub.toLowerCase()) && !sub.includes('@')) {
        if (!result.websites.includes(sub.toLowerCase())) {
          result.websites.push(sub.toLowerCase())
        }
        break
      }
    }

  }

  const sortedTotals = totals.sort((a, b) => { return a - b })
  if (sortedTotals.length >= 3) {
      const top3 = sortedTotals.slice(sortedTotals.length - 3)

      const paid = top3[2]
      const change = top3[1]
      const total = top3[0]

      if (change == 0 && change == total) {
        result.transaction.change = 0
        result.transaction.paid = 0
        result.transaction.total = 0
        result.transaction.tender = 'FREE'
      }

      if (paid - change == total) {
        result.transaction.change = change
        result.transaction.paid = paid
        result.transaction.total = total
      }
  }

  result.phones = result.phones.map(phone => formatPhoneNumber(phone.replace(/[^0-9]/g, '')))

  if (result.date) {
    result.fullDate = new Date(`${result.date} ${result.time ? result.time : ''}`).getTime()
  }

  return result
}

const search = async (path: Buffer): Promise<IScanOutput> => {
  const [result] = await visionClient.textDetection(path)
  const detections = result.textAnnotations
  const splitToString = detections.map((desc) => desc.description)[0].split('\n').join(' ')

  const output: IScanOutput = scanOutput(splitToString)

  return output
}

export { search }