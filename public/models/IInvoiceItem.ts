/**
 * Created by thanhquanky on 4/10/15.
 */

module ngPharm.Models {
    export interface IInvoiceItem {
        id: number;
        drug: string;
        unit: string;
        expirationDate: Date;
        manufactureDate: Date;
        quantity: number;
        price: number;
    }
}