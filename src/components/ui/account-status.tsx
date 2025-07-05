import { Card } from './card'
import { cn } from '@/lib/utils'

type AccountType = 'bank' | 'broker'
type AccountStatus = 'connected' | 'disconnected' | 'error'

interface AccountStatusProps {
  name: string
  type: AccountType
  status: AccountStatus
  balance?: number
  lastSync?: Date
  className?: string
}

const AccountStatus = ({
  name,
  type,
  status,
  balance,
  lastSync,
  className
}: AccountStatusProps) => {
  const getStatusColor = () => {
    switch (status) {
      case 'connected':
        return 'text-green-600 bg-green-100'
      case 'disconnected':
        return 'text-yellow-600 bg-yellow-100'
      case 'error':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusText = () => {
    switch (status) {
      case 'connected':
        return 'Conectado'
      case 'disconnected':
        return 'Desconectado'
      case 'error':
        return 'Erro'
      default:
        return 'Desconhecido'
    }
  }

  const formatBalance = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  return (
    <Card className={cn('p-4', className)}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <h3 className="font-medium text-foreground">{name}</h3>
            <p className="text-sm text-muted-foreground capitalize">
              {type === 'bank' ? 'Banco' : 'Corretora'}
            </p>
          </div>
        </div>
        <div className={cn('px-2 py-1 rounded-full text-xs font-medium', getStatusColor())}>
          {getStatusText()}
        </div>
      </div>
      
      {balance !== undefined && (
        <div className="mb-2">
          <p className="text-sm text-muted-foreground">Saldo</p>
          <p className="text-lg font-semibold text-foreground">
            {formatBalance(balance)}
          </p>
        </div>
      )}
      
      {lastSync && (
        <div className="text-xs text-muted-foreground">
          Última sincronização: {formatDate(lastSync)}
        </div>
      )}
    </Card>
  )
}

export { AccountStatus, type AccountType, type AccountStatus as AccountStatusType } 