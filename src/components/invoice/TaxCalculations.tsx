
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface TaxCalculationsProps {
  subtotal: number;
  sgstRate: number;
  cgstRate: number;
  igstRate: number;
  freightCharges: number;
  total: number;
  onSgstRateChange: (value: number) => void;
  onCgstRateChange: (value: number) => void;
  onIgstRateChange: (value: number) => void;
  onFreightChargesChange: (value: number) => void;
}

export const TaxCalculations: React.FC<TaxCalculationsProps> = ({
  subtotal,
  sgstRate,
  cgstRate,
  igstRate,
  freightCharges,
  total,
  onSgstRateChange,
  onCgstRateChange,
  onIgstRateChange,
  onFreightChargesChange,
}) => {
  const calculateTaxAmount = (rate: number): number => {
    return (subtotal * rate) / 100;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center py-2 border-b">
        <span className="font-medium">Total Amount Before Tax:</span>
        <span className="text-xl">₹{subtotal.toFixed(2)}</span>
      </div>
      
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <Label htmlFor="sgstRate">SGST Rate (%)</Label>
          <div className="flex items-center gap-2">
            <Input 
              id="sgstRate" 
              type="number" 
              value={sgstRate} 
              onChange={(e) => onSgstRateChange(Number(e.target.value))} 
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
              onChange={(e) => onCgstRateChange(Number(e.target.value))} 
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
              onChange={(e) => onIgstRateChange(Number(e.target.value))} 
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
          onChange={(e) => onFreightChargesChange(Number(e.target.value))} 
          min="0"
          step="0.01"
        />
      </div>
      
      <Separator />
      
      <div className="flex justify-between items-center py-2">
        <span className="font-medium text-lg">Total Amount After Tax:</span>
        <span className="text-2xl font-bold text-purple-700">₹{total.toFixed(2)}</span>
      </div>
    </div>
  );
};
