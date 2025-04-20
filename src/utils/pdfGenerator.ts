
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
import { InvoiceItem, ProfileData } from "@/types/invoice";

interface GeneratePDFProps {
  invoiceNumber: string;
  invoiceDate: string;
  bookNumber: string;
  vehicleNumber: string;
  transportMode: string;
  placeOfSupply: string;
  reverseCharge: string;
  billedToName: string;
  billedToGstin: string;
  billedToAddress: string;
  billedToState: string;
  billedToStateCode: string;
  shippedToName: string;
  shippedToGstin: string;
  shippedToAddress: string;
  shippedToState: string;
  shippedToStateCode: string;
  items: InvoiceItem[];
  sgstRate: number;
  cgstRate: number;
  igstRate: number;
  freightCharges: number;
  profile: ProfileData;
}

export const generatePDF = ({
  invoiceNumber,
  invoiceDate,
  bookNumber,
  vehicleNumber,
  transportMode,
  placeOfSupply,
  reverseCharge,
  billedToName,
  billedToGstin,
  billedToAddress,
  billedToState,
  billedToStateCode,
  shippedToName,
  shippedToGstin,
  shippedToAddress,
  shippedToState,
  shippedToStateCode,
  items,
  sgstRate,
  cgstRate,
  igstRate,
  freightCharges,
  profile
}: GeneratePDFProps) => {
  const doc = new jsPDF();
  
  // Header
  doc.setFontSize(20);
  doc.text("TAX INVOICE", 105, 15, { align: "center" });
  
  doc.setFontSize(10);
  doc.text(`GSTIN: ${profile.gstin}`, 14, 10);
  doc.text(`Ph: ${profile.phone}`, 180, 10, { align: "right" });
  doc.text(`Mobile: ${profile.mobile}`, 180, 15, { align: "right" });
  
  // Company details
  doc.setFontSize(16);
  doc.setTextColor(128, 0, 128);
  doc.text(profile.companyName, 105, 25, { align: "center" });
  
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  doc.text(profile.tagline, 105, 30, { align: "center" });
  doc.text(profile.address, 105, 35, { align: "center" });
  doc.text(`E-mail: ${profile.email}`, 105, 40, { align: "center" });
  
  // Invoice details
  doc.line(10, 45, 200, 45);
  
  doc.text(`Invoice No: ${invoiceNumber}`, 14, 55);
  doc.text(`Book No: ${bookNumber}`, 105, 55);
  doc.text(`Vehicle No: ${vehicleNumber}`, 170, 55);
  
  doc.text(`Date of Invoice: ${invoiceDate}`, 14, 65);
  doc.text(`Mode of Transport: ${transportMode}`, 105, 65);
  
  doc.text(`Place of Supply: ${placeOfSupply}`, 14, 75);
  doc.text(`Reverse Charge (Y/N): ${reverseCharge}`, 105, 75);
  
  // Billed To & Shipped To
  doc.line(10, 80, 200, 80);
  doc.text("Details of Receiver (Billed To)", 55, 90, { align: "center" });
  doc.text("Details of Consignee (Shipped To)", 155, 90, { align: "center" });
  doc.line(105, 80, 105, 140);
  
  // Billed To details
  doc.text(`Name: ${billedToName}`, 14, 100);
  doc.text(`GSTIN: ${billedToGstin}`, 14, 110);
  doc.text(`Address: ${billedToAddress}`, 14, 120);
  doc.text(`State: ${billedToState}`, 14, 130);
  doc.text(`State Code: ${billedToStateCode}`, 14, 140);
  
  // Shipped To details
  doc.text(`Name: ${shippedToName}`, 110, 100);
  doc.text(`GSTIN: ${shippedToGstin}`, 110, 110);
  doc.text(`Address: ${shippedToAddress}`, 110, 120);
  doc.text(`State: ${shippedToState}`, 110, 130);
  doc.text(`State Code: ${shippedToStateCode}`, 110, 140);
  
  doc.line(10, 145, 200, 145);
  
  // Calculate totals
  const calculateSubtotal = () => items.reduce((sum, item) => sum + item.amount, 0);
  const calculateTaxAmount = (rate: number) => (calculateSubtotal() * rate) / 100;
  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const sgstAmount = calculateTaxAmount(sgstRate);
    const cgstAmount = calculateTaxAmount(cgstRate);
    const igstAmount = calculateTaxAmount(igstRate);
    return subtotal + sgstAmount + cgstAmount + igstAmount + freightCharges;
  };
  
  // Items table
  autoTable(doc, {
    startY: 150,
    head: [['S.No.', 'Description of Goods', 'HSN Code', 'Quantity', 'Rate', 'Amount (₹)']],
    body: items.map((item, index) => [
      index + 1,
      item.description,
      item.hsnCode,
      item.quantity,
      item.rate.toFixed(2),
      item.amount.toFixed(2)
    ]),
    theme: 'grid',
    headStyles: { fillColor: [128, 0, 128] },
    foot: [
      ['', '', '', '', 'Total Amount Before Tax', calculateSubtotal().toFixed(2)],
      ['', '', '', '', `Add: SGST @ ${sgstRate}%`, calculateTaxAmount(sgstRate).toFixed(2)],
      ['', '', '', '', `Add: CGST @ ${cgstRate}%`, calculateTaxAmount(cgstRate).toFixed(2)],
      ['', '', '', '', `Add: IGST @ ${igstRate}%`, calculateTaxAmount(igstRate).toFixed(2)],
      ['', '', '', '', 'Freight/Packing/Labour', freightCharges.toFixed(2)],
      ['', '', '', '', 'Total Amount After Tax', calculateTotal().toFixed(2)]
    ]
  });
  
  const finalY = (doc as any).lastAutoTable.finalY || 200;
  
  // Amount in words
  doc.text(`Amount in words: ${calculateTotal().toFixed(2)} Rupees Only`, 14, finalY + 10);
  
  // Bank details
  doc.setFontSize(12);
  doc.text("BANK DETAILS", 50, finalY + 25);
  doc.setFontSize(10);
  doc.text(`Bank Name: ${profile.bankName}`, 14, finalY + 35);
  doc.text(`A/c No: ${profile.accountNumber}`, 14, finalY + 45);
  doc.text(`Branch: ${profile.branchName}`, 14, finalY + 55);
  doc.text(`IFSC Code: ${profile.ifscCode}`, 14, finalY + 65);
  
  // Signature
  doc.text("For SHRI HARI ENTERPRISES", 170, finalY + 55, { align: "center" });
  doc.text("Signature", 170, finalY + 65, { align: "center" });
  
  return doc;
};
