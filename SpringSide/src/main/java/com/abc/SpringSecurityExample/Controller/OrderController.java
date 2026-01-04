package com.abc.SpringSecurityExample.Controller;

import com.abc.SpringSecurityExample.DTOs.projectDtos.OrderResponseDto;
import com.abc.SpringSecurityExample.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    // Create checkout order
    @PostMapping("/checkout")
    public ResponseEntity<OrderResponseDto> checkout(@RequestParam String paymentMethod) {
        OrderResponseDto order = orderService.createOrder(paymentMethod);
        return ResponseEntity.ok(order);
    }

    // Get all orders of current user
    @GetMapping
    public ResponseEntity<List<OrderResponseDto>> getUserOrders() {
        List<OrderResponseDto> orders = orderService.getUserOrders();
        return ResponseEntity.ok(orders);
    }

    // Get single order
    @GetMapping("/{orderId}")
    public ResponseEntity<OrderResponseDto> getOrder(@PathVariable Long orderId) {
        OrderResponseDto order = orderService.getOrder(orderId);
        return ResponseEntity.ok(order);
    }
}

