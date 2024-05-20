import { a as axios } from './axios-dbdb94c4.js';
import { T as Token } from './Token-692eae02.js';

class PaymentService extends Token {
    async AddPayment(payment, book_nbr) {
        try {
            const token = this.getToken();
            if (token !== null) {
                const { data } = await axios.post(`/Do_Payment?Ticket=${token}`, { payment: Object.assign(Object.assign({}, payment), { book_nbr }) });
                if (data.ExceptionMsg !== '') {
                    throw new Error(data.ExceptionMsg);
                }
                return data.My_Result;
            }
        }
        catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }
    async CancelPayment(id) {
        try {
            const token = this.getToken();
            if (token !== null) {
                const { data } = await axios.post(`/Cancel_Payment?Ticket=${token}`, { id });
                if (data.ExceptionMsg !== '') {
                    throw new Error(data.ExceptionMsg);
                }
                return data.My_Result;
            }
        }
        catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }
}

export { PaymentService as P };

//# sourceMappingURL=payment.service-a8c298a9.js.map