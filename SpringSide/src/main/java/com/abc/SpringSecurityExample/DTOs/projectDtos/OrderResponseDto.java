package com.abc.SpringSecurityExample.DTOs.projectDtos;

import com.abc.SpringSecurityExample.enums.OrderStatus;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderResponseDto {

    private Long orderId;
    private String userName;
    private List<OrderItemDto> orderItems;
    private BigDecimal totalPrice;
    private OrderStatus orderStatus;
}

