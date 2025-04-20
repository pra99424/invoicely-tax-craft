
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Dashboard = () => {
  const navigate = useNavigate();
  const [invoiceCount, setInvoiceCount] = useState<number>(0);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-purple-600 py-4 px-6 text-white">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">TaxCraft</h1>
          
          <div className="flex items-center gap-4">
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
              onClick={() => {
                // In a real app, this would log out the user
                navigate("/login");
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome to Your Dashboard</h2>
          <p className="text-gray-600">Manage your invoices and business information</p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Total Invoices</CardTitle>
              <CardDescription>All time</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{invoiceCount}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">This Month</CardTitle>
              <CardDescription>April 2025</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">0</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Total Amount</CardTitle>
              <CardDescription>All invoices</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">₹0.00</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold">Quick Actions</h3>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
          <Button 
            className="h-32 bg-purple-600 hover:bg-purple-700 text-lg flex flex-col gap-2"
            onClick={() => navigate("/invoice/new")}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create New Invoice
          </Button>
          
          <Button 
            variant="outline" 
            className="h-32 text-lg flex flex-col gap-2"
            onClick={() => navigate("/invoices")}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            View All Invoices
          </Button>
          
          <Button 
            variant="outline" 
            className="h-32 text-lg flex flex-col gap-2"
            onClick={() => navigate("/profile/edit")}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Edit Company Profile
          </Button>
          
          <Button 
            variant="outline" 
            className="h-32 text-lg flex flex-col gap-2"
            onClick={() => navigate("/clients")}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            Manage Clients
          </Button>
        </div>
        
        <div className="mb-6">
          <h3 className="text-2xl font-bold mb-4">Recent Activity</h3>
          
          <Tabs defaultValue="invoices">
            <TabsList className="mb-4">
              <TabsTrigger value="invoices">Recent Invoices</TabsTrigger>
              <TabsTrigger value="clients">Recent Clients</TabsTrigger>
            </TabsList>
            
            <TabsContent value="invoices">
              <div className="bg-white rounded-lg shadow p-6">
                {invoiceCount > 0 ? (
                  <div>Invoice list would appear here</div>
                ) : (
                  <div className="text-center py-12">
                    <p className="mb-4 text-gray-500">No invoices created yet</p>
                    <Button onClick={() => navigate("/invoice/new")} className="bg-purple-600 hover:bg-purple-700">
                      Create Your First Invoice
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="clients">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-center py-12">
                  <p className="mb-4 text-gray-500">No clients added yet</p>
                  <Button onClick={() => navigate("/clients/add")} className="bg-purple-600 hover:bg-purple-700">
                    Add Your First Client
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
