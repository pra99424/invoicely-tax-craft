
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

// Mock data to simulate fetching profile from storage
const mockProfileData = {
  companyName: "TaxCraft Solutions",
  tagline: "Simple and Professional Tax Services",
  address: "123 Business Lane, Tech Park, Bangalore 560001",
  email: "contact@taxcraftsolutions.com",
  website: "https://www.taxcraftsolutions.com",
  phone: "+91 8012345678",
  mobile: "+91 9876543210",
  gstin: "29ABCDE1234F1Z5",
  panNumber: "ABCDE1234F",
  bankName: "State Bank of India",
  accountNumber: "1234567890123456",
  ifscCode: "SBIN0012345",
  branchName: "Tech Park Branch",
  accountType: "Current",
  upiId: "taxcraft@sbi",
  logoUrl: null,
  signatureUrl: null
};

const ProfileEdit = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [signaturePreview, setSignaturePreview] = useState<string | null>(null);
  
  // Simulate fetching profile data
  useEffect(() => {
    // In a real app, this would fetch from an API or local storage
    setLogoPreview(mockProfileData.logoUrl);
    setSignaturePreview(mockProfileData.signatureUrl);
    
    // Show toast to indicate profile data is loaded
    toast.info("Profile data loaded");
  }, []);
  
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSignatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setSignaturePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate profile update
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Profile updated successfully!");
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-purple-600">Edit Your Profile</h1>
          <p className="text-gray-600">Update your company details for invoice generation</p>
        </div>
        
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Company Information</CardTitle>
            <CardDescription>This information will appear on all your invoices</CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <Tabs defaultValue="company">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="company">Company Details</TabsTrigger>
                  <TabsTrigger value="bank">Bank Details</TabsTrigger>
                  <TabsTrigger value="assets">Logos & Signatures</TabsTrigger>
                </TabsList>
                
                <TabsContent value="company" className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="companyName">Company Name*</Label>
                      <Input 
                        id="companyName" 
                        placeholder="Your Company Name" 
                        required 
                        defaultValue={mockProfileData.companyName}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="tagline">Tagline/Description</Label>
                      <Input 
                        id="tagline" 
                        placeholder="All types of services provided" 
                        defaultValue={mockProfileData.tagline}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="address">Company Address*</Label>
                    <Textarea 
                      id="address" 
                      placeholder="Full company address with pincode" 
                      className="h-24"
                      required
                      defaultValue={mockProfileData.address}
                    />
                  </div>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="email">Email Address*</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="company@example.com" 
                        required 
                        defaultValue={mockProfileData.email}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="website">Website</Label>
                      <Input 
                        id="website" 
                        type="url" 
                        placeholder="https://www.example.com" 
                        defaultValue={mockProfileData.website}
                      />
                    </div>
                  </div>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="phone">Phone Number*</Label>
                      <Input 
                        id="phone" 
                        type="tel" 
                        placeholder="+91 9999999999" 
                        required
                        defaultValue={mockProfileData.phone}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="mobile">Mobile Number</Label>
                      <Input 
                        id="mobile" 
                        type="tel" 
                        placeholder="+91 9999999999"
                        defaultValue={mockProfileData.mobile}
                      />
                    </div>
                  </div>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="gstin">GSTIN*</Label>
                      <Input 
                        id="gstin" 
                        placeholder="22AAAAA0000A1Z5" 
                        required
                        defaultValue={mockProfileData.gstin}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="panNumber">PAN Number*</Label>
                      <Input 
                        id="panNumber" 
                        placeholder="AAAAA0000A" 
                        required
                        defaultValue={mockProfileData.panNumber}
                      />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="bank" className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="bankName">Bank Name*</Label>
                      <Input 
                        id="bankName" 
                        placeholder="Your Bank Name" 
                        required
                        defaultValue={mockProfileData.bankName}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="accountNumber">Account Number*</Label>
                      <Input 
                        id="accountNumber" 
                        placeholder="Your Account Number" 
                        required
                        defaultValue={mockProfileData.accountNumber}
                      />
                    </div>
                  </div>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="ifscCode">IFSC Code*</Label>
                      <Input 
                        id="ifscCode" 
                        placeholder="BANK0123456" 
                        required
                        defaultValue={mockProfileData.ifscCode}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="branchName">Branch Name*</Label>
                      <Input 
                        id="branchName" 
                        placeholder="Branch Location" 
                        required
                        defaultValue={mockProfileData.branchName}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="accountType">Account Type*</Label>
                    <Input 
                      id="accountType" 
                      placeholder="Current/Savings" 
                      required
                      defaultValue={mockProfileData.accountType}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="upiId">UPI ID</Label>
                    <Input 
                      id="upiId" 
                      placeholder="yourname@bank"
                      defaultValue={mockProfileData.upiId}
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="assets" className="space-y-6">
                  <div>
                    <Label htmlFor="logo" className="block mb-2">Company Logo</Label>
                    <div className="flex items-start gap-4">
                      <div className="w-32 h-32 border rounded-md flex items-center justify-center overflow-hidden bg-white">
                        {logoPreview ? (
                          <img src={logoPreview} alt="Company Logo Preview" className="w-full h-full object-contain" />
                        ) : (
                          <p className="text-sm text-gray-400">No logo uploaded</p>
                        )}
                      </div>
                      <div>
                        <Input 
                          id="logo" 
                          type="file" 
                          accept="image/*" 
                          className="max-w-sm"
                          onChange={handleLogoChange}
                        />
                        <p className="text-xs text-gray-500 mt-1">Recommended: 300x300px, Max 1MB, PNG or JPG</p>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <Label htmlFor="signature" className="block mb-2">Digital Signature</Label>
                    <div className="flex items-start gap-4">
                      <div className="w-32 h-24 border rounded-md flex items-center justify-center overflow-hidden bg-white">
                        {signaturePreview ? (
                          <img src={signaturePreview} alt="Signature Preview" className="w-full h-full object-contain" />
                        ) : (
                          <p className="text-sm text-gray-400">No signature uploaded</p>
                        )}
                      </div>
                      <div>
                        <Input 
                          id="signature" 
                          type="file" 
                          accept="image/*" 
                          className="max-w-sm"
                          onChange={handleSignatureChange}
                        />
                        <p className="text-xs text-gray-500 mt-1">Recommended: 300x100px, Max 500KB, PNG or JPG with transparent background</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            
            <CardFooter className="flex justify-between">
              <Button variant="outline" type="button" onClick={() => navigate("/dashboard")}>Cancel</Button>
              <Button type="submit" className="bg-purple-600 hover:bg-purple-700" disabled={isLoading}>
                {isLoading ? "Saving..." : "Update Profile"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ProfileEdit;
