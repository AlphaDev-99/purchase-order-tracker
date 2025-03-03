const axios = require('axios');

// Shopify API Configuration
const SHOPIFY_STORE_DOMAIN = 'rparuu-xn.myshopify.com';

const SHOPIFY_API_KEY = '4fbb8b0b88940ba92fb2f711efa774e9';
const SHOPIFY_API_PASSWORD = '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';


// Function to fetch purchase order details
async function fetchPurchaseOrder(invoiceNumber, email) {
    try {
        const url = `https://${SHOPIFY_API_KEY}:${SHOPIFY_API_PASSWORD}@${SHOPIFY_STORE_DOMAIN}/admin/api/2024-01/orders.json?name=${invoiceNumber}&email=${email}`;
        const response = await axios.get(url);
        return response.data.orders[0]; // Return the first matching order
    } catch (error) {
        console.error('Error fetching purchase order:', error);
        return null;
    }
}


// Handle form submission
document.getElementById('poForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const invoiceNumber = document.getElementById('invoiceNumber').value;
    const email = document.getElementById('email').value;
    
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = 'Searching for your order...';
    
    try {
        const order = await fetchPurchaseOrder(invoiceNumber, email);
        if (order) {
            resultDiv.innerHTML = `
                <h3>Order Details</h3>
                <p><strong>Order Number:</strong> ${order.name}</p>
                <p><strong>Date:</strong> ${new Date(order.created_at).toLocaleDateString()}</p>
                <p><strong>Total:</strong> $${order.total_price}</p>
                <p><strong>Status:</strong> ${order.financial_status}</p>
            `;
        } else {
            resultDiv.innerHTML = 'No matching order found. Please check your details and try again.';
        }
    } catch (error) {
        resultDiv.innerHTML = 'An error occurred while searching for your order. Please try again later.';
        console.error(error);
    }
});
