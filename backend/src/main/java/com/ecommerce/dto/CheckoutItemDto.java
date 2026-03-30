package com.ecommerce.dto;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class CheckoutItemDto {
    private String name;
    private BigDecimal price;
    private Integer quantity;
    private String imageUrl;
}
