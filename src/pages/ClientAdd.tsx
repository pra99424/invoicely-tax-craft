
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const ClientAdd = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    gstin: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save the client to a database
    toast({
      title: "Client Added",
      description: `${formData.name} has been added to your clients.`,
    });
    navigate("/clients");
  };

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
              onClick={() => navigate("/clients")}
            >
              All Clients
            </Button>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <h2 className="text-3xl font-bold">Add New Client</h2>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Client Information</CardTitle>
            <CardDescription>Enter the details of your client</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Contact Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="company">Company Name</Label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="ABC Corporation"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="johndoe@example.com"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="gstin">GSTIN</Label>
                  <Input
                    id="gstin"
                    name="gstin"
                    value={formData.gstin}
                    onChange={handleChange}
                    placeholder="22AAAAA0000A1Z5"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="123 Main Street"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Mumbai"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="Maharashtra"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    placeholder="400001"
                    required
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-4 pt-4">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => navigate("/clients")}
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                  Add Client
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClientAdd;
