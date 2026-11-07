function Orders({ orders }) {
    return (
      <section className="chart-section">
        <div className="chart-section-header">
          <div>
            <h2>Orders</h2>
            <p>Active and recently completed clinical orders.</p>
          </div>
        </div>
  
        {!orders.length ? (
          <div className="empty-inline">No orders recorded.</div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div className="order-row" key={order.order_id}>
                <div className="order-icon">+</div>
  
                <div className="order-content">
                  <div>
                    <strong>{order.description}</strong>
                    <span>{order.order_type}</span>
                  </div>
  
                  <p>
                    Ordered by {order.ordered_by} ·{" "}
                    {new Date(order.ordered_at).toLocaleString()}
                  </p>
  
                  {order.notes && <small>{order.notes}</small>}
                </div>
  
                <span
                  className={`status-badge status-${order.status.toLowerCase()}`}
                >
                  {order.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    );
  }
  
  export default Orders;