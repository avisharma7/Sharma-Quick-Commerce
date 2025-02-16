package com.angularspringbootecommerce.backend.controllers;

import com.angularspringbootecommerce.backend.dtos.CartDto;
import com.angularspringbootecommerce.backend.exceptions.AppException;
import com.angularspringbootecommerce.backend.services.CartService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("api/v1/cart")
@Tag(name = "Cart", description = "Endpoints for managing the shopping cart")
public class CartController {

    private final CartService cartService;

    @Operation(summary = "Get user's cart", description = "Retrieves the shopping cart for a given user ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Cart retrieved successfully"),
            @ApiResponse(responseCode = "404", description = "User's cart not found")
    })
    @GetMapping("/{userId}")
    public ResponseEntity<Map<String, Object>> getCartByUserId(@PathVariable Long userId) {
        Map<String, Object> response = new HashMap<>();
        CartDto cartDto = cartService.getCartByUserId(userId);
        if (cartDto != null) {
            response.put("cart", cartDto);
            response.put("numberOfItemsInCart", cartService.getNumberOfItemsInCart(userId));
            return ResponseEntity.ok().body(response);
        } else {
            throw new AppException("User's cart not found", HttpStatus.NOT_FOUND);
        }
    }

    @Operation(summary = "Add item to cart", description = "Adds a specified quantity of a product to the user's shopping cart.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Item added to cart successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid input data"),
            @ApiResponse(responseCode = "404", description = "User or product not found")
    })
    @PostMapping("/{userId}/{productId}/{quantity}")
    public ResponseEntity<CartDto> addItemToCart(@PathVariable Long userId, @PathVariable Long productId, @PathVariable int quantity) {
        CartDto cartDto = cartService.addItemToCart(userId, productId, quantity);
        return ResponseEntity.ok().body(cartDto);
    }

    @Operation(summary = "Remove item from cart", description = "Removes a specific product from the user's shopping cart.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Item removed from cart successfully"),
            @ApiResponse(responseCode = "404", description = "User or product not found in cart")
    })
    @DeleteMapping("/{userId}/{productId}")
    public ResponseEntity<CartDto> removeItemFromCart(@PathVariable Long userId, @PathVariable Long productId) {
        CartDto cartDto = cartService.removeItemFromCart(userId, productId);
        return ResponseEntity.ok().body(cartDto);
    }
}
