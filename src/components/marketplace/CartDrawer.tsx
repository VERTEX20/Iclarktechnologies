'use client';

import { useAppStore } from '@/lib/store';
import { formatPrice } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';

export default function CartDrawer() {
  const cart = useAppStore((s) => s.cart);
  const cartOpen = useAppStore((s) => s.cartOpen);
  const setCartOpen = useAppStore((s) => s.setCartOpen);
  const removeFromCart = useAppStore((s) => s.removeFromCart);
  const updateCartQuantity = useAppStore((s) => s.updateCartQuantity);
  const navigate = useAppStore((s) => s.navigate);
  const getCartTotal = useAppStore((s) => s.getCartTotal);
  const getCartCount = useAppStore((s) => s.getCartCount);

  const total = getCartTotal();
  const count = getCartCount();

  return (
    <Sheet open={cartOpen} onOpenChange={setCartOpen}>
      <SheetContent side="right" className="flex flex-col w-full sm:max-w-md p-0">
        <SheetHeader className="p-4 pb-2 border-b">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-primary" />
            Shopping Cart
            {count > 0 && (
              <span className="ml-auto text-sm font-normal text-muted-foreground">
                {count} {count === 1 ? 'item' : 'items'}
              </span>
            )}
          </SheetTitle>
          <SheetDescription className="sr-only">
            Your shopping cart items
          </SheetDescription>
        </SheetHeader>

        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 p-6">
            <div className="rounded-full bg-muted p-6">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-lg font-semibold">Your cart is empty</h3>
              <p className="text-sm text-muted-foreground">
                Add some solar products to get started
              </p>
            </div>
            <Button
              className="mt-2"
              onClick={() => {
                setCartOpen(false);
                navigate('products');
              }}
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 h-0">
              <div className="p-4 space-y-4">
                {cart.map((item) => {
                  const price = item.product.salePrice || item.product.price;
                  return (
                    <div
                      key={item.product.id}
                      className="flex gap-3 p-3 rounded-lg border bg-card"
                    >
                      {/* Thumbnail */}
                      <div className="h-20 w-20 flex-shrink-0 rounded-md overflow-hidden bg-muted">
                        {item.product.images[0] ? (
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full w-full">
                            <ShoppingBag className="h-6 w-6 text-muted-foreground" />
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate">
                            {item.product.name}
                          </p>
                          {item.product.brand && (
                            <p className="text-xs text-muted-foreground">
                              {item.product.brand}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center justify-between mt-1">
                          <p className="text-sm font-semibold text-primary">
                            {formatPrice(price)}
                          </p>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              className="inline-flex h-7 w-7 items-center justify-center rounded-md border text-xs hover:bg-muted transition-colors"
                              onClick={() =>
                                updateCartQuantity(
                                  item.product.id,
                                  item.quantity - 1
                                )
                              }
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-8 text-center text-sm font-medium">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              className="inline-flex h-7 w-7 items-center justify-center rounded-md border text-xs hover:bg-muted transition-colors"
                              onClick={() =>
                                updateCartQuantity(
                                  item.product.id,
                                  item.quantity + 1
                                )
                              }
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Remove */}
                      <button
                        type="button"
                        className="flex-shrink-0 self-start p-1 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                        onClick={() => removeFromCart(item.product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>

            <div className="border-t p-4 space-y-4">
              <div className="flex items-center justify-between text-base font-semibold">
                <span>Cart Total</span>
                <span className="text-primary">{formatPrice(total)}</span>
              </div>
              <Separator />
              <SheetFooter className="gap-2 sm:gap-2">
                <Button
                  className="w-full"
                  onClick={() => {
                    setCartOpen(false);
                    navigate('checkout');
                  }}
                >
                  Proceed to Checkout
                </Button>
              </SheetFooter>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
