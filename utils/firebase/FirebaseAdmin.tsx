import * as firebaseAdmin from "firebase-admin";
  
if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      projectId: 'nomja-c0d40',
      clientEmail: 'firebase-adminsdk-3n512@nomja-c0d40.iam.gserviceaccount.com',
      privateKey: '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCQs0lgPHND/Oxo\n/FRXCsBdj/M0rps5j+y5nwxEhvU1ib8cEKi/TpaW1B7wQB0O1UHFhihZeG6h+oH1\nerzUFZ3HBsY3dAUUHAZrYtetxF7eRsRaerGP11erRDDzUCFTICt77hvx/0GaaCxY\ne9OqqaB3TMwMWdzoBN+gKGCMK3iq6+pfKUeykLXnCrO6UyOmDhbjZWUoPDtAD/Zr\nxNoCP6JL/h1DYa1sDF1Rrt5pEPvC3RxuOJVyGHOwTz7sXQXF5OdpTSlL3g65yu/W\nuNW3pD2XHNCY5gjvbzqhVZFJ4Z5pout8rJ1wKt+zEH3z0xdEc9/V9VoHRBb2lcuW\nuZUm7imHAgMBAAECggEACvRfxjbdXRTNSwdrVSmdtZebyG29l6aDO+xED/4Nm0+B\n1dyXAeCvutx1OSgJayGO+Ka28EsTSRT/eLehiwbV6objQ7h3V/XlMIULof6fVgGS\nhO0L+0FIxFEFya3T0Ai78gZtPC1gaJGhZdN+C0oLOWzpd7fn5vLTgTr9UC9MU9gq\nP1EdKXNvzDBySBIQW9MBuP81u69AvWJCgVri+uxl/Tg3jPVu2ZN30tcURpN5zI6l\nRplf/s2ahCVDFR4UNr6qt0Im0W+fHv9ISae0ojCon6iFkYnL1t5MSOeYiKqSEakp\nxQuqQS+nPCjylc2Sxn92raNBlopI7RqTM5cfTbkzNQKBgQDGBO5WLKKZMpRpjSfZ\n7Twbei14/EAbH6o9jGS4NBUvFYtath8Uqh4TYyuPx5/phlzOue28WJlq2TAkRXlP\ncFHkGzezPxMSkBym0r1i8P/5sj7dgoPfPD//OFsRA9/lhoUToxgT1xUlFEewMZBC\nUqJtcr1+Pk9RGvxQ00PsmHG/cwKBgQC7EbEM/tFIPx4CHrQ7GZJ2oAtHbVVkiZqx\nSCY/ljb+IeBJftbsSwjDbWvm3EaCiUFJOn06We+nq3SxOBNyzXDiIb4nkOKWe/Uq\nSucud2y69tdVWfUD3uFdJO2HC4QLe4XkiDbzRuUneXG/F57gmhclS8VGa9r52Quf\ncM9Qb7VAnQKBgQCWZQJbotTvw9GihRniU2MWf2nv/K33q8oRqwKIQM5iD1viznW2\nrSngka5xKi2TIIB2ZhJgvW3wD/qXYcisA+O+esmIMvyaWafZMC+06NORYsaKWGkt\n8EWu4q+PscCoQ83oxzMvRmkB23BDKrGlHbvNopq3Oj3lnLhL7tkk5fdmbwKBgQCp\nFWCWgmvfhU02VVJKaN69YgNP2D7q1IWB39jSeI/UPAJh68ePZHLTUT/KNyd0LWNZ\nMQiniUrYnlynIixSA+cYPa+GS6rCoeADDhjPIxqgEySm/Nw9V2MTsaEQAxSi3E81\nNPmWAmp1t4tcUZlFIYHyL/5rnGkck1WyE2EPLykA8QKBgHMrErj6sQD+vdoh588J\nDSkFfliM4spodasizxOyJcq0qDh7tlflIcP5jiYyCvEXRQR9FGYcU56Lt7OUj+Ku\n551irJEUupJo360kfmvqa9aeEcZioTHApZnwVJYGVU9NGfgxfc77Es5eM+P6gcg4\n9wz8O1KpAYe0GWS+MejNAgDh\n-----END PRIVATE KEY-----\n'
    }),
    databaseURL: `https://nomja-c0d40-default-rtdb.firebaseio.com`,
  })
}
  
export { firebaseAdmin }