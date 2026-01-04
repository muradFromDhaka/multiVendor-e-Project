package com.abc.SpringSecurityExample.service;

import com.abc.SpringSecurityExample.DTOs.projectDtos.OrderItemDto;
import com.abc.SpringSecurityExample.DTOs.projectDtos.OrderResponseDto;
import com.abc.SpringSecurityExample.entity.*;
import com.abc.SpringSecurityExample.enums.OrderStatus;
import com.abc.SpringSecurityExample.mapper.OrderMapper;
import com.abc.SpringSecurityExample.repository.CartRepository;
import com.abc.SpringSecurityExample.repository.OrderRepository;
import com.abc.SpringSecurityExample.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final CartRepository cartRepository;

    // Get currently logged-in user
    private User getCurrentUser() {
        var auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated() || auth.getName() == null) {
            throw new RuntimeException("User not logged in");
        }
        return userRepository.findById(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    // Create order from current user's cart
    public OrderResponseDto createOrder(String paymentMethod) {
        User user = getCurrentUser();

        Cart cart = cartRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        if (cart.getItems().isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        Order order = new Order();
        order.setUser(user);
        order.setOrderStatus(OrderStatus.PENDING);
        order.setTotalPrice(BigDecimal.ZERO); // init

        // Map cart items to order items
        List<OrderItem> orderItems = cart.getItems().stream().map(cartItem -> {
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProduct(cartItem.getProduct());
            orderItem.setVendor(cartItem.getProduct().getVendor());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setUnitPrice(cartItem.getPrice());
            return orderItem;
        }).collect(Collectors.toList());

        order.setOrderItems(orderItems);

        // Calculate total price
        BigDecimal total = orderItems.stream()
                .map(i -> i.getUnitPrice().multiply(BigDecimal.valueOf(i.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        order.setTotalPrice(total);

        orderRepository.save(order);

        // Clear cart
        cart.getItems().clear();
        cartRepository.save(cart);

        return OrderMapper.mapOrderToDto(order);
    }

    // Get all orders of current user
    public List<OrderResponseDto> getUserOrders() {
        User user = getCurrentUser();
        return orderRepository.findByUser(user).stream()
                .map(OrderMapper::mapOrderToDto)
                .collect(Collectors.toList());
    }

    // Get single order by ID
    public OrderResponseDto getOrder(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        return OrderMapper.mapOrderToDto(order);
    }
}

