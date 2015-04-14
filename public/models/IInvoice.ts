/**
 * Created by thanhquanky on 4/10/15.
 */
export interface IInvoice {
    id: number;
    invoiceItems: IInvoiceItem[];
    vendor: IVendor;
    create
}