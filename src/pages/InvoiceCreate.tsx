import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { jsPDF } from "jspdf";
import { FilePdf, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import autoTable from 'jspdf-autotable';

// This is a mock profile data that would normally come from a database
const mockProfile = {
  companyName: "Shri Hari Enterprises",
  tagline: "All type of printing works & office stationery item supply.",
  address: "Q-356, Top Floor, Rani Nagar, Rani Bagh, Delhi-110034",
  email: "gulvinder_anand@yahoo.com",
  phone: "011-47001608",
  mobile: "9811274499",
  gstin: "07AFFPA0514Q1ZD",
  bankName: "Punjab National Bank",
  accountNumber: "10720921000414662",
  branchName: "Rani Bagh",
  ifscCode: "PUNB0987200",
  logoUrl: "/public/lovable-uploads/094e9266-2fed-439c-8daf-2c0d5a1ed8ac.png", // This would be the actual logo path
  signatureUrl: "" // This would be the signature path
};

interface InvoiceItem {
  id: string;
  description: string;
  hsnCode: string;
  quantity: number;
  rate: number;
  amount: number;
}

const InvoiceCreate = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [invoiceNumber, setInvoiceNumber] = useState<string>("INV-001");
  const [invoiceDate, setInvoiceDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [bookNumber, setBookNumber] = useState<string>("");
  const [vehicleNumber, setVehicleNumber] = useState<string>("");
  const [transportMode, setTransportMode] = useState<string>("");
  const [placeOfSupply, setPlaceOfSupply] = useState<string>("Delhi");
  const [reverseCharge, setReverseCharge] = useState<string>("No");
  
  // Billed To details
  const [billedToName, setBilledToName] = useState<string>("");
  const [billedToGstin, setBilledToGstin] = useState<string>("");
  const [billedToAddress, setBilledToAddress] = useState<string>("");
  const [billedToState, setBilledToState] = useState<string>("");
  const [billedToStateCode, setBilledToStateCode] = useState<string>("");
  
  // Shipped To details
  const [shippedToName, setShippedToName] = useState<string>("");
  const [shippedToGstin, setShippedToGstin] = useState<string>("");
  const [shippedToAddress, setShippedToAddress] = useState<string>("");
  const [shippedToState, setShippedToState] = useState<string>("");
  const [shippedToStateCode, setShippedToStateCode] = useState<string>("");
  
  // Items in invoice
  const [items, setItems] = useState<InvoiceItem[]>([
    {
      id: "1",
      description: "",
      hsnCode: "",
      quantity: 1,
      rate: 0,
      amount: 0
    }
  ]);
  
  // Tax rates
  const [sgstRate, setSgstRate] = useState<number>(9);
  const [cgstRate, setCgstRate] = useState<number>(9);
  const [igstRate, setIgstRate] = useState<number>(0);
  const [freightCharges, setFreightCharges] = useState<number>(0);
  
  const addItem = () => {
    const newItem: InvoiceItem = {
      id: (items.length + 1).toString(),
      description: "",
      hsnCode: "",
      quantity: 1,
      rate: 0,
      amount: 0
    };
    setItems([...items, newItem]);
  };
  
  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };
  
  const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
    const updatedItems = items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        
        // Recalculate amount if quantity or rate changes
        if (field === 'quantity' || field === 'rate') {
          updatedItem.amount = updatedItem.quantity * updatedItem.rate;
        }
        
        return updatedItem;
      }
      return item;
    });
    
    setItems(updatedItems);
  };
  
  const calculateSubtotal = (): number => {
    return items.reduce((sum, item) => sum + item.amount, 0);
  };
  
  const calculateTaxAmount = (rate: number): number => {
    return (calculateSubtotal() * rate) / 100;
  };
  
  const calculateTotal = (): number => {
    const subtotal = calculateSubtotal();
    const sgstAmount = calculateTaxAmount(sgstRate);
    const cgstAmount = calculateTaxAmount(cgstRate);
    const igstAmount = calculateTaxAmount(igstRate);
    
    return subtotal + sgstAmount + cgstAmount + igstAmount + freightCharges;
  };
  
  // Copy billed to details to shipped to
  const copyBilledToShipped = () => {
    setShippedToName(billedToName);
    setShippedToGstin(billedToGstin);
    setShippedToAddress(billedToAddress);
    setShippedToState(billedToState);
    setShippedToStateCode(billedToStateCode);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally save the invoice to the database
    generatePDF();
    toast({
      title: "Invoice saved and downloaded",
      description: `Invoice ${invoiceNumber} has been processed successfully.`,
    });
    navigate("/dashboard");
  };
  
  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Company header
    doc.setFontSize(20);
    doc.text("TAX INVOICE", 105, 15, { align: "center" });
    
    doc.setFontSize(10);
    doc.text(`GSTIN: ${mockProfile.gstin}`, 14, 10);
    doc.text(`Ph: ${mockProfile.phone}`, 180, 10, { align: "right" });
    doc.text(`Mobile: ${mockProfile.mobile}`, 180, 15, { align: "right" });
    
    doc.setFontSize(16);
    doc.setTextColor(128, 0, 128); // Purple color
    doc.text(mockProfile.companyName, 105, 25, { align: "center" });
    
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0); // Black color
    doc.text(mockProfile.tagline, 105, 30, { align: "center" });
    doc.text(mockProfile.address, 105, 35, { align: "center" });
    doc.text(`E-mail: ${mockProfile.email}`, 105, 40, { align: "center" });
    
    // Invoice details
    doc.line(10, 45, 200, 45);
    
    doc.text(`Invoice No: ${invoiceNumber}`, 14, 55);
    doc.text(`Book No: ${bookNumber}`, 105, 55);
    doc.text(`Vehicle No: ${vehicleNumber}`, 170, 55);
    
    doc.text(`Date of Invoice: ${invoiceDate}`, 14, 65);
    doc.text(`Mode of Transport: ${transportMode}`, 105, 65);
    
    doc.text(`Place of Supply: ${placeOfSupply}`, 14, 75);
    doc.text(`Reverse Charge (Y/N): ${reverseCharge}`, 105, 75);
    
    doc.line(10, 80, 200, 80);
    
    // Billed To & Shipped To
    doc.text("Details of Receiver (Billed To)", 55, 90, { align: "center" });
    doc.text("Details of Consignee (Shipped To)", 155, 90, { align: "center" });
    
    doc.line(105, 80, 105, 140);
    
    doc.text(`Name: ${billedToName}`, 14, 100);
    doc.text(`Name: ${shippedToName}`, 110, 100);
    
    doc.text(`GSTIN: ${billedToGstin}`, 14, 110);
    doc.text(`GSTIN: ${shippedToGstin}`, 110, 110);
    
    doc.text(`Address: ${billedToAddress}`, 14, 120);
    doc.text(`Address: ${shippedToAddress}`, 110, 120);
    
    doc.text(`State: ${billedToState}`, 14, 130);
    doc.text(`State: ${shippedToState}`, 110, 130);
    
    doc.text(`State Code: ${billedToStateCode}`, 14, 140);
    doc.text(`State Code: ${shippedToStateCode}`, 110, 140);
    
    doc.line(10, 145, 200, 145);
    
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
    function numberToWords(num: number): string {
      // This is a simplified version, in a real app you'd use a library
      return `${num.toFixed(2)} Rupees Only`;
    }
    
    doc.text(`Amount in words: ${numberToWords(calculateTotal())}`, 14, finalY + 10);
    
    // Bank details
    doc.setFontSize(12);
    doc.text("BANK DETAILS", 50, finalY + 25);
    doc.setFontSize(10);
    doc.text(`Bank Name: ${mockProfile.bankName}`, 14, finalY + 35);
    doc.text(`A/c No: ${mockProfile.accountNumber}`, 14, finalY + 45);
    doc.text(`Branch: ${mockProfile.branchName}`, 14, finalY + 55);
    doc.text(`IFSC Code: ${mockProfile.ifscCode}`, 14, finalY + 65);
    
    // Signature
    doc.text("For SHRI HARI ENTERPRISES", 170, finalY + 55, { align: "center" });
    doc.text("Signature", 170, finalY + 65, { align: "center" });
    
    doc.save(`Invoice-${invoiceNumber}.pdf`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="bg-purple-600 py-4 px-6 text-white">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Create Invoice</h1>
          
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              className="text-white hover:bg-purple-700"
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </Button>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto p-6">
        <form onSubmit={handleSubmit}>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Invoice Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <Label htmlFor="invoiceNumber">Invoice Number*</Label>
                  <Input 
                    id="invoiceNumber" 
                    value={invoiceNumber} 
                    onChange={(e) => setInvoiceNumber(e.target.value)} 
                    required 
                  />
                </div>
                
                <div>
                  <Label htmlFor="invoiceDate">Invoice Date*</Label>
                  <Input 
                    id="invoiceDate" 
                    type="date" 
                    value={invoiceDate} 
                    onChange={(e) => setInvoiceDate(e.target.value)} 
                    required 
                  />
                </div>
                
                <div>
                  <Label htmlFor="bookNumber">Book Number</Label>
                  <Input 
                    id="bookNumber" 
                    value={bookNumber} 
                    onChange={(e) => setBookNumber(e.target.value)} 
                  />
                </div>
                
                <div>
                  <Label htmlFor="vehicleNumber">Vehicle Number</Label>
                  <Input 
                    id="vehicleNumber" 
                    value={vehicleNumber} 
                    onChange={(e) => setVehicleNumber(e.target.value)} 
                  />
                </div>
                
                <div>
                  <Label htmlFor="transportMode">Mode of Transport</Label>
                  <Input 
                    id="transportMode" 
                    value={transportMode} 
                    onChange={(e) => setTransportMode(e.target.value)} 
                  />
                </div>
                
                <div>
                  <Label htmlFor="placeOfSupply">Place of Supply*</Label>
                  <Input 
                    id="placeOfSupply" 
                    value={placeOfSupply} 
                    onChange={(e) => setPlaceOfSupply(e.target.value)} 
                    required 
                  />
                </div>
                
                <div>
                  <Label htmlFor="reverseCharge">Reverse Charge</Label>
                  <Select value={reverseCharge} onValueChange={setReverseCharge}>
                    <SelectTrigger id="reverseCharge">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Yes">Yes</SelectItem>
                      <SelectItem value="No">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid gap-6 lg:grid-cols-2 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Details of Receiver (Billed To)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="billedToName">Name*</Label>
                  <Input 
                    id="billedToName" 
                    value={billedToName} 
                    onChange={(e) => setBilledToName(e.target.value)} 
                    required 
                  />
                </div>
                
                <div>
                  <Label htmlFor="billedToGstin">GSTIN</Label>
                  <Input 
                    id="billedToGstin" 
                    value={billedToGstin} 
                    onChange={(e) => setBilledToGstin(e.target.value)} 
                  />
                </div>
                
                <div>
                  <Label htmlFor="billedToAddress">Address*</Label>
                  <Input 
                    id="billedToAddress" 
                    value={billedToAddress} 
                    onChange={(e) => setBilledToAddress(e.target.value)} 
                    required 
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="billedToState">State*</Label>
                    <Input 
                      id="billedToState" 
                      value={billedToState} 
                      onChange={(e) => setBilledToState(e.target.value)} 
                      required 
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="billedToStateCode">State Code*</Label>
                    <Input 
                      id="billedToStateCode" 
                      value={billedToStateCode} 
                      onChange={(e) => setBilledToStateCode(e.target.value)} 
                      required 
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Details of Consignee (Shipped To)</CardTitle>
                <Button 
                  type="button" 
                  variant="secondary" 
                  size="sm" 
                  className="bg-purple-100 hover:bg-purple-200"
                  onClick={copyBilledToShipped}
                >
                  Copy from Billed To
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="shippedToName">Name*</Label>
                  <Input 
                    id="shippedToName" 
                    value={shippedToName} 
                    onChange={(e) => setShippedToName(e.target.value)} 
                    required 
                  />
                </div>
                
                <div>
                  <Label htmlFor="shippedToGstin">GSTIN</Label>
                  <Input 
                    id="shippedToGstin" 
                    value={shippedToGstin} 
                    onChange={(e) => setShippedToGstin(e.target.value)} 
                  />
                </div>
                
                <div>
                  <Label htmlFor="shippedToAddress">Address*</Label>
                  <Input 
                    id="shippedToAddress" 
                    value={shippedToAddress} 
                    onChange={(e) => setShippedToAddress(e.target.value)} 
                    required 
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="shippedToState">State*</Label>
                    <Input 
                      id="shippedToState" 
                      value={shippedToState} 
                      onChange={(e) => setShippedToState(e.target.value)} 
                      required 
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="shippedToStateCode">State Code*</Label>
                    <Input 
                      id="shippedToStateCode" 
                      value={shippedToStateCode} 
                      onChange={(e) => setShippedToStateCode(e.target.value)} 
                      required 
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mb-6">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Products/Services</CardTitle>
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={addItem}
                className="border-purple-600 text-purple-600 hover:bg-purple-50"
              >
                Add Item
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>S.No.</TableHead>
                      <TableHead className="w-1/3">Description of Goods/Services</TableHead>
                      <TableHead>HSN Code</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Rate (₹)</TableHead>
                      <TableHead>Amount (₹)</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items.map((item, index) => (
                      <TableRow key={item.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          <Input 
                            value={item.description} 
                            onChange={(e) => updateItem(item.id, 'description', e.target.value)} 
                            placeholder="Product or service description"
                            required
                          />
                        </TableCell>
                        <TableCell>
                          <Input 
                            value={item.hsnCode} 
                            onChange={(e) => updateItem(item.id, 'hsnCode', e.target.value)} 
                            placeholder="HSN Code"
                          />
                        </TableCell>
                        <TableCell>
                          <Input 
                            type="number" 
                            value={item.quantity} 
                            onChange={(e) => updateItem(item.id, 'quantity', Number(e.target.value))} 
                            min="1"
                            required
                          />
                        </TableCell>
                        <TableCell>
                          <Input 
                            type="number" 
                            value={item.rate} 
                            onChange={(e) => updateItem(item.id, 'rate', Number(e.target.value))} 
                            min="0"
                            step="0.01"
                            required
                          />
                        </TableCell>
                        <TableCell>{item.amount.toFixed(2)}</TableCell>
                        <TableCell>
                          {items.length > 1 && (
                            <Button 
                              type="button" 
                              variant="ghost" 
                              size="sm"
                              className="text-red-600 hover:text-red-800 hover:bg-red-50"
                              onClick={() => removeItem(item.id)}
                            >
                              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Tax Calculations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium">Total Amount Before Tax:</span>
                  <span className="text-xl">₹{calculateSubtotal().toFixed(2)}</span>
                </div>
                
                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <Label htmlFor="sgstRate">SGST Rate (%)</Label>
                    <div className="flex items-center gap-2">
                      <Input 
                        id="sgstRate" 
                        type="number" 
                        value={sgstRate} 
                        onChange={(e) => setSgstRate(Number(e.target.value))} 
                        min="0"
                        step="0.01"
                      />
                      <span className="whitespace-nowrap">₹{calculateTaxAmount(sgstRate).toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="cgstRate">CGST Rate (%)</Label>
                    <div className="flex items-center gap-2">
                      <Input 
                        id="cgstRate" 
                        type="number" 
                        value={cgstRate} 
                        onChange={(e) => setCgstRate(Number(e.target.value))} 
                        min="0"
                        step="0.01"
                      />
                      <span className="whitespace-nowrap">₹{calculateTaxAmount(cgstRate).toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="igstRate">IGST Rate (%)</Label>
                    <div className="flex items-center gap-2">
                      <Input 
                        id="igstRate" 
                        type="number" 
                        value={igstRate} 
                        onChange={(e) => setIgstRate(Number(e.target.value))} 
                        min="0"
                        step="0.01"
                      />
                      <span className="whitespace-nowrap">₹{calculateTaxAmount(igstRate).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <Label htmlFor="freightCharges">Freight/Packing/Labour Charges</Label>
                  <Input 
                    id="freightCharges" 
                    type="number" 
                    value={freightCharges} 
                    onChange={(e) => setFreightCharges(Number(e.target.value))} 
                    min="0"
                    step="0.01"
                  />
                </div>
                
                <Separator />
                
                <div className="flex justify-between items-center py-2">
                  <span className="font-medium text-lg">Total Amount After Tax:</span>
                  <span className="text-2xl font-bold text-purple-700">₹{calculateTotal().toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-between">
            <Button 
              type="button" 
              variant="outline"
              onClick={() => navigate("/dashboard")}
            >
              Cancel
            </Button>
            
            <div className="space-x-4">
              <Button 
                type="button" 
                variant="outline" 
                className="border-purple-600 text-purple-600 flex items-center gap-2" 
                onClick={generatePDF}
              >
                <FilePdf className="h-4 w-4" />
                Preview PDF
              </Button>
              
              <Button 
                type="submit" 
                className="bg-purple-600 hover:bg-purple-700 flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                Save & Download Invoice
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InvoiceCreate;
