
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const Clients = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [clients, setClients] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // In a real app, this would fetch clients from an API/database
  const filteredClients = clients.filter(client => 
    client?.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    client?.company?.toLowerCase().includes(searchQuery.toLowerCase())
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
          <h2 className="text-3xl font-bold">Manage Clients</h2>
          <Button 
            onClick={() => navigate("/clients/add")} 
            className="bg-purple-600 hover:bg-purple-700"
          >
            Add New Client
          </Button>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Client List</CardTitle>
            <CardDescription>Manage all your client information here</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Input
                placeholder="Search clients..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-sm"
              />
            </div>
            
            {clients.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client Name</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClients.map((client, index) => (
                    <TableRow key={index}>
                      <TableCell>{client.name}</TableCell>
                      <TableCell>{client.company}</TableCell>
                      <TableCell>{client.email}</TableCell>
                      <TableCell>{client.phone}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => navigate(`/clients/edit/${client.id}`)}
                          >
                            Edit
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-red-600 hover:bg-red-50"
                            onClick={() => {
                              // In a real app, this would delete the client
                              toast({
                                title: "Client deleted",
                                description: `${client.name} has been removed from your clients list.`,
                              });
                            }}
                          >
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-12">
                <p className="mb-4 text-gray-500">No clients added yet</p>
                <Button onClick={() => navigate("/clients/add")} className="bg-purple-600 hover:bg-purple-700">
                  Add Your First Client
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Clients;
