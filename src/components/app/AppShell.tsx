"use client";

import { useCallback, useMemo, useState } from "react";
import { ShoppingBag } from "lucide-react";
import { byId, money } from "@/data/menu";
import { cartItemCount, cartSubtotal } from "@/lib/pricing";
import { useIgniteStore, type Order } from "@/lib/store";
import { CartSheet } from "./CartSheet";
import { CheckoutSheet } from "./CheckoutSheet";
import { Confirmation } from "./Confirmation";
import { FavouritesTab } from "./FavouritesTab";
import { Header } from "./Header";
import { ItemSheet } from "./ItemSheet";
import { MenuList } from "./MenuList";
import { OrdersTab } from "./OrdersTab";
import { PickupSheet } from "./PickupSheet";
import { ReadyBanner } from "./ReadyBanner";
import { RewardsTab } from "./RewardsTab";
import { TabBar, type AppTab } from "./TabBar";
import { useOrderStage } from "./OrderTracker";
import { YouTab } from "./YouTab";

/** How long a placed order keeps its live tracker in the demo. */
const ACTIVE_WINDOW_MS = 5 * 60 * 1000;

export function AppShell({
  initialItemId,
  source,
}: {
  initialItemId?: string;
  source?: string;
}) {
  const cart = useIgniteStore((s) => s.cart);
  const orders = useIgniteStore((s) => s.orders);

  const [tab, setTab] = useState<AppTab>("order");
  // Deep link from the marketing site: /app?item=latte
  const [itemId, setItemId] = useState<string | null>(() =>
    initialItemId && byId(initialItemId) ? initialItemId : null,
  );
  const [cartOpen, setCartOpen] = useState(false);
  const [pickupOpen, setPickupOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [confirmationOrder, setConfirmationOrder] = useState<Order | null>(null);
  // A recently placed order keeps its tracker alive across reloads.
  const [activeOrderId, setActiveOrderId] = useState<string | null>(() => {
    const latest = orders[0];
    if (!latest) return null;
    const fresh =
      Date.now() - new Date(latest.placedAt).getTime() < ACTIVE_WINDOW_MS;
    return fresh ? latest.id : null;
  });
  const [bannerSeen, setBannerSeen] = useState<string | null>(null);

  const activeOrder = useMemo(
    () => orders.find((o) => o.id === activeOrderId) ?? null,
    [orders, activeOrderId],
  );

  const stage = useOrderStage(activeOrder?.placedAt);
  const bannerOpen =
    Boolean(activeOrder) &&
    stage === "ready" &&
    !confirmationOrder &&
    bannerSeen !== activeOrder?.id;

  const dismissBanner = useCallback(() => {
    setBannerSeen(activeOrder?.id ?? null);
  }, [activeOrder?.id]);

  const itemCount = cartItemCount(cart);
  const subtotal = cartSubtotal(cart);

  function handlePaid(order: Order) {
    setCheckoutOpen(false);
    setActiveOrderId(order.id);
    setBannerSeen(null);
    setConfirmationOrder(order);
  }

  function closeConfirmation() {
    setConfirmationOrder(null);
    setTab("order");
  }

  return (
    <div
      data-source={source}
      className="relative flex h-full w-full flex-col overflow-hidden bg-crema"
    >
      <Header onOpenPickup={() => setPickupOpen(true)} />

      <main className="relative min-h-0 flex-1">
        {tab === "order" ? (
          <MenuList
            activeOrder={activeOrder}
            onOpenItem={setItemId}
            onGoTab={setTab}
          />
        ) : null}
        {tab === "favs" ? (
          <FavouritesTab
            onGoTab={setTab}
            onOpenCart={() => setCartOpen(true)}
          />
        ) : null}
        {tab === "orders" ? (
          <OrdersTab
            activeOrder={activeOrder}
            onGoTab={setTab}
            onOpenCart={() => setCartOpen(true)}
          />
        ) : null}
        {tab === "rewards" ? <RewardsTab onGoTab={setTab} /> : null}
        {tab === "you" ? <YouTab /> : null}
      </main>

      {itemCount > 0 ? (
        <button
          type="button"
          onClick={() => setCartOpen(true)}
          className="absolute inset-x-3 bottom-[76px] z-30 flex items-center justify-between gap-3 rounded-full border-[1.5px] border-ember bg-ember px-4 py-3 text-paper shadow-[3px_3px_0_#8F3312] transition-transform active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
        >
          <span className="inline-flex items-center gap-2">
            <ShoppingBag className="h-4 w-4" />
            <span className="font-display text-xs uppercase tracking-[0.08em]">
              {itemCount} item{itemCount === 1 ? "" : "s"}
            </span>
          </span>
          <span className="inline-flex items-center gap-2 font-mono text-xs">
            {money(subtotal)}
            <span className="font-display uppercase tracking-[0.08em]">
              View cart
            </span>
          </span>
        </button>
      ) : null}

      <TabBar tab={tab} onTab={setTab} />

      <ReadyBanner
        order={activeOrder}
        show={bannerOpen}
        onOpen={() => {
          dismissBanner();
          setTab("orders");
        }}
        onDismiss={dismissBanner}
      />

      <ItemSheet itemId={itemId} onClose={() => setItemId(null)} />

      <CartSheet
        open={cartOpen}
        onOpenChange={setCartOpen}
        onOpenPickup={() => {
          setCartOpen(false);
          setPickupOpen(true);
        }}
        onCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
      />

      <PickupSheet open={pickupOpen} onOpenChange={setPickupOpen} />

      <CheckoutSheet
        open={checkoutOpen}
        onOpenChange={setCheckoutOpen}
        onPaid={handlePaid}
      />

      <Confirmation order={confirmationOrder} onClose={closeConfirmation} />
    </div>
  );
}
