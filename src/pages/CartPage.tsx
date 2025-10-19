import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { useCartStore } from '../store/cartStore';
import { formatPrice } from '../lib/utils';

const CartPage = () => {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore();

  const totalPrice = getTotalPrice();
  const shipping = totalPrice > 25 ? 0 : 5.99;
  const tax = totalPrice * 0.08;
  const finalTotal = totalPrice + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground" />
          <h1 className="text-3xl font-bold">Your cart is empty</h1>
          <p className="text-muted-foreground">
            Looks like you haven't added any books to your cart yet.
          </p>
          <Button size="lg" asChild>
            <Link to="/books">
              Start Shopping
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Shopping Cart</h1>
          <p className="text-muted-foreground">
            {items.length} item{items.length !== 1 ? 's' : ''} in your cart
          </p>
        </div>
        <Button variant="ghost" asChild>
          <Link to="/books">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continue Shopping
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <Card key={item.book.id}>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Book Image */}
                  <Link to={`/books/${item.book.id}`} className="flex-shrink-0">
                    <img
                      src={item.book.image}
                      alt={item.book.title}
                      className="w-24 h-32 object-cover rounded-md"
                    />
                  </Link>

                  {/* Book Details */}
                  <div className="flex-1 space-y-2">
                    <Link 
                      to={`/books/${item.book.id}`}
                      className="text-lg font-semibold hover:text-primary transition-colors"
                    >
                      {item.book.title}
                    </Link>
                    <p className="text-muted-foreground">{item.book.author}</p>
                    <p className="text-sm text-muted-foreground">{item.book.category}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold">{formatPrice(item.book.price)}</span>
                      {item.book.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          {formatPrice(item.book.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex flex-col items-end space-y-4">
                    <div className="flex items-center border rounded-md">
                      <button
                        onClick={() => updateQuantity(item.book.id, item.quantity - 1)}
                        className="p-2 hover:bg-muted"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="px-4 py-2 border-x min-w-[3rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.book.id, item.quantity + 1)}
                        className="p-2 hover:bg-muted"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-semibold">
                        {formatPrice(item.book.price * item.quantity)}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.book.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Clear Cart */}
          <div className="flex justify-end">
            <Button variant="outline" onClick={clearCart}>
              Clear Cart
            </Button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      formatPrice(shipping)
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                {shipping > 0 && (
                  <p className="text-sm text-muted-foreground">
                    Add {formatPrice(25 - totalPrice)} more for free shipping
                  </p>
                )}
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>{formatPrice(finalTotal)}</span>
                </div>
              </div>

              <Button size="lg" className="w-full" asChild>
                <Link to="/checkout">
                  Proceed to Checkout
                </Link>
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                <p>Secure checkout powered by Stripe</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
