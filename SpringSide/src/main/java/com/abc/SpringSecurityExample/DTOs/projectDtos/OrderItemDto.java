package com.abc.SpringSecurityExample.DTOs.projectDtos;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderItemDto {

    private Long productId;
    private String productName;
    private Long vendorId;
    private String vendorName;
    private int quantity;
    private BigDecimal unitPrice;
}

