import { objectType } from 'nexus'

export const Wallet = objectType({
  name: 'Wallet',
  definition(t) {
    t.model.id()
    t.model.balance()
    t.model.userId()
    t.model.user()
    t.model.walletTransactions()
    t.model.createdAt()
    t.model.updatedAt()
  },
})
