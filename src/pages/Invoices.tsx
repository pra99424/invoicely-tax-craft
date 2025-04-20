
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const Invoices = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [invoices, setInvoices] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // In a real app, this would fetch invoices from an API/database
  const filteredInvoices = invoices.filter(invoice => 
    invoice?.invoiceNumber?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    invoice?.clientName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-purple-600 py-4 px-6 text-white">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">TaxCraft</h1>
          
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              className="text-white hover:bg-purple-700"
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </Button>
            
            <Button 
              variant="ghost" 
              className="text-white hover:bg-purple-700"
              onClick={() => navigate("/profile/edit")}
            >
              Company Profile
            </Button>
            
            <Button 
              variant="ghost" 
              className="text-white hover:bg-purple-700"
              onClick={() => navigate("/login")}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">All Invoices</h2>
          <Button 
            onClick={() => navigate("/invoice/new")} 
            className="bg-purple-600 hover:bg-purple-700"
          >
            Create New Invoice
          </Button>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Invoice List</CardTitle>
            <CardDescription>Manage and view all your invoices</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Input
                placeholder="Search invoices..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-sm"
              />
            </div>
            
            {invoices.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice #</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvoices.map((invoice, index) => (
                    <TableRow key={index}>
                      <TableCell>{invoice.invoiceNumber}</TableCell>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell>{invoice.clientName}</TableCell>
                      <TableCell>₹{invoice.totalAmount.toFixed(2)}</TableCell>
                      <TableCell>
                        <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                          invoice.status === 'paid' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {invoice.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => {
                              // In a real app, this would download the invoice
                              toast({
                                title: "Invoice downloaded",
                                description: `Invoice #${invoice.invoiceNumber} has been downloaded.`,
                              });
                            }}
                          >
                            Download
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => navigate(`/invoice/view/${invoice.id}`)}
                          >
                            View
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-12">
                <p className="mb-4 text-gray-500">No invoices created yet</p>
                <Button onClick={() => navigate("/invoice/new")} className="bg-purple-600 hover:bg-purple-700">
                  Create Your First Invoice
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Invoices;
