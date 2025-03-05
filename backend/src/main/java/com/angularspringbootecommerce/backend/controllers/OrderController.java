package com.angularspringbootecommerce.backend.controllers;

import com.angularspringbootecommerce.backend.dtos.CartDto;
import com.angularspringbootecommerce.backend.dtos.OrderDto;
import com.angularspringbootecommerce.backend.dtos.PaymentDto;
import com.angularspringbootecommerce.backend.models.Order; // Your database model
import com.angularspringbootecommerce.backend.services.CartService;
import com.angularspringbootecommerce.backend.services.OrderService;
import com.angularspringbootecommerce.backend.services.PaymentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/orders")
@Tag(name = "Orders", description = "Endpoints for managing orders and checkout process")
public class OrderController {
    private final OrderService orderService;
    private final CartService cartService;
    private final PaymentService paymentService;

    @Operation(summary = "Get user orders", description = "Retrieves a list of all orders placed by a specific user.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Orders retrieved successfully"),
            @ApiResponse(responseCode = "403", description = "Access denied")
    })
    @GetMapping("/{userId}")
//    @PreAuthorize("hasRole('Buyer')") // Ensure only authorized Buyer can access
    public List<OrderDto> getOrdersByUserId(@PathVariable Long userId, Authentication authentication) {
        log.info("authentication name: {}", authentication.getName());
        log.info("user id: {}", userId);
        return orderService.getOrdersByUserId(userId, authentication);
    }

    @Operation(summary = "Checkout and create order", description = "Processes a checkout by creating an order from the user's cart and generating a Razorpay payment order.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Checkout successful"),
            @ApiResponse(responseCode = "400", description = "Invalid cart or payment details"),
            @ApiResponse(responseCode = "500", description = "Payment processing error")
    })
    @PostMapping("/{userId}/checkout")
    @PreAuthorize("hasRole('Buyer')") // Ensure only authorized Buyer can access
    public ResponseEntity<PaymentDto> checkout(@PathVariable Long userId, Authentication authentication) throws Exception {
        // Get cart details
        CartDto cart = cartService.getCartByUserId(userId);
        BigDecimal totalPrice = cart.getTotalPrice();

        // Create Razorpay Order
        PaymentDto paymentRequest = new PaymentDto(totalPrice, "INR", "order_receipt_" + userId);
        com.razorpay.Order razorpayOrder = paymentService.createOrder(paymentRequest); // ✅ Using fully qualified name

        // Create order in database
        Order createdOrder = orderService.createOrderFromCart(cart, userId, authentication);

        // Clear cart after checkout
        cartService.clearCart(userId);

        PaymentDto paymentDto = new PaymentDto(
                totalPrice,  // ✅ Correct BigDecimal value
                "INR",       // ✅ Correct String value
                razorpayOrder.get("id").toString() // ✅ Ensure receipt is a String
        );


        return ResponseEntity.ok().body(paymentDto);
    }
}
