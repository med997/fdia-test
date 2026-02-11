import { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import ProductTable from './components/ProductTable';
import AddProductModal from './components/AddProductModal';
import Toast from './components/Toast';
import { Plus, Search, Bell, Menu, ChevronLeft, ChevronRight } from 'lucide-react';
import ComingSoon from './components/ComingSoon';

const App = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false); 
  const [toast, setToast] = useState(null); // { message, type }
  const [currentView, setCurrentView] = useState('Products');

  // Search & Pagination State
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const itemsPerPage = 10;

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  // Fetch Categories on mount
  useEffect(() => {
     fetch('https://dummyjson.com/products/category-list')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error('Error fetching categories:', err));
  }, []);

  const fetchProducts = useCallback(() => {
    setLoading(true);
    const skip = (currentPage - 1) * itemsPerPage;
    
    // Determine which API endpoint to use
    let url = `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${skip}`;
    
    if (searchTerm) {
      url = `https://dummyjson.com/products/search?q=${searchTerm}&limit=${itemsPerPage}&skip=${skip}`;
    } else if (selectedCategory) {
      url = `https://dummyjson.com/products/category/${selectedCategory}?limit=${itemsPerPage}&skip=${skip}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setTotalProducts(data.total);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
        setLoading(false);
        showToast('Failed to load products', 'error');
      });
  }, [searchTerm, currentPage, selectedCategory]);

  // Debounce search to avoid too many API calls
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchProducts();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [fetchProducts]);

  // Handle Search Input Change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setSelectedCategory(''); // Reset category when searching
    setCurrentPage(1); 
  };

  // Handle Category Change
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSearchTerm(''); // Reset search when filtering by category
    setCurrentPage(1);
  };

  // Handle Page Change
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= Math.ceil(totalProducts / itemsPerPage)) {
      setCurrentPage(newPage);
    }
  };



  const handleAddProduct = async (newProductData) => {
    // Prepare data (convert price to number as per API expectation usually, though dummyjson is lenient)
    const payload = {
      ...newProductData,
      price: parseFloat(newProductData.price) || 0,
      discountPercentage: parseFloat(newProductData.discountPercentage) || 0,
      stock: parseInt(newProductData.stock) || 0,
      rating: parseFloat(newProductData.rating) || 0,
    };

    // Requested fetch implementation
    fetch('https://dummyjson.com/products/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data); // "console.log" as requested

      // Optimistic Update
      const optimisticProduct = {
        ...payload,
        id: data.id, 
        thumbnail: payload.thumbnail || 'https://via.placeholder.com/150', // Use user-provided thumbnail or fallback
        brand: payload.brand || 'Generic Brand', 
        stock: payload.stock || 10, 
      };

      // Prepend to the current list
      setProducts((prev) => [optimisticProduct, ...prev]);
      showToast('Product added successfully!', 'success');
      
      // Since dummyjson doesn't actually save, we don't re-fetch.
      // If we re-fetched, the item would disappear.
    })
    .catch(err => {
      console.error('Error adding product:', err);
      showToast('Error adding product. Please try again.', 'error');
    });
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      showToast('Product deleted successfully', 'success');
      // In real app, would allow API delete call here
    }
  };

  const handleEdit = (product) => {
    console.log('Edit product:', product);
  };

  // Calculate KPI stats (mock logic for demo)
  const lowStockCount = products.filter(p => p.stock < 10).length;
  const inStockCount = totalProducts - lowStockCount; // approximate for demo
  const totalValue = products.reduce((acc, p) => acc + (p.price * p.stock), 0);
  
  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  return (
    <div className="h-screen bg-[#F9FAFB] flex font-sans text-gray-900 overflow-hidden">
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        currentView={currentView}
        onNavigate={(view) => {
          setCurrentView(view);
          setSidebarOpen(false); // Close sidebar on mobile on nav
        }}
      />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col transition-all duration-300 h-full">
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-hidden flex flex-col">
          {currentView === 'Products' ? (
             <div className="flex-1 flex flex-col min-h-0 overflow-hidden px-4 pb-4 pt-2 lg:px-8 lg:pb-8 lg:pt-3">
          
          {/* Top Section: Header, KPIs, Filter */}
          <div className="shrink-0 flex flex-col gap-6 mb-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Products</h1>
                <nav className="flex items-center text-sm text-gray-500 mt-2">
                  <span>E-commerce</span>
                  <ChevronRight className="w-4 h-4 mx-2" />
                  <span>Inventory</span>
                  <ChevronRight className="w-4 h-4 mx-2" />
                  <span className="text-indigo-600 font-medium">Product List</span>
                </nav>
              </div>
              <div className="mt-4 md:mt-0 flex items-center gap-4">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all hover:shadow-md"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add Product
                </button>
              </div>
            </div>

            {/* KPI Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Card 1 */}
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Total Products</div>
                <div className="flex items-end justify-between">
                  <div className="text-2xl font-bold text-gray-900">{totalProducts.toLocaleString()}</div>
                  <div className="inline-flex items-baseline px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    +12%
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">In Stock</div>
                <div className="flex items-end justify-between">
                  <div className="text-2xl font-bold text-gray-900">{inStockCount.toLocaleString()}</div>
                  <div className="text-xs text-gray-500 font-medium">88% of total</div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Low Stock</div>
                <div className="flex items-end justify-between">
                  <div className="text-2xl font-bold text-red-600">{lowStockCount}</div>
                  <div className="inline-flex items-baseline px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    Action required
                  </div>
                </div>
              </div>

              {/* Card 4 */}
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Total Value</div>
                <div className="flex items-end justify-between">
                  <div className="text-2xl font-bold text-gray-900">${totalValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                  <div className="p-1 bg-gray-50 rounded text-gray-500">
                     <span className="text-[10px] font-semibold">USD</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Filter & Search Row */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
              </div>
              <div className="sm:w-64">
                <select 
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm appearance-none cursor-pointer"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Product Table Container - Flex 1 to fill remaining space */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 flex-1 flex flex-col min-h-0 overflow-hidden">
             {loading ? (
                <div className="flex items-center justify-center p-12 flex-1">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                </div>
              ) : (
                <>
                  {/* Table area with scroll */}
                  <div className="flex-1 overflow-auto">
                    <ProductTable products={products} onEdit={handleEdit} onDelete={handleDelete} />
                  </div>
                  
                  {/* Footer / Pagination - Fixed at bottom of card */}
                  <div className="shrink-0 px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-white">
                    <p className="text-sm text-gray-500">
                      Showing <span className="font-medium text-gray-900">{(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, totalProducts)}</span> of <span className="font-medium text-gray-900">{totalProducts}</span> products
                    </p>
                    
                    <div className="flex items-center gap-2">
                       <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Previous
                      </button>
                      
                      {/* Page Numbers (Simplified for demo) */}
                      <div className="hidden md:flex gap-1">
                        {[1, 2, 3].map(page => (
                           <button
                             key={page}
                             onClick={() => handlePageChange(page)}
                             className={`w-9 h-9 flex items-center justify-center text-sm font-medium rounded-lg transition-colors ${currentPage === page ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                           >
                             {page}
                           </button>
                        ))}
                        <span className="w-9 h-9 flex items-center justify-center text-gray-500">...</span>
                        <button className="w-9 h-9 flex items-center justify-center text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg">125</button>
                      </div>

                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                         Next
                      </button>
                    </div>
                  </div>
                </>
              )}
          </div>
          </div>
          ) : (
             <ComingSoon title={currentView} />
          )}
        </main>
      </div>

      {/* Add Product Modal */}
      {isModalOpen && (
        <AddProductModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddProduct}
        />
      )}

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
export default App;
