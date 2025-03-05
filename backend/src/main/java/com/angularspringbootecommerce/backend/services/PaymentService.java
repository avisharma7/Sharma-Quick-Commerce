package com.angularspringbootecommerce.backend.services;

import com.angularspringbootecommerce.backend.dtos.PaymentDto;
import com.razorpay.RazorpayClient;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {

    private final RazorpayClient razorpayClient;

    @Autowired
    public PaymentService(RazorpayClient razorpayClient) {
        this.razorpayClient = razorpayClient;
    }

    public com.razorpay.Order createOrder(PaymentDto paymentDto) throws Exception {
        JSONObject orderRequest = new JSONObject();
        orderRequest.put("amount", paymentDto.getAmount().multiply(new java.math.BigDecimal("100"))); // Convert to paisa
        orderRequest.put("currency", paymentDto.getCurrency());
        orderRequest.put("receipt", paymentDto.getReceipt());
        orderRequest.put("payment_capture", 1); // Auto capture payment

        return razorpayClient.orders.create(orderRequest);
    }
}
