export interface Reservas{
    reservas: Reserva[]
}

export interface data{
    content: Reserva[],
    totalElements: number,
    totalPages: number
}

export interface Reserva{
    id: number,
    nome: string,
    documento: string,
    checkin: Date,
    checkout: Date,
    valorReserva: number,
    desconto?: number
    pagamentos: Pagamento[],
    ativo: boolean,
}

export interface Pagamento{
    id: number,
    reservaId: number,
    parcela: number,
    dataPagamento: Date,
    valorPagamento: number
}