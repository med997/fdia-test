import { Trash2, Pencil } from 'lucide-react';

const ProductTable = ({ products, onEdit, onDelete }) => {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const getCategoryColor = (category) => {
    const colors = {
      'smartphones': 'bg-purple-100 text-purple-700',
      'laptops': 'bg-blue-100 text-blue-700',
      'fragrances': 'bg-orange-100 text-orange-700',
      'skincare': 'bg-pink-100 text-pink-700',
      'groceries': 'bg-green-100 text-green-700',
      'home-decoration': 'bg-teal-100 text-teal-700',
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="w-full">
      <table className="min-w-full text-left">
        <thead>
          <tr className="border-b border-indigo-100 sticky top-0 bg-indigo-50/50 z-10">
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">ID</th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Stock</th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {products.map((product) => (
            <tr
              key={product.id}
              className="hover:bg-gray-50 transition-colors"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                #{product.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="h-10 w-10 flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-lg object-cover border border-gray-100 p-0.5"
                      src={product.thumbnail}
                      alt={product.title}
                    />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-semibold text-gray-900">{product.title}</div>
                    <div className="text-xs text-gray-500">{product.brand}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                 <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium capitalize ${getCategoryColor(product.category)}`}>
                   {product.category}
                 </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-semibold text-gray-900">{formatCurrency(product.price)}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`text-sm font-medium ${product.stock < 20 ? 'text-red-600' : 'text-gray-900'}`}>
                  {product.stock}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => onEdit(product)}
                  className="text-gray-500 hover:text-indigo-600 transition-colors mr-3"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDelete(product.id)}
                  className="text-gray-500 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
