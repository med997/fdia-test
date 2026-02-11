import { useState } from 'react';
import { X, Loader2, Image as ImageIcon, UploadCloud } from 'lucide-react';

const AddProductModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    brand: '',
    stock: '',
    rating: '',
    discountPercentage: '',
    availabilityStatus: 'In Stock',
    thumbnail: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await onSubmit(formData);
    setIsSubmitting(false);
    setFormData({ 
      title: '', 
      price: '', 
      description: '', 
      category: '', 
      brand: '',
      stock: '',
      rating: '',
      discountPercentage: '',
      availabilityStatus: 'In Stock',
      thumbnail: ''
    });
    onClose();
  };

  const categories = [
    'beauty', 'fragrances', 'furniture', 'groceries', 
    'home-decoration', 'kitchen-accessories', 'laptops',
    'mens-shirts', 'mens-shoes', 'mens-watches',
    'mobile-accessories', 'motorcycle', 'skin-care',
    'smartphones', 'sports-accessories', 'sunglasses',
    'tablets', 'tops', 'vehicle', 'womens-bags',
    'womens-dresses', 'womens-jewellery', 'womens-shoes',
    'womens-watches'
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, thumbnail: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      {/* Backdrop with blur */}
      <div 
        className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
        aria-hidden="true"
      ></div>

      <div className="flex min-h-full items-center justify-center p-4 text-center">
        <div className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all sm:w-full sm:max-w-2xl border border-gray-100">
          
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white">
            <div>
              <h3 className="text-lg font-semibold leading-6 text-gray-900" id="modal-title">
                Add New Product
              </h3>
              <p className="mt-1 text-sm text-gray-500">Details about the item.</p>
            </div>
            <button
              type="button"
              className="rounded-full p-2 bg-gray-50 text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onClick={onClose}
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="px-6 py-6 space-y-6">
              
              {/* Image Upload Section */}
              <div className="col-span-full">
                <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">Product Image</label>
                <div className="mt-2 flex justify-center rounded-xl border border-dashed border-gray-300 px-6 py-10 hover:bg-gray-50 hover:border-indigo-400 transition-all relative group bg-gray-50/50">
                  {formData.thumbnail ? (
                    <div className="relative w-full h-48 flex justify-center items-center">
                      <img 
                        src={formData.thumbnail} 
                        alt="Preview" 
                        className="h-full object-contain rounded-lg shadow-sm" 
                      />
                      <button 
                        type="button"
                        onClick={() => setFormData(prev => ({...prev, thumbnail: ''}))}
                        className="absolute -top-2 -right-2 bg-white rounded-full p-1.5 shadow-lg border border-gray-100 hover:bg-red-50 text-red-500 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="text-center w-full">
                      <div className="mx-auto h-12 w-12 text-gray-300 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 border border-gray-100">
                        <UploadCloud className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <div className="mt-4 flex text-sm leading-6 text-gray-600 justify-center items-center flex-col">
                        <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                          <span>Upload a file</span>
                          <input 
                            id="file-upload" 
                            name="file-upload" 
                            type="file" 
                            className="sr-only" 
                            accept="image/*"
                            onChange={handleImageChange}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs leading-5 text-gray-500 mt-2">PNG, JPG, GIF up to 5MB</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                    Product Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    className="mt-2 block w-full rounded-lg border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 transition-shadow"
                    placeholder="e.g. Premium Leather Sneakers"
                  />
                </div>

                <div>
                  <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                    Price
                  </label>
                  <div className="relative mt-2 rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      name="price"
                      id="price"
                      required
                      min="0"
                      step="0.01"
                      value={formData.price}
                      onChange={handleChange}
                      className="block w-full rounded-lg border-0 py-2 pl-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
                    Category
                  </label>
                  <div className="mt-2">
                    <select
                      id="category"
                      name="category"
                      required
                      value={formData.category}
                      onChange={handleChange}
                      className="block w-full rounded-lg border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                      <option value="" disabled>Select category</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="stock" className="block text-sm font-medium leading-6 text-gray-900">
                    Stock
                  </label>
                  <input
                    type="number"
                    name="stock"
                    id="stock"
                    required
                    min="0"
                    value={formData.stock}
                    onChange={handleChange}
                    className="mt-2 block w-full rounded-lg border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>

                <div>
                  <label htmlFor="rating" className="block text-sm font-medium leading-6 text-gray-900">
                    Rating
                  </label>
                  <input
                    type="number"
                    name="rating"
                    id="rating"
                    min="0"
                    max="5"
                    step="0.1"
                    value={formData.rating}
                    onChange={handleChange}
                    className="mt-2 block w-full rounded-lg border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                    Description
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="description"
                      name="description"
                      rows={3}
                      required
                      value={formData.description}
                      onChange={handleChange}
                      className="block w-full rounded-lg border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-6 py-4 flex flex-row-reverse rounded-b-2xl border-t border-gray-100">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full justify-center rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto transition-colors disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Product'
                )}
              </button>
              <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-lg bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto transition-colors"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
