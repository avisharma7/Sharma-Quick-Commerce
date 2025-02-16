package com.angularspringbootecommerce.backend.controllers;

import com.angularspringbootecommerce.backend.dtos.CartDto;
import com.angularspringbootecommerce.backend.dtos.OrderDto;
import com.angularspringbootecommerce.backend.dtos.PaymentDto;
import com.angularspringbootecommerce.backend.models.Order;
import com.angularspringbootecommerce.backend.services.CartService;
import com.angularspringbootecommerce.backend.services.OrderService;
import com.angularspringbootecommerce.backend.services.PaymentService;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

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
    public List<OrderDto> getOrdersByUserId(@PathVariable Long userId, Authentication authentication) {
        return orderService.getOrdersByUserId(userId, authentication);
    }

    @Operation(summary = "Checkout and create order", description = "Processes a checkout by creating an order from the user's cart and generating a Stripe payment intent.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Checkout successful"),
            @ApiResponse(responseCode = "400", description = "Invalid cart or payment details"),
            @ApiResponse(responseCode = "500", description = "Payment processing error")
    })
    @PostMapping("/{userId}/checkout")
    public ResponseEntity<PaymentDto> checkout(@PathVariable Long userId, Authentication authentication) throws StripeException {
        CartDto cart = cartService.getCartByUserId(userId);
        BigDecimal totalPrice = cart.getTotalPrice();
        PaymentIntent paymentIntent = paymentService.createPaymentIntent(totalPrice);

        Order createdOrder = orderService.createOrderFromCart(cart, userId, authentication);

        cartService.clearCart(userId);

        PaymentDto paymentDto = new PaymentDto(paymentIntent.getClientSecret(), totalPrice, "usd", createdOrder.getId());

        return ResponseEntity.ok().body(paymentDto);
    }
}
