"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  getStoredProducts, 
  getStoredOrders, 
  getStoredInquiries, 
  saveProduct, 
  deleteProduct, 
  updateOrderStatus,
  Product, 
  Order, 
  Inquiry 
} from "@/lib/db";

// Preloaded premium media items
// Static MEDIA_LIBRARY array replaced by dynamic localstorage-backed mediaItems state.

export default function AdminPortal() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [loginError, setLoginError] = useState(false);

  // Tab State
  const [activeTab, setActiveTab] = useState<"dashboard" | "products" | "orders" | "inquiries" | "media" | "settings">("dashboard");
  
  // Data States
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  // Search & Filters
  const [productSearch, setProductSearch] = useState("");
  const [productCategoryFilter, setProductCategoryFilter] = useState("All");
  const [orderFilter, setOrderFilter] = useState("All");

  // Editing Product State
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Create Form States
  const [newId, setNewId] = useState("");
  const [newName, setNewName] = useState("");
  const [newBrand, setNewBrand] = useState("");
  const [newCategory, setNewCategory] = useState("Built-in Hob");
  const [newRetailPrice, setNewRetailPrice] = useState<number | "">("");
  const [newEstimatedCost, setNewEstimatedCost] = useState<number | "">("");
  const [newDescription, setNewDescription] = useState("");
  const [newImage, setNewImage] = useState("");
  const [newSupplierName, setNewSupplierName] = useState("");
  const [newSpecs, setNewSpecs] = useState<{ key: string; value: string }[]>([
    { key: "Dimensions", value: "" },
    { key: "Safety Certification", value: "ESMA Safety Approved" },
    { key: "Material", value: "" }
  ]);

  // Edit Form States
  const [editName, setEditName] = useState("");
  const [editBrand, setEditBrand] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editRetailPrice, setEditRetailPrice] = useState<number | "">("");
  const [editEstimatedCost, setEditEstimatedCost] = useState<number | "">("");
  const [editDescription, setEditDescription] = useState("");
  const [editImage, setEditImage] = useState("");
  const [editSupplierName, setEditSupplierName] = useState("");
  const [editSpecs, setEditSpecs] = useState<{ key: string; value: string }[]>([]);

  // Media State
  const [mediaItems, setMediaItems] = useState<{ name: string; url: string }[]>([]);
  const [newMediaName, setNewMediaName] = useState("");
  const [newMediaUrl, setNewMediaUrl] = useState("");

  // Initialize and Sync Data
  const refreshData = () => {
    setProducts(getStoredProducts());
    setOrders(getStoredOrders());
    setInquiries(getStoredInquiries());
  };

  useEffect(() => {
    refreshData();
    // Check if previously logged in this session
    const authStatus = sessionStorage.getItem("nova_admin_authed");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }

    // Load dynamic media
    const storedMedia = localStorage.getItem("nova_media");
    if (storedMedia) {
      setMediaItems(JSON.parse(storedMedia));
    } else {
      const defaultMedia = [
        { name: "Bosch Built-in Hob", url: "/bosch_pcr9a5b90m.png" },
        { name: "Smeg Range Cooker", url: "/smeg_ssa91max2.png" },
        { name: "Bertazzoni Master Cooker", url: "/bertazzoni_heritage.png" },
        { name: "Elica Ceiling Hood", url: "/elica_cloud_seven.png" },
        { name: "Bosch Built-in Oven", url: "/bosch_oven.png" },
        { name: "Commercial 6-Burner Stove", url: "/commercial_stove.png" },
        { name: "Kitchen Hero Background", url: "/premium_kitchen_hero.png" }
      ];
      localStorage.setItem("nova_media", JSON.stringify(defaultMedia));
      setMediaItems(defaultMedia);
    }
  }, []);

  const handleAddMediaUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMediaName || !newMediaUrl) {
      alert("Please fill in both the asset name and URL.");
      return;
    }
    const updated = [...mediaItems, { name: newMediaName, url: newMediaUrl }];
    localStorage.setItem("nova_media", JSON.stringify(updated));
    setMediaItems(updated);
    setNewMediaName("");
    setNewMediaUrl("");
    alert("Media asset added successfully!");
  };

  const handleDeleteMedia = (urlToDelete: string) => {
    if (confirm("Are you sure you want to delete this media asset?")) {
      const updated = mediaItems.filter((item) => item.url !== urlToDelete);
      localStorage.setItem("nova_media", JSON.stringify(updated));
      setMediaItems(updated);
    }
  };

  const handleMediaFileUpload = (e: React.ChangeEvent<HTMLInputElement>, targetMode?: "create" | "edit" | "general") => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Url = reader.result as string;
      const assetName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
      
      // Update media items library
      const updated = [...mediaItems, { name: assetName, url: base64Url }];
      localStorage.setItem("nova_media", JSON.stringify(updated));
      setMediaItems(updated);

      if (targetMode === "create") {
        setNewImage(base64Url);
      } else if (targetMode === "edit") {
        setEditImage(base64Url);
      }
      
      alert(`Successfully uploaded "${file.name}" to Media Library!`);
    };
    reader.readAsDataURL(file);
  };

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate email presence, secure password, and a 6-digit OTP
    if (email.includes("@") && (password === "nova2026" || password === "admin") && otp.length === 6) {
      setIsAuthenticated(true);
      setLoginError(false);
      sessionStorage.setItem("nova_admin_authed", "true");
    } else {
      setLoginError(true);
    }
  };

  // Handle Logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setEmail("");
    setPassword("");
    setOtp("");
    sessionStorage.removeItem("nova_admin_authed");
  };

  // Calculations
  const totalRetailSales = orders.reduce((sum, o) => sum + o.totalPrice, 0);
  const totalCostBasis = orders.reduce((sum, o) => sum + o.totalCost, 0);
  const totalProfits = totalRetailSales - totalCostBasis;
  const pendingSourcingCount = orders.filter((o) => o.status === "Pending Sourcing").length;

  // Add Product
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newId || !newName || !newBrand) {
      alert("Please fill in the ID, Brand, and Model Name.");
      return;
    }

    const specsObj: Record<string, string> = {};
    newSpecs.forEach((spec) => {
      if (spec.key.trim() && spec.value.trim()) {
        specsObj[spec.key.trim()] = spec.value.trim();
      }
    });

    saveProduct({
      id: newId.toLowerCase().trim().replace(/\s+/g, "-"),
      name: newName,
      brand: newBrand,
      category: newCategory,
      retailPrice: Number(newRetailPrice) || 0,
      estimatedCost: Number(newEstimatedCost) || 0,
      description: newDescription || "Premium sourced cooking appliance.",
      image: newImage || "/bosch_pcr9a5b90m.png",
      supplierName: newSupplierName || "Deira Kitchen Distributors",
      specs: specsObj
    });

    alert("Product added successfully!");
    
    // Clear Create states
    setNewId("");
    setNewName("");
    setNewBrand("");
    setNewRetailPrice("");
    setNewEstimatedCost("");
    setNewDescription("");
    setNewImage("");
    setNewSupplierName("");
    setNewSpecs([
      { key: "Dimensions", value: "" },
      { key: "Safety Certification", value: "ESMA Safety Approved" },
      { key: "Material", value: "" }
    ]);
    
    refreshData();
  };

  // Trigger Edit mode
  const startEditProduct = (product: Product) => {
    setEditingProduct(product);
    setEditName(product.name);
    setEditBrand(product.brand);
    setEditCategory(product.category);
    setEditRetailPrice(product.retailPrice);
    setEditEstimatedCost(product.estimatedCost);
    setEditDescription(product.description);
    setEditImage(product.image);
    setEditSupplierName(product.supplierName);
    
    const specsList = Object.entries(product.specs || {}).map(([key, value]) => ({
      key,
      value
    }));
    setEditSpecs(specsList.length > 0 ? specsList : [{ key: "", value: "" }]);
  };

  // Save Edit Changes
  const handleSaveEditProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    const specsObj: Record<string, string> = {};
    editSpecs.forEach((spec) => {
      if (spec.key.trim() && spec.value.trim()) {
        specsObj[spec.key.trim()] = spec.value.trim();
      }
    });

    saveProduct({
      id: editingProduct.id,
      name: editName,
      brand: editBrand,
      category: editCategory,
      retailPrice: Number(editRetailPrice) || 0,
      estimatedCost: Number(editEstimatedCost) || 0,
      description: editDescription,
      image: editImage,
      supplierName: editSupplierName,
      specs: specsObj
    });

    alert("Product updated successfully!");
    setEditingProduct(null);
    refreshData();
  };

  // Delete Product
  const handleDeleteProduct = (id: string) => {
    if (confirm(`Are you sure you want to delete product "${id}" from the catalog?`)) {
      deleteProduct(id);
      refreshData();
    }
  };

  // Change Order Status
  const handleStatusChange = (orderId: string, status: Order["status"]) => {
    updateOrderStatus(orderId, status);
    refreshData();
  };

  // Resolve Inquiry
  const handleDeleteInquiry = (inqId: string) => {
    if (confirm("Mark this inquiry as resolved and delete it from dashboard?")) {
      const stored = getStoredInquiries();
      const filtered = stored.filter((i) => i.id !== inqId);
      localStorage.setItem("nova_inquiries", JSON.stringify(filtered));
      refreshData();
    }
  };

  // Handle Specifications Input Changes
  const handleSpecChange = (index: number, field: "key" | "value", val: string, mode: "create" | "edit") => {
    if (mode === "create") {
      const updated = [...newSpecs];
      updated[index][field] = val;
      setNewSpecs(updated);
    } else {
      const updated = [...editSpecs];
      updated[index][field] = val;
      setEditSpecs(updated);
    }
  };

  const addSpecField = (mode: "create" | "edit") => {
    if (mode === "create") {
      setNewSpecs([...newSpecs, { key: "", value: "" }]);
    } else {
      setEditSpecs([...editSpecs, { key: "", value: "" }]);
    }
  };

  const removeSpecField = (index: number, mode: "create" | "edit") => {
    if (mode === "create") {
      if (newSpecs.length > 1) {
        setNewSpecs(newSpecs.filter((_, idx) => idx !== index));
      }
    } else {
      if (editSpecs.length > 1) {
        setEditSpecs(editSpecs.filter((_, idx) => idx !== index));
      }
    }
  };

  // Filters logic
  const filteredProducts = products.filter((p) => {
    const matchesSearch = 
      p.name.toLowerCase().includes(productSearch.toLowerCase()) || 
      p.brand.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.id.toLowerCase().includes(productSearch.toLowerCase());
    const matchesCategory = productCategoryFilter === "All" || p.category === productCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  const filteredOrders = orders.filter((o) => {
    if (orderFilter === "All") return true;
    return o.status === orderFilter;
  });

  // Login Page View
  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-zinc-100 px-6 py-12">
        <div className="w-full max-w-md bg-white border border-zinc-200 p-8 space-y-6" style={{ borderRadius: "0px" }}>
          <div className="text-center space-y-2">
            <span className="font-serif text-3xl tracking-[0.25em] font-extrabold text-zinc-900 block leading-none">NOVA</span>
            <span className="text-[10px] tracking-[0.22em] font-semibold text-zinc-500 uppercase block mt-1">COOKERS &amp; COOKSTOVES</span>
            <div className="h-px bg-zinc-200 w-16 mx-auto my-4" />
            <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-800">Partner &amp; Sourcing Portal</h2>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] tracking-wider font-bold text-zinc-400 uppercase block">Partner Email</label>
              <input
                type="email"
                placeholder="e.g. jaydeek@novacookers.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-zinc-50 border border-zinc-200 px-4 py-3 text-xs text-zinc-800 placeholder-zinc-400 focus:outline-none focus:bg-white focus:border-zinc-950"
                style={{ borderRadius: "0px" }}
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] tracking-wider font-bold text-zinc-400 uppercase block">Access Password</label>
              <input
                type="password"
                placeholder="Enter password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-zinc-50 border border-zinc-200 px-4 py-3 text-xs text-zinc-800 placeholder-zinc-400 focus:outline-none focus:bg-white focus:border-zinc-950 font-mono"
                style={{ borderRadius: "0px" }}
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] tracking-wider font-bold text-zinc-400 uppercase block">6-Digit OTP Code</label>
              <input
                type="text"
                maxLength={6}
                placeholder="e.g. 123456"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ""))}
                className="w-full bg-zinc-50 border border-zinc-200 px-4 py-3 text-xs text-zinc-800 placeholder-zinc-400 focus:outline-none focus:bg-white focus:border-zinc-950 font-mono"
                style={{ borderRadius: "0px" }}
                required
              />
            </div>

            {loginError && (
              <p className="text-[11px] font-bold uppercase text-red-600 tracking-wider text-center">
                Access Denied: Invalid Credentials or OTP
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-zinc-950 hover:bg-zinc-800 text-zinc-100 hover:text-white py-3.5 text-xs font-bold uppercase tracking-widest transition-colors"
              style={{ borderRadius: "0px" }}
            >
              Authenticate Portal
            </button>
          </form>

          <p className="text-[10px] text-zinc-400 text-center uppercase tracking-wider">
            Private Sourcing Console • Dubai, UAE
          </p>
        </div>
      </div>
    );
  }

  // Admin Dashboard View (WP style)
  return (
    <div className="min-h-screen bg-[#f0f0f1] flex flex-col font-sans text-zinc-800">
      
      {/* Clean Admin Top Bar */}
      <div className="bg-[#1d2327] text-zinc-350 h-10 px-4 flex items-center justify-between text-xs border-b border-zinc-800 select-none font-sans">
        <div className="flex items-center space-x-6">
          <div className="font-bold tracking-widest text-white flex items-center space-x-1.5 uppercase">
            <span>NOVA Admin Portal</span>
          </div>
          <Link href="/" className="hover:text-white flex items-center space-x-1 transition-colors">
            <span>View Storefront</span>
          </Link>
          <span className="text-zinc-650">|</span>
          <span className="text-zinc-400">Database: <span className="text-emerald-400 font-bold">LocalStorage Active</span></span>
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="font-semibold text-zinc-400">Welcome, Jaydeek S. (Owner)</span>
          <button 
            onClick={handleLogout}
            className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white px-3 py-1 font-bold text-[10px] uppercase tracking-wider border border-zinc-700 transition-colors"
            style={{ borderRadius: "0px" }}
          >
            Log Out
          </button>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Left Admin Sidebar */}
        <aside className="w-64 bg-[#1d2327] text-zinc-300 flex flex-col border-r border-zinc-800 select-none">
          <nav className="flex-1 py-4 text-xs font-semibold uppercase tracking-wider">
            <button
              onClick={() => { setActiveTab("dashboard"); setEditingProduct(null); }}
              className={`w-full text-left py-3.5 px-6 flex items-center space-x-3 transition-colors ${
                activeTab === "dashboard" ? "bg-[#72aee6]/15 border-l-4 border-l-[#72aee6] text-white" : "hover:bg-[#2c3338] hover:text-white"
              }`}
            >
              <span>Dashboard Ledger</span>
            </button>

            <button
              onClick={() => { setActiveTab("products"); setEditingProduct(null); }}
              className={`w-full text-left py-3.5 px-6 flex items-center space-x-3 transition-colors ${
                activeTab === "products" ? "bg-[#72aee6]/15 border-l-4 border-l-[#72aee6] text-white" : "hover:bg-[#2c3338] hover:text-white"
              }`}
            >
              <span>Catalog Products</span>
            </button>

            <button
              onClick={() => { setActiveTab("orders"); setEditingProduct(null); }}
              className={`w-full text-left py-3.5 px-6 flex items-center justify-between transition-colors ${
                activeTab === "orders" ? "bg-[#72aee6]/15 border-l-4 border-l-[#72aee6] text-white" : "hover:bg-[#2c3338] hover:text-white"
              }`}
            >
              <div className="flex items-center space-x-3">
                <span>Sourcing Orders</span>
              </div>
              {pendingSourcingCount > 0 && (
                <span className="bg-[#72aee6] text-[#1d2327] font-bold font-mono px-2 py-0.5 text-[10px] rounded-full">
                  {pendingSourcingCount}
                </span>
              )}
            </button>

            <button
              onClick={() => { setActiveTab("inquiries"); setEditingProduct(null); }}
              className={`w-full text-left py-3.5 px-6 flex items-center justify-between transition-colors ${
                activeTab === "inquiries" ? "bg-[#72aee6]/15 border-l-4 border-l-[#72aee6] text-white" : "hover:bg-[#2c3338] hover:text-white"
              }`}
            >
              <div className="flex items-center space-x-3">
                <span>Inquiries &amp; Callbacks</span>
              </div>
              {inquiries.length > 0 && (
                <span className="bg-zinc-600 text-white font-bold font-mono px-2 py-0.5 text-[10px] rounded-full">
                  {inquiries.length}
                </span>
              )}
            </button>

            <button
              onClick={() => { setActiveTab("media"); setEditingProduct(null); }}
              className={`w-full text-left py-3.5 px-6 flex items-center space-x-3 transition-colors ${
                activeTab === "media" ? "bg-[#72aee6]/15 border-l-4 border-l-[#72aee6] text-white" : "hover:bg-[#2c3338] hover:text-white"
              }`}
            >
              <span>Media Library</span>
            </button>

            <button
              onClick={() => { setActiveTab("settings"); setEditingProduct(null); }}
              className={`w-full text-left py-3.5 px-6 flex items-center space-x-3 transition-colors ${
                activeTab === "settings" ? "bg-[#72aee6]/15 border-l-4 border-l-[#72aee6] text-white" : "hover:bg-[#2c3338] hover:text-white"
              }`}
            >
              <span>Settings &amp; APIs</span>
            </button>
          </nav>

          <div className="p-6 border-t border-zinc-800 text-[10px] text-zinc-500 uppercase tracking-widest space-y-1">
            <p>NOVA Sourcing CMS</p>
            <p>v4.0.0 (Matte Edit)</p>
          </div>
        </aside>

        {/* Content Pane */}
        <main className="flex-1 p-8 overflow-y-auto max-w-[1600px] mx-auto w-full">
          
          {/* Header Title */}
          <div className="border-b border-zinc-300 pb-6 mb-8 flex justify-between items-end">
            <div>
              <p className="text-[10px] tracking-[0.2em] font-bold text-zinc-400 uppercase">Internal Sourcing Desk</p>
              <h1 className="font-serif text-3xl font-bold tracking-tight text-zinc-900 capitalize">
                {editingProduct ? "Edit Product" : activeTab} Panel
              </h1>
            </div>
            
            <div className="text-right text-xs font-semibold text-zinc-500 uppercase tracking-wide">
              <span>Dubai Mainland • Order-Based Ledger</span>
            </div>
          </div>

          {/* EDIT PRODUCT INTERFACE (Overlay/Switch) */}
          {editingProduct ? (
            <div className="bg-white border border-zinc-300 p-8 shadow-sm">
              <div className="flex justify-between items-center border-b border-zinc-200 pb-4 mb-6">
                <div>
                  <h3 className="font-serif text-lg font-bold text-zinc-800">
                    Modifying: {editingProduct.brand} {editingProduct.name}
                  </h3>
                  <p className="text-[10px] text-zinc-500 font-mono mt-1">Unique Slug: {editingProduct.id}</p>
                </div>
                <button
                  onClick={() => setEditingProduct(null)}
                  className="bg-zinc-100 hover:bg-zinc-200 border border-zinc-300 text-zinc-700 px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors"
                  style={{ borderRadius: "0px" }}
                >
                  ← Back to List
                </button>
              </div>

              <form onSubmit={handleSaveEditProduct} className="space-y-6 text-xs max-w-4xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-wider font-bold text-zinc-400 uppercase block">Brand Name</label>
                    <input
                      type="text"
                      value={editBrand}
                      onChange={(e) => setEditBrand(e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-200 px-3 py-2.5 text-xs text-zinc-800 focus:outline-none focus:bg-white focus:border-zinc-950"
                      style={{ borderRadius: "0px" }}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] tracking-wider font-bold text-zinc-400 uppercase block">Model/Product Name</label>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-200 px-3 py-2.5 text-xs text-zinc-800 focus:outline-none focus:bg-white focus:border-zinc-950"
                      style={{ borderRadius: "0px" }}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] tracking-wider font-bold text-zinc-400 uppercase block">Category</label>
                    <select
                      value={editCategory}
                      onChange={(e) => setEditCategory(e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-200 px-3 py-2.5 text-xs text-zinc-800 focus:outline-none focus:bg-white focus:border-zinc-950"
                      style={{ borderRadius: "0px" }}
                    >
                      <option>Built-in Hob</option>
                      <option>Cooker</option>
                      <option>Oven</option>
                      <option>Hood</option>
                      <option>Commercial Burner</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-wider font-bold text-zinc-400 uppercase block">Retail Price (AED)</label>
                    <input
                      type="number"
                      value={editRetailPrice}
                      onChange={(e) => setEditRetailPrice(Number(e.target.value) || "")}
                      className="w-full bg-zinc-50 border border-zinc-200 px-3 py-2.5 text-xs text-zinc-800 focus:outline-none focus:bg-white focus:border-zinc-950 font-mono font-bold"
                      style={{ borderRadius: "0px" }}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] tracking-wider font-bold text-zinc-400 uppercase block">Sourcing Cost (AED)</label>
                    <input
                      type="number"
                      value={editEstimatedCost}
                      onChange={(e) => setEditEstimatedCost(Number(e.target.value) || "")}
                      className="w-full bg-zinc-50 border border-zinc-200 px-3 py-2.5 text-xs text-zinc-800 focus:outline-none focus:bg-white focus:border-zinc-950 font-mono text-zinc-600"
                      style={{ borderRadius: "0px" }}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] tracking-wider font-bold text-zinc-400 uppercase block">Supplier Name / Area</label>
                    <input
                      type="text"
                      value={editSupplierName}
                      onChange={(e) => setEditSupplierName(e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-200 px-3 py-2.5 text-xs text-zinc-800 focus:outline-none focus:bg-white focus:border-zinc-950"
                      style={{ borderRadius: "0px" }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] tracking-wider font-bold text-zinc-400 uppercase block">Image Path / Upload</label>
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-4">
                      <input
                        type="text"
                        value={editImage}
                        onChange={(e) => setEditImage(e.target.value)}
                        className="flex-1 bg-zinc-50 border border-zinc-200 px-3 py-2.5 text-xs text-zinc-800 focus:outline-none focus:bg-white focus:border-zinc-950"
                        style={{ borderRadius: "0px" }}
                        required
                      />
                      <select
                        onChange={(e) => { if (e.target.value) setEditImage(e.target.value); }}
                        className="bg-zinc-50 border border-zinc-200 px-3 py-2.5 text-xs focus:outline-none"
                        style={{ borderRadius: "0px" }}
                        defaultValue=""
                      >
                        <option value="" disabled>-- Media Library Presets --</option>
                        {mediaItems.map((m) => (
                          <option key={m.url} value={m.url}>{m.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex items-center gap-4 bg-zinc-50 border border-zinc-200 p-2 text-xs">
                      <span className="font-bold text-zinc-500">OR UPLOAD:</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleMediaFileUpload(e, "edit")}
                        className="cursor-pointer text-xs"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] tracking-wider font-bold text-zinc-400 uppercase block">Product Description</label>
                  <textarea
                    rows={4}
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 px-3 py-2.5 text-xs text-zinc-800 focus:outline-none focus:bg-white focus:border-zinc-950"
                    style={{ borderRadius: "0px" }}
                    required
                  />
                </div>

                {/* Edit Specifications */}
                <div className="border-t border-zinc-200 pt-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-[10px] tracking-wider font-bold text-zinc-400 uppercase">Technical Specifications</h4>
                    <button
                      type="button"
                      onClick={() => addSpecField("edit")}
                      className="text-[10px] font-bold text-zinc-700 hover:text-zinc-950 uppercase tracking-widest border border-zinc-300 px-3 py-1 bg-zinc-50"
                      style={{ borderRadius: "0px" }}
                    >
                      + Add Row
                    </button>
                  </div>

                  <div className="space-y-2">
                    {editSpecs.map((spec, index) => (
                      <div key={index} className="flex gap-4 items-center">
                        <input
                          type="text"
                          value={spec.key}
                          onChange={(e) => handleSpecChange(index, "key", e.target.value, "edit")}
                          placeholder="Label (e.g. Dimensions)"
                          className="flex-1 bg-zinc-50 border border-zinc-200 p-2.5 text-xs"
                          style={{ borderRadius: "0px" }}
                        />
                        <input
                          type="text"
                          value={spec.value}
                          onChange={(e) => handleSpecChange(index, "value", e.target.value, "edit")}
                          placeholder="Value (e.g. 90cm x 60cm)"
                          className="flex-1 bg-zinc-50 border border-zinc-200 p-2.5 text-xs"
                          style={{ borderRadius: "0px" }}
                        />
                        <button
                          type="button"
                          onClick={() => removeSpecField(index, "edit")}
                          className="text-red-500 hover:text-red-700 font-bold px-2 text-base"
                          disabled={editSpecs.length <= 1}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-zinc-200 pt-6 flex gap-4">
                  <button
                    type="submit"
                    className="bg-zinc-950 hover:bg-zinc-800 text-zinc-50 hover:text-white px-8 py-3 text-xs font-bold uppercase tracking-widest transition-colors"
                    style={{ borderRadius: "0px" }}
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingProduct(null)}
                    className="border border-zinc-300 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 px-8 py-3 text-xs font-bold uppercase tracking-widest transition-colors"
                    style={{ borderRadius: "0px" }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <>
              {/* TAB 1: DASHBOARD LEDGER */}
              {activeTab === "dashboard" && (
                <div className="space-y-8">
                  {/* WP Cockpit Metrics Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white border border-zinc-300 p-6 space-y-2 shadow-sm">
                      <span className="text-[9px] tracking-widest font-bold text-zinc-400 uppercase">Gross Sourced Sales</span>
                      <p className="font-mono text-2xl font-bold text-zinc-800">AED {totalRetailSales.toLocaleString()}</p>
                    </div>
                    <div className="bg-white border border-zinc-300 p-6 space-y-2 shadow-sm">
                      <span className="text-[9px] tracking-widest font-bold text-zinc-400 uppercase">Sourcing Cost Basis</span>
                      <p className="font-mono text-2xl font-bold text-zinc-800">AED {totalCostBasis.toLocaleString()}</p>
                    </div>
                    <div className="bg-white border border-zinc-300 p-6 space-y-2 border-l-4 border-l-[#72aee6] shadow-sm">
                      <span className="text-[9px] tracking-widest font-bold text-[#1d2327] uppercase">Net Sourcing Profit</span>
                      <p className="font-mono text-2xl font-bold text-zinc-950">AED {totalProfits.toLocaleString()}</p>
                    </div>
                    <div className="bg-white border border-zinc-300 p-6 space-y-2 shadow-sm">
                      <span className="text-[9px] tracking-widest font-bold text-zinc-400 uppercase">Awaiting Callback</span>
                      <p className="font-mono text-2xl font-bold text-zinc-800">{inquiries.length}</p>
                    </div>
                  </div>

                  {/* Private Ledger Table */}
                  <div className="bg-white border border-zinc-300 p-6 space-y-4 shadow-sm">
                    <div className="border-b border-zinc-200 pb-3 flex justify-between items-baseline">
                      <div>
                        <h3 className="text-xs font-bold text-zinc-800 uppercase tracking-widest">
                          Sourcing Profit &amp; Margin Ledger
                        </h3>
                        <p className="text-[10px] text-zinc-500 mt-1">Detailed margin metrics for each active client procurement invoice.</p>
                      </div>
                      <span className="text-[9px] font-bold text-red-600 bg-red-50 border border-red-200 px-2.5 py-0.5 uppercase tracking-wider">
                        Strictly Confidential
                      </span>
                    </div>

                    {orders.length === 0 ? (
                      <div className="p-8 text-center text-xs text-zinc-400 uppercase font-bold tracking-wider">
                        No transactions registered in this ledger session.
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-zinc-200 text-left text-xs">
                          <thead className="bg-zinc-50 text-[10px] tracking-widest font-bold text-zinc-400 uppercase">
                            <tr>
                              <th className="p-4">Invoice ID</th>
                              <th className="p-4">Customer Name</th>
                              <th className="p-4">Date</th>
                              <th className="p-4">Sourcing Cost</th>
                              <th className="p-4">Retail Charge</th>
                              <th className="p-4 text-zinc-900">Net Profit</th>
                              <th className="p-4">Margin %</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-zinc-200 font-mono text-zinc-700">
                            {orders.map((order) => {
                              const orderMargin = order.totalPrice - order.totalCost;
                              const marginPct = order.totalPrice > 0 ? (orderMargin / order.totalPrice) * 100 : 0;
                              return (
                                <tr key={order.id} className="hover:bg-zinc-50/50">
                                  <td className="p-4 font-bold text-zinc-900">{order.id}</td>
                                  <td className="p-4 font-sans font-semibold text-zinc-800">{order.customerName}</td>
                                  <td className="p-4 text-zinc-500">{order.date}</td>
                                  <td className="p-4 text-zinc-500">AED {order.totalCost.toLocaleString()}</td>
                                  <td className="p-4 text-zinc-800 font-bold">AED {order.totalPrice.toLocaleString()}</td>
                                  <td className="p-4 font-bold text-zinc-950">AED {orderMargin.toLocaleString()}</td>
                                  <td className="p-4 font-sans font-bold text-zinc-900">{marginPct.toFixed(1)}%</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 2: CATALOG PRODUCTS (CRUD + Search + Category Filter) */}
              {activeTab === "products" && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Column: Create Product */}
                  <div className="bg-white border border-zinc-300 p-6 lg:col-span-4 shadow-sm">
                    <div className="border-b border-zinc-200 pb-3 mb-4">
                      <h3 className="text-xs font-bold text-zinc-800 uppercase tracking-widest">
                        Quick Add New Appliance
                      </h3>
                      <p className="text-[10px] text-zinc-500 mt-1">Directly append items to the customer-facing catalog.</p>
                    </div>

                    <form onSubmit={handleAddProduct} className="space-y-4 text-xs">
                      <div className="space-y-1.5">
                        <label className="text-[9px] tracking-wider font-bold text-zinc-400 uppercase">Product Slug ID</label>
                        <input
                          type="text"
                          value={newId}
                          onChange={(e) => setNewId(e.target.value)}
                          placeholder="e.g. smeg-cooker-90"
                          className="w-full bg-zinc-50 border border-zinc-200 px-3 py-2.5 text-xs text-zinc-800 focus:outline-none focus:bg-white focus:border-zinc-950 font-mono"
                          style={{ borderRadius: "0px" }}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <label className="text-[9px] tracking-wider font-bold text-zinc-400 uppercase">Brand</label>
                          <input
                            type="text"
                            value={newBrand}
                            onChange={(e) => setNewBrand(e.target.value)}
                            placeholder="e.g. Smeg"
                            className="w-full bg-zinc-50 border border-zinc-200 px-3 py-2.5 text-xs text-zinc-800 focus:outline-none focus:bg-white focus:border-zinc-950"
                            style={{ borderRadius: "0px" }}
                            required
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[9px] tracking-wider font-bold text-zinc-400 uppercase">Category</label>
                          <select
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            className="w-full bg-zinc-50 border border-zinc-200 px-3 py-2.5 text-xs text-zinc-800 focus:outline-none focus:bg-white focus:border-zinc-950"
                            style={{ borderRadius: "0px" }}
                          >
                            <option>Built-in Hob</option>
                            <option>Cooker</option>
                            <option>Oven</option>
                            <option>Hood</option>
                            <option>Commercial Burner</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[9px] tracking-wider font-bold text-zinc-400 uppercase">Model Name</label>
                        <input
                          type="text"
                          value={newName}
                          onChange={(e) => setNewName(e.target.value)}
                          placeholder="e.g. Master Cooker SSA-9"
                          className="w-full bg-zinc-50 border border-zinc-200 px-3 py-2.5 text-xs text-zinc-800 focus:outline-none focus:bg-white focus:border-zinc-950"
                          style={{ borderRadius: "0px" }}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <label className="text-[9px] tracking-wider font-bold text-zinc-400 uppercase">Retail Price (AED)</label>
                          <input
                            type="number"
                            value={newRetailPrice}
                            onChange={(e) => setNewRetailPrice(e.target.value !== "" ? Number(e.target.value) : "")}
                            placeholder="6200"
                            className="w-full bg-zinc-50 border border-zinc-200 px-3 py-2.5 text-xs text-zinc-800 focus:outline-none focus:bg-white focus:border-zinc-950 font-mono font-bold"
                            style={{ borderRadius: "0px" }}
                            required
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[9px] tracking-wider font-bold text-zinc-400 uppercase">Sourcing Cost (AED)</label>
                          <input
                            type="number"
                            value={newEstimatedCost}
                            onChange={(e) => setNewEstimatedCost(e.target.value !== "" ? Number(e.target.value) : "")}
                            placeholder="4000"
                            className="w-full bg-zinc-50 border border-zinc-200 px-3 py-2.5 text-xs text-zinc-800 focus:outline-none focus:bg-white focus:border-zinc-950 font-mono"
                            style={{ borderRadius: "0px" }}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[9px] tracking-wider font-bold text-zinc-400 uppercase">Supplier Coordinates</label>
                        <input
                          type="text"
                          value={newSupplierName}
                          onChange={(e) => setNewSupplierName(e.target.value)}
                          placeholder="Sharjah/Deira distributor name"
                          className="w-full bg-zinc-50 border border-zinc-200 px-3 py-2.5 text-xs text-zinc-800 focus:outline-none focus:bg-white focus:border-zinc-950"
                          style={{ borderRadius: "0px" }}
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[9px] tracking-wider font-bold text-zinc-400 uppercase">Image Path / Upload</label>
                        <div className="flex flex-col gap-2">
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={newImage}
                              onChange={(e) => setNewImage(e.target.value)}
                              placeholder="/bosch_pcr9a5b90m.png"
                              className="flex-1 bg-zinc-50 border border-zinc-200 px-3 py-2.5 text-xs text-zinc-800 focus:outline-none focus:bg-white focus:border-zinc-950"
                              style={{ borderRadius: "0px" }}
                            />
                            <select
                              onChange={(e) => { if (e.target.value) setNewImage(e.target.value); }}
                              className="bg-zinc-50 border border-zinc-200 px-2 py-2 text-xs focus:outline-none"
                              style={{ borderRadius: "0px" }}
                              defaultValue=""
                            >
                              <option value="" disabled>Presets</option>
                              {mediaItems.map((m) => (
                                <option key={m.url} value={m.url}>{m.name}</option>
                              ))}
                            </select>
                          </div>
                          <div className="flex items-center gap-2 bg-zinc-50 border border-zinc-200 p-1.5 text-[11px]">
                            <span className="font-bold text-zinc-500">OR UPLOAD:</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleMediaFileUpload(e, "create")}
                              className="cursor-pointer text-[10px]"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[9px] tracking-wider font-bold text-zinc-400 uppercase">Description</label>
                        <textarea
                          rows={2}
                          value={newDescription}
                          onChange={(e) => setNewDescription(e.target.value)}
                          placeholder="Direct imported, ESMA compliance..."
                          className="w-full bg-zinc-50 border border-zinc-200 px-3 py-2.5 text-xs text-zinc-800 focus:outline-none focus:bg-white focus:border-zinc-950"
                          style={{ borderRadius: "0px" }}
                        />
                      </div>

                      {/* Technical specifications rows */}
                      <div className="border-t border-zinc-200 pt-3 space-y-2">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[9px] tracking-wider font-bold text-zinc-400 uppercase">Specifications</span>
                          <button
                            type="button"
                            onClick={() => addSpecField("create")}
                            className="text-[9px] font-bold text-zinc-500 hover:text-zinc-800 uppercase"
                          >
                            + Add Row
                          </button>
                        </div>
                        {newSpecs.map((spec, index) => (
                          <div key={index} className="flex gap-2 items-center">
                            <input
                              type="text"
                              value={spec.key}
                              onChange={(e) => handleSpecChange(index, "key", e.target.value, "create")}
                              placeholder="Key"
                              className="w-1/3 bg-zinc-50 border border-zinc-200 p-1.5 text-[11px]"
                              style={{ borderRadius: "0px" }}
                            />
                            <input
                              type="text"
                              value={spec.value}
                              onChange={(e) => handleSpecChange(index, "value", e.target.value, "create")}
                              placeholder="Value"
                              className="flex-1 bg-zinc-50 border border-zinc-200 p-1.5 text-[11px]"
                              style={{ borderRadius: "0px" }}
                            />
                            <button
                              type="button"
                              onClick={() => removeSpecField(index, "create")}
                              className="text-red-500 hover:text-red-700 font-bold px-1"
                              disabled={newSpecs.length <= 1}
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-zinc-950 hover:bg-zinc-800 text-zinc-100 hover:text-white py-3 text-xs font-bold uppercase tracking-widest transition-colors"
                        style={{ borderRadius: "0px" }}
                      >
                        Publish Sourcing Card
                      </button>
                    </form>
                  </div>

                  {/* Right Column: Products List with search and edit triggers */}
                  <div className="bg-white border border-[#dcdcde] p-6 lg:col-span-8 shadow-sm">
                    <div className="border-b border-zinc-200 pb-3 mb-6 flex flex-col sm:flex-row justify-between items-baseline gap-4">
                      <h3 className="text-xs font-bold text-zinc-800 uppercase tracking-widest">
                        Published Catalog ({products.length} Items)
                      </h3>
                      
                      {/* Live Filters */}
                      <div className="flex gap-3 w-full sm:w-auto">
                        <input
                          type="text"
                          placeholder="Search brand, name..."
                          value={productSearch}
                          onChange={(e) => setProductSearch(e.target.value)}
                          className="bg-zinc-50 border border-zinc-200 px-3 py-1.5 text-[11px] placeholder-zinc-400 focus:outline-none focus:bg-white"
                          style={{ borderRadius: "0px" }}
                        />
                        <select
                          value={productCategoryFilter}
                          onChange={(e) => setProductCategoryFilter(e.target.value)}
                          className="bg-zinc-50 border border-zinc-200 px-3 py-1.5 text-[11px] focus:outline-none"
                          style={{ borderRadius: "0px" }}
                        >
                          <option value="All">All Categories</option>
                          <option>Built-in Hob</option>
                          <option>Cooker</option>
                          <option>Oven</option>
                          <option>Hood</option>
                          <option>Commercial Burner</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {filteredProducts.map((p) => (
                        <div key={p.id} className="border border-zinc-200 bg-white p-4 flex gap-4 items-start shadow-sm" style={{ borderRadius: "0px" }}>
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-16 h-16 object-cover border border-zinc-200 bg-zinc-50"
                          />
                          <div className="flex-1 min-w-0 space-y-1">
                            <div className="space-y-0.5">
                              <span className="text-[8px] tracking-widest font-bold text-zinc-400 uppercase">{p.brand} • {p.category}</span>
                              <h4 className="font-serif text-xs font-bold text-zinc-800 truncate">{p.name}</h4>
                            </div>
                            <div className="text-[10px] text-zinc-500 font-mono space-y-0.5">
                              <p className="text-zinc-800 font-semibold">Retail: AED {p.retailPrice.toLocaleString()}</p>
                              <p className="text-zinc-400">Cost: AED {p.estimatedCost.toLocaleString()} (Margin: AED {(p.retailPrice - p.estimatedCost).toLocaleString()})</p>
                              <p className="text-[9px] text-zinc-400 truncate">Supplier: {p.supplierName}</p>
                            </div>

                            <div className="pt-2 flex gap-4 text-[9px] font-bold uppercase tracking-widest">
                              <button
                                onClick={() => startEditProduct(p)}
                                className="text-[#2271b1] hover:text-[#135e96] border-r border-zinc-200 pr-3"
                              >
                                Edit Details
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(p.id)}
                                className="text-red-500 hover:text-red-700"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: ORDERS LIST */}
              {activeTab === "orders" && (
                <div className="space-y-6">
                  
                  {/* Order filter controls */}
                  <div className="bg-white border border-zinc-300 p-4 shadow-sm flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-700">Filter Orders By Status:</span>
                    <select
                      value={orderFilter}
                      onChange={(e) => setOrderFilter(e.target.value)}
                      className="bg-zinc-50 border border-zinc-200 px-3 py-1.5 text-xs focus:outline-none"
                      style={{ borderRadius: "0px" }}
                    >
                      <option value="All">Show All Orders</option>
                      <option>Pending Sourcing</option>
                      <option>Sourced</option>
                      <option>Delivered</option>
                      <option>Installed (DAKEEK)</option>
                    </select>
                  </div>

                  {filteredOrders.length === 0 ? (
                    <div className="bg-white border border-zinc-300 p-12 text-center text-xs text-zinc-400 font-bold uppercase tracking-widest shadow-sm">
                      No orders found under selected filter status.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredOrders.map((order) => (
                        <div key={order.id} className="bg-white border border-zinc-300 p-6 space-y-4 shadow-sm" style={{ borderRadius: "0px" }}>
                          
                          {/* Order Card Header */}
                          <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-zinc-150 pb-4 gap-4">
                            <div>
                              <span className="text-[9px] font-bold text-zinc-400 font-mono block">{order.date}</span>
                              <h4 className="font-serif text-base text-zinc-900 font-bold">{order.id} — {order.customerName}</h4>
                            </div>
                            
                            <div className="flex items-center space-x-3 text-xs">
                              <span className="font-bold text-zinc-500 uppercase tracking-wider">Status:</span>
                              <select
                                value={order.status}
                                onChange={(e) => handleStatusChange(order.id, e.target.value as any)}
                                className={`border px-3 py-1 text-xs font-bold uppercase tracking-wide focus:outline-none ${
                                  order.status === "Installed (DAKEEK)" 
                                    ? "bg-emerald-50 border-emerald-300 text-emerald-700"
                                    : order.status === "Delivered"
                                    ? "bg-blue-50 border-blue-300 text-blue-700"
                                    : "bg-amber-50 border-amber-300 text-amber-700"
                                }`}
                                style={{ borderRadius: "0px" }}
                              >
                                <option>Pending Sourcing</option>
                                <option>Sourced</option>
                                <option>Delivered</option>
                                <option>Installed (DAKEEK)</option>
                              </select>
                            </div>
                          </div>

                          {/* Order Details Body */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-xs leading-5">
                            
                            {/* Sourced Items list */}
                            <div className="space-y-2">
                              <p className="text-[9px] tracking-widest font-bold text-zinc-400 uppercase">Items List</p>
                              <ul className="space-y-1.5 font-sans font-semibold text-zinc-700">
                                {order.items.map((item, idx) => (
                                  <li key={idx} className="flex justify-between border-b border-zinc-100 pb-1">
                                    <span>{item.productName} (x{item.quantity})</span>
                                    <span className="font-mono text-[10px] text-zinc-400">Cost: AED {item.estimatedCost.toLocaleString()}</span>
                                  </li>
                                ))}
                              </ul>
                              <div className="pt-2 border-t border-zinc-100 flex justify-between font-mono font-bold text-zinc-800 text-[11px]">
                                <span>Charged Total:</span>
                                <span>AED {order.totalPrice.toLocaleString()}</span>
                              </div>
                            </div>

                            {/* Client details */}
                            <div className="space-y-1">
                              <p className="text-[9px] tracking-widest font-bold text-zinc-400 uppercase mb-2">Customer Coordinates</p>
                              <p className="font-semibold text-zinc-800">Phone: <span className="font-mono text-zinc-500">{order.customerPhone}</span></p>
                              <p className="font-semibold text-zinc-800">Email: <span className="font-mono text-zinc-500">{order.customerEmail}</span></p>
                              <p className="text-zinc-500 font-semibold mt-2">Method: {order.paymentMethod}</p>
                            </div>

                            {/* Shipping address */}
                            <div className="space-y-1">
                              <p className="text-[9px] tracking-widest font-bold text-zinc-400 uppercase mb-2">Delivery Address</p>
                              <p className="text-zinc-600 font-semibold">{order.address}</p>
                            </div>
                          </div>

                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: INQUIRIES & CALLBACK TICKETS */}
              {activeTab === "inquiries" && (
                <div className="space-y-6">
                  {inquiries.length === 0 ? (
                    <div className="bg-white border border-zinc-300 p-12 text-center text-xs text-zinc-400 font-bold uppercase tracking-widest shadow-sm">
                      No active customer inquiries registered.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {inquiries.map((inq) => (
                        <div key={inq.id} className="bg-white border border-zinc-300 p-6 space-y-4 shadow-sm" style={{ borderRadius: "0px" }}>
                          
                          <div className="flex justify-between items-center border-b border-zinc-100 pb-2">
                            <span className="font-mono text-[9px] text-zinc-400">{inq.date}</span>
                            <span className="text-[10px] font-bold text-zinc-700 bg-zinc-100 px-2 py-0.5 uppercase tracking-wider font-mono">Callback Request</span>
                          </div>

                          <div className="space-y-2 text-xs leading-5">
                            <p className="font-bold text-zinc-900 text-sm">{inq.customerName}</p>
                            <p className="font-semibold text-zinc-700">Phone: <span className="font-mono text-zinc-500">{inq.customerPhone}</span></p>
                            {inq.productName && (
                              <p className="font-semibold text-zinc-700">Appliance: <span className="text-zinc-900 font-bold">{inq.productName} ({inq.productId})</span></p>
                            )}
                            <div className="bg-zinc-50 border border-zinc-100 p-3 text-zinc-600 font-semibold mt-2">
                              &ldquo;{inq.message}&rdquo;
                            </div>
                          </div>

                          <div className="flex gap-4 pt-2">
                            <a
                              href={`https://wa.me/${inq.customerPhone.replace(/[^0-9]/g, "")}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="matte-button-solid text-center w-full py-2.5 text-[10px] font-bold uppercase tracking-wider block"
                            >
                              Reply on WhatsApp
                            </a>
                            <button
                              onClick={() => handleDeleteInquiry(inq.id)}
                              className="border border-zinc-300 hover:bg-red-50 hover:border-red-300 hover:text-red-600 text-zinc-500 text-center w-full py-2.5 text-[10px] font-bold uppercase tracking-wider block transition-colors"
                              style={{ borderRadius: "0px" }}
                            >
                              Resolve Ticket
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 5: MEDIA LIBRARY */}
              {activeTab === "media" && (
                <div className="bg-white border border-zinc-300 p-6 shadow-sm space-y-8">
                  <div className="border-b border-zinc-200 pb-3 flex flex-col md:flex-row justify-between items-baseline gap-4">
                    <div>
                      <h3 className="text-xs font-bold text-zinc-800 uppercase tracking-widest">
                        Local Media Assets
                      </h3>
                      <p className="text-[10px] text-zinc-500 mt-1">Stunning matte finish product images created for NOVA Cookers. Copy the URL to use in manual product additions.</p>
                    </div>
                  </div>

                  {/* Add Media / Upload Form */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-zinc-50 border border-zinc-200 p-6">
                    <form onSubmit={handleAddMediaUrl} className="space-y-3 text-xs">
                      <h4 className="text-[10px] tracking-wider font-bold text-zinc-400 uppercase">Option A: Link Remote Image URL</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[9px] uppercase text-zinc-500 block">Asset Label Name</label>
                          <input
                            type="text"
                            placeholder="e.g. Bertazzoni Cooker"
                            value={newMediaName}
                            onChange={(e) => setNewMediaName(e.target.value)}
                            className="w-full bg-white border border-zinc-200 p-2 text-xs"
                            style={{ borderRadius: "0px" }}
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] uppercase text-zinc-500 block">Image URL</label>
                          <input
                            type="text"
                            placeholder="https://..."
                            value={newMediaUrl}
                            onChange={(e) => setNewMediaUrl(e.target.value)}
                            className="w-full bg-white border border-zinc-200 p-2 text-xs"
                            style={{ borderRadius: "0px" }}
                          />
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="bg-zinc-950 hover:bg-zinc-800 text-zinc-100 px-4 py-2 text-[10px] font-bold uppercase tracking-widest"
                        style={{ borderRadius: "0px" }}
                      >
                        Add URL Asset
                      </button>
                    </form>

                    <div className="space-y-3 text-xs flex flex-col justify-center border-t md:border-t-0 md:border-l border-zinc-200 pt-4 md:pt-0 md:pl-6">
                      <h4 className="text-[10px] tracking-wider font-bold text-zinc-400 uppercase">Option B: Upload Real File (Base64)</h4>
                      <p className="text-[10px] text-zinc-500 leading-normal">
                        Select a file from your system to convert it to a local base64 Data URL. This will be stored inside local browser memory.
                      </p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleMediaFileUpload(e, "general")}
                        className="cursor-pointer text-xs p-1 border border-zinc-200 bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {mediaItems.map((m) => (
                      <div key={m.url} className="border border-zinc-200 p-2 bg-zinc-50 space-y-2 flex flex-col justify-between" style={{ borderRadius: "0px" }}>
                        <div className="space-y-2">
                          <div className="aspect-video relative overflow-hidden bg-white border border-zinc-200">
                            <img
                              src={m.url}
                              alt={m.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs font-bold text-zinc-800 truncate">{m.name}</p>
                            <input
                              type="text"
                              value={m.url}
                              readOnly
                              onClick={(e) => {
                                (e.target as HTMLInputElement).select();
                                navigator.clipboard.writeText(m.url);
                                alert("URL copied to clipboard!");
                              }}
                              className="w-full bg-white border border-zinc-200 px-2 py-1 text-[10px] text-zinc-500 font-mono cursor-pointer hover:bg-zinc-50 select-all"
                              style={{ borderRadius: "0px" }}
                            />
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeleteMedia(m.url)}
                          className="w-full text-center border border-zinc-200 hover:border-red-300 hover:bg-red-50 text-red-500 py-1.5 text-[9px] font-bold uppercase tracking-wider transition-colors"
                          style={{ borderRadius: "0px" }}
                        >
                          Delete Asset
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 6: SETTINGS & APIS */}
              {activeTab === "settings" && (
                <div className="bg-white border border-zinc-300 p-6 shadow-sm space-y-6 max-w-2xl">
                  <div className="border-b border-zinc-200 pb-3">
                    <h3 className="text-xs font-bold text-zinc-800 uppercase tracking-widest">
                      Sourcing Engine Settings
                    </h3>
                    <p className="text-[10px] text-zinc-500 mt-1">Configure VAT metrics and mock api endpoints.</p>
                  </div>

                  <div className="space-y-4 text-xs">
                    <div className="space-y-1.5">
                      <label className="text-[10px] tracking-wider font-bold text-zinc-400 uppercase block">VAT Rate (%)</label>
                      <input
                        type="number"
                        defaultValue={5}
                        disabled
                        className="bg-zinc-100 border border-zinc-200 px-3 py-2 text-xs text-zinc-500 font-mono w-32"
                        style={{ borderRadius: "0px" }}
                      />
                      <p className="text-[10px] text-zinc-400">Locked to United Arab Emirates standard rate of 5%.</p>
                    </div>

                    <div className="space-y-1.5 pt-2">
                      <label className="text-[10px] tracking-wider font-bold text-zinc-400 uppercase block">Logistics Partner</label>
                      <input
                        type="text"
                        defaultValue="DAKEEK Technical Services Co. LLC"
                        disabled
                        className="bg-zinc-100 border border-zinc-200 px-3 py-2 text-xs text-zinc-500 w-full"
                        style={{ borderRadius: "0px" }}
                      />
                    </div>

                    <div className="space-y-1.5 pt-2">
                      <label className="text-[10px] tracking-wider font-bold text-zinc-400 uppercase block">WhatsApp Redirect Phone</label>
                      <input
                        type="text"
                        defaultValue="+971 50 123 4567"
                        disabled
                        className="bg-zinc-100 border border-zinc-200 px-3 py-2 text-xs text-zinc-500 w-full"
                        style={{ borderRadius: "0px" }}
                      />
                    </div>

                    <div className="border-t border-zinc-200 pt-6">
                      <h4 className="text-[10px] tracking-wider font-bold text-zinc-800 uppercase mb-2">Simulate Database Operations</h4>
                      <button
                        onClick={() => {
                          if (confirm("Reset database to original default values? This clears all orders and custom products.")) {
                            localStorage.removeItem("nova_products");
                            localStorage.removeItem("nova_orders");
                            localStorage.removeItem("nova_inquiries");
                            alert("Database successfully reset!");
                            window.location.reload();
                          }
                        }}
                        className="bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 px-4 py-2 text-[10px] font-bold uppercase tracking-wider transition-colors"
                        style={{ borderRadius: "0px" }}
                      >
                        Reset Mock Database
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

        </main>
      </div>

    </div>
  );
}
