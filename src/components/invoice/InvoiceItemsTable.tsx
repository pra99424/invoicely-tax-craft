
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { InvoiceItem } from "@/types/invoice";

interface InvoiceItemsTableProps {
  items: InvoiceItem[];
  onUpdateItem: (id: string, field: keyof InvoiceItem, value: string | number) => void;
  onRemoveItem: (id: string) => void;
  onAddItem: () => void;
}

export const InvoiceItemsTable: React.FC<InvoiceItemsTableProps> = ({
  items,
  onUpdateItem,
  onRemoveItem,
  onAddItem,
}) => {
  return (
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
                  onChange={(e) => onUpdateItem(item.id, 'description', e.target.value)} 
                  placeholder="Product or service description"
                  required
                />
              </TableCell>
              <TableCell>
                <Input 
                  value={item.hsnCode} 
                  onChange={(e) => onUpdateItem(item.id, 'hsnCode', e.target.value)} 
                  placeholder="HSN Code"
                />
              </TableCell>
              <TableCell>
                <Input 
                  type="number" 
                  value={item.quantity} 
                  onChange={(e) => onUpdateItem(item.id, 'quantity', Number(e.target.value))} 
                  min="1"
                  required
                />
              </TableCell>
              <TableCell>
                <Input 
                  type="number" 
                  value={item.rate} 
                  onChange={(e) => onUpdateItem(item.id, 'rate', Number(e.target.value))} 
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
                    onClick={() => onRemoveItem(item.id)}
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
      <div className="mt-4">
        <Button 
          type="button" 
          variant="outline" 
          size="sm"
          onClick={onAddItem}
          className="border-purple-600 text-purple-600 hover:bg-purple-50"
        >
          Add Item
        </Button>
      </div>
    </div>
  );
};
