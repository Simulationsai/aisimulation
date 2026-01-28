import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Wallet } from '../entities/wallet.entity'
import { Transaction } from '../entities/transaction.entity'

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet)
    private walletRepository: Repository<Wallet>,
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {}

  async getBalance(userId: string) {
    let wallet = await this.walletRepository.findOne({ where: { userId } })
    
    if (!wallet) {
      // Create wallet if doesn't exist
      wallet = this.walletRepository.create({
        userId,
        balance: 0,
        staked: 0,
        pending: 0,
      })
      await this.walletRepository.save(wallet)
    }

    return {
      total: parseFloat(wallet.balance.toString()) + parseFloat(wallet.staked.toString()) + parseFloat(wallet.pending.toString()),
      available: parseFloat(wallet.balance.toString()),
      staked: parseFloat(wallet.staked.toString()),
      pending: parseFloat(wallet.pending.toString()),
      // XP is the primary reward unit; XP will later convert to on-chain SIMU tokens.
      currency: 'XP',
    }
  }

  async deposit(userId: string, amount: number, txHash: string) {
    let wallet = await this.walletRepository.findOne({ where: { userId } })
    
    if (!wallet) {
      wallet = this.walletRepository.create({
        userId,
        balance: 0,
        staked: 0,
        pending: 0,
      })
    }

    wallet.balance = parseFloat(wallet.balance.toString()) + amount
    await this.walletRepository.save(wallet)

    const tx = this.transactionRepository.create({
      userId,
      type: 'deposit',
      amount,
      txHash,
      status: 'completed',
    })
    await this.transactionRepository.save(tx)

    return {
      id: tx.id,
      type: tx.type,
      amount: tx.amount,
      status: tx.status,
      timestamp: tx.timestamp,
    }
  }

  async withdraw(userId: string, amount: number, address: string) {
    const wallet = await this.walletRepository.findOne({ where: { userId } })
    if (!wallet) {
      throw new NotFoundException('Wallet not found')
    }

    const currentBalance = parseFloat(wallet.balance.toString())
    if (currentBalance < amount) {
      throw new Error('Insufficient balance')
    }

    wallet.balance = currentBalance - amount
    await this.walletRepository.save(wallet)

    const tx = this.transactionRepository.create({
      userId,
      type: 'withdrawal',
      amount,
      address,
      status: 'pending',
    })
    await this.transactionRepository.save(tx)

    return {
      id: tx.id,
      type: tx.type,
      amount: tx.amount,
      status: tx.status,
      timestamp: tx.timestamp,
    }
  }

  async getTransactions(userId: string) {
    return this.transactionRepository.find({
      where: { userId },
      order: { timestamp: 'DESC' },
      take: 50,
    })
  }

  async getDepositAddress(userId: string) {
    let wallet = await this.walletRepository.findOne({ where: { userId } })
    
    if (!wallet) {
      wallet = this.walletRepository.create({
        userId,
        balance: 0,
        staked: 0,
        pending: 0,
        depositAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
      })
      await this.walletRepository.save(wallet)
    } else if (!wallet.depositAddress) {
      wallet.depositAddress = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb'
      await this.walletRepository.save(wallet)
    }

    return {
      address: wallet.depositAddress,
      network: 'Base',
      chainId: 8453,
    }
  }
}
