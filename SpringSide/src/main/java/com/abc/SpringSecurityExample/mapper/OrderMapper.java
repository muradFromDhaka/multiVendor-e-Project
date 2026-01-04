package com.abc.SpringSecurityExample.mapper;

import com.abc.SpringSecurityExample.DTOs.projectDtos.OrderItemDto;
import com.abc.SpringSecurityExample.DTOs.projectDtos.OrderResponseDto;
import com.abc.SpringSecurityExample.entity.Order;
import com.abc.SpringSecurityExample.entity.OrderItem;
import lombok.experimental.UtilityClass;

import java.util.List;
import java.util.stream.Collectors;

@UtilityClass  // lombok এর utility class annotation, static methods বানাতে সাহায্য করে
public class OrderMapper {

    // Order entity থেকে OrderResponseDto mapping
    public OrderResponseDto mapOrderToDto(Order order) {
        if (order == null) return null;

        List<OrderItemDto> items = order.getOrderItems()
                .stream()
                .map(OrderMapper::mapOrderItemToDto)
                .collect(Collectors.toList());

        return OrderResponseDto.builder()
                .orderId(order.getId())
                .userName(order.getUser().getUserName())
                .orderItems(items)
                .totalPrice(order.getTotalPrice())
                .orderStatus(order.getOrderStatus())
                .build();
    }

    // OrderItem entity থেকে OrderItemDto mapping
    public OrderItemDto mapOrderItemToDto(OrderItem item) {
        if (item == null) return null;

        return OrderItemDto.builder()
                .productId(item.getProduct().getId())
                .productName(item.getProduct().getName())
                .vendorId(item.getVendor().getId())
                .vendorName(item.getVendor().getShopName())
                .quantity(item.getQuantity())
                .unitPrice(item.getUnitPrice())
                .build();
    }
}
